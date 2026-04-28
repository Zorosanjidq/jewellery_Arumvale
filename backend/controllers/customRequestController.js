import CustomRequest from "../models/CustomRequest.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

// Create a new custom request (customers only)
export const createCustomRequest = async (req, res) => {
  try {
    const { vendor, title, description } = req.body;

    // Validate required fields
    if (!vendor || !title || !description) {
      return res.status(400).json({
        message: "Please provide vendor, title, and description",
      });
    }

    // Validate vendor exists and is approved
    const vendorUser = await User.findById(vendor);
    if (!vendorUser) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    if (vendorUser.role !== "vendor") {
      return res.status(400).json({ message: "Invalid vendor" });
    }

    if (!vendorUser.isApproved) {
      return res.status(400).json({ message: "Vendor is not approved" });
    }

    if (!vendorUser.isActive) {
      return res.status(400).json({ message: "Vendor account is inactive" });
    }

    // Validate design image was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Design image is required" });
    }

    // Construct design image path
    const designImage = `/uploads/custom-requests/${req.user._id}/${req.file.filename}`;

    // Create custom request
    const customRequest = await CustomRequest.create({
      customer: req.user._id,
      vendor,
      title,
      description,
      designImage,
      status: "pending",
    });

    // Populate vendor details for response
    const populatedRequest = await CustomRequest.findById(
      customRequest._id,
    ).populate("vendor", "username email");

    res.status(201).json({
      message: "Custom request submitted successfully",
      customRequest: populatedRequest,
    });
  } catch (error) {
    console.error("Create custom request error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Provide estimate for custom request (approved vendors only)
export const provideEstimate = async (req, res) => {
  try {
    const { price, timeline, notes } = req.body;

    // Validate required fields
    if (!price || !timeline) {
      return res.status(400).json({
        message: "Please provide price and timeline",
      });
    }

    // Get request
    const request = await CustomRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Custom request not found" });
    }

    // Validate vendor ownership
    if (request.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to estimate this request",
      });
    }

    // Validate status for transition
    if (!["pending", "under_review"].includes(request.status)) {
      return res.status(400).json({
        message: `Cannot estimate request with status: ${request.status}`,
      });
    }

    // Prevent duplicate estimates
    if (request.status === "estimated") {
      return res.status(400).json({
        message: "Request already has an estimate",
      });
    }

    // Update request with estimate
    request.estimate = {
      price: parseFloat(price),
      timeline,
      notes,
      estimatedAt: new Date(),
    };
    request.status = "estimated";

    await request.save();

    // Populate for response
    const populatedRequest = await CustomRequest.findById(request._id).populate(
      "customer",
      "firstName lastName email",
    );

    res.status(200).json({
      message: "Estimate submitted successfully",
      customRequest: populatedRequest,
    });
  } catch (error) {
    console.error("Provide estimate error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Respond to estimate (customers only)
export const respondToEstimate = async (req, res) => {
  try {
    const { decision, notes } = req.body;

    // Validate decision
    if (!decision || !["approved", "rejected"].includes(decision)) {
      return res.status(400).json({
        message: "Decision must be 'approved' or 'rejected'",
      });
    }

    // Get request
    const request = await CustomRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Custom request not found" });
    }

    // Validate customer ownership
    if (request.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to respond to this request",
      });
    }

    // Validate status for response
    if (request.status !== "estimated") {
      return res.status(400).json({
        message: `Cannot respond to request with status: ${request.status}`,
      });
    }

    // Prevent duplicate responses
    if (request.customerResponse && request.customerResponse.decision) {
      return res.status(400).json({
        message: "Response already recorded",
      });
    }

    // Update request with customer response
    request.customerResponse = {
      decision,
      notes,
      respondedAt: new Date(),
    };
    request.status = decision;

    await request.save();

    // Populate for response
    const populatedRequest = await CustomRequest.findById(request._id).populate(
      "vendor",
      "username email",
    );

    res.status(200).json({
      message: `Estimate ${decision} successfully`,
      customRequest: populatedRequest,
    });
  } catch (error) {
    console.error("Respond to estimate error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Convert approved request to custom product (approved vendors only)
export const convertToProduct = async (req, res) => {
  try {
    // Get request
    const request = await CustomRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Custom request not found" });
    }

    // Validate vendor ownership
    if (request.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to convert this request",
      });
    }

    // Validate status for conversion
    if (request.status !== "approved") {
      return res.status(400).json({
        message: `Cannot convert request with status: ${request.status}`,
      });
    }

    // Prevent duplicate conversion
    if (request.convertedProduct) {
      return res.status(400).json({
        message: "Request already converted to product",
        convertedProduct: request.convertedProduct,
      });
    }

    // Create custom product with derived data
    const productData = {
      name: request.title,
      description: request.description,
      category: "Custom", // Default category for custom products
      price: request.estimate.price,
      weight: 0, // Default weight - vendor can update later
      purity: "22K", // Default purity - vendor can update later
      stock: 1, // Custom product - single item
      images: [request.designImage], // Use design image as product image
      vendor: request.vendor,
      status: "draft", // Start as draft, vendor activates when ready
      isCustom: true,
      customForCustomer: request.customer,
      customRequestId: request._id,
    };

    // Create product
    const product = await Product.create(productData);

    // Update request with product reference
    request.convertedProduct = product._id;
    request.status = "converted";
    await request.save();

    // Populate for response
    const populatedProduct = await Product.findById(product._id).populate(
      "vendor",
      "username email",
    );

    res.status(201).json({
      message: "Custom request converted to product successfully",
      product: populatedProduct,
    });
  } catch (error) {
    console.error("Convert to product error:", error);
    res.status(500).json({ message: error.message });
  }
};
