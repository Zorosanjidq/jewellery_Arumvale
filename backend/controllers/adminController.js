import User from "../models/User.js";

// Get all pending vendors
export const getPendingVendors = async (req, res) => {
  try {
    const pendingVendors = await User.find({ 
      role: "vendor", 
      isApproved: false 
    }).select("-password");

    res.status(200).json({
      count: pendingVendors.length,
      vendors: pendingVendors
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve vendor
export const approveVendor = async (req, res) => {
  try {
    const vendor = await User.findById(req.params.id);
    
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    if (vendor.role !== "vendor") {
      return res.status(400).json({ message: "User is not a vendor" });
    }

    if (vendor.isApproved) {
      return res.status(400).json({ message: "Vendor is already approved" });
    }

    vendor.isApproved = true;
    vendor.approvalDate = new Date();
    vendor.rejectedReason = null;
    
    await vendor.save();

    res.status(200).json({
      message: "Vendor approved successfully",
      vendor: {
        _id: vendor._id,
        username: vendor.username,
        email: vendor.email,
        approvalDate: vendor.approvalDate
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject vendor
export const rejectVendor = async (req, res) => {
  try {
    const { reason } = req.body;
    
    if (!reason) {
      return res.status(400).json({ message: "Rejection reason is required" });
    }

    const vendor = await User.findById(req.params.id);
    
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    if (vendor.role !== "vendor") {
      return res.status(400).json({ message: "User is not a vendor" });
    }

    if (vendor.isApproved) {
      return res.status(400).json({ message: "Cannot reject an approved vendor" });
    }

    vendor.isApproved = false;
    vendor.rejectedReason = reason;
    vendor.adminNotes = req.body.adminNotes || null;
    
    await vendor.save();

    res.status(200).json({
      message: "Vendor rejected successfully",
      vendor: {
        _id: vendor._id,
        username: vendor.username,
        email: vendor.email,
        rejectedReason: vendor.rejectedReason
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all vendors (approved, pending, rejected)
export const getAllVendors = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let filter = { role: "vendor" };
    
    if (status === "approved") {
      filter.isApproved = true;
    } else if (status === "pending") {
      filter.isApproved = false;
      filter.rejectedReason = null;
    } else if (status === "rejected") {
      filter.isApproved = false;
      filter.rejectedReason = { $ne: null };
    }

    const vendors = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    res.status(200).json({
      vendors,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get vendor statistics
export const getVendorStats = async (req, res) => {
  try {
    const totalVendors = await User.countDocuments({ role: "vendor" });
    const approvedVendors = await User.countDocuments({ 
      role: "vendor", 
      isApproved: true 
    });
    const pendingVendors = await User.countDocuments({ 
      role: "vendor", 
      isApproved: false,
      rejectedReason: null
    });
    const rejectedVendors = await User.countDocuments({ 
      role: "vendor", 
      isApproved: false,
      rejectedReason: { $ne: null }
    });

    res.status(200).json({
      total: totalVendors,
      approved: approvedVendors,
      pending: pendingVendors,
      rejected: rejectedVendors
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single vendor details
export const getVendorDetails = async (req, res) => {
  try {
    const vendor = await User.findById(req.params.id).select("-password");
    
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    if (vendor.role !== "vendor") {
      return res.status(400).json({ message: "User is not a vendor" });
    }

    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
