import User from "../models/User.js";
import Vendor from "../models/Vendor.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      role,
      phone,
      dob,
      gender,
      address,
      city,
      state,
      pincode,
      // Vendor-specific fields
      ownerName,
      shopName,
      gstNumber,
      panNumber,
      bisHallmark,
      shopType,
      yearsInBusiness,
      website,
      description,
      bankName,
      accountNumber,
      ifscCode,
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // For vendor registration, check if GST or PAN already exists
    if (role === "vendor") {
      const existingGST = await Vendor.findOne({ gstNumber });
      const existingPAN = await Vendor.findOne({ panNumber });

      if (existingGST) {
        return res
          .status(400)
          .json({ message: "GST number already registered" });
      }

      if (existingPAN) {
        return res
          .status(400)
          .json({ message: "PAN number already registered" });
      }
    }

    // Create user with all fields
    const userData = {
      firstName,
      lastName,
      email,
      password,
      role: role || "user",
      phone,
      dob: dob ? new Date(dob) : undefined,
      gender,
      address: address || {
        fullAddress: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
      },
    };

    // Add vendor-specific fields if registering as vendor
    if (role === "vendor") {
      // Generate username if not provided
      if (!username && shopName) {
        userData.username =
          shopName.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now();
      } else if (username) {
        userData.username = username;
      }
    } else {
      // For non-vendor users, username is required
      if (!username) {
        return res.status(400).json({ message: "Username is required" });
      }
      userData.username = username;
    }

    const user = await User.create(userData);

    // Create vendor record if role is vendor
    if (role === "vendor") {
      await Vendor.create({
        user: user._id,
        shopName,
        shopType,
        yearsInBusiness,
        website,
        description,
        gstNumber,
        panNumber,
        bisHallmark,
        bankName,
        accountNumber,
        ifscCode,
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    const response = {
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender,
      address: user.address,
      role: user.role,
      isApproved: user.isApproved,
      approvalDate: user.approvalDate,
      message:
        role === "vendor"
          ? "Vendor registration submitted! Your application will be reviewed within 24-48 hours."
          : "User Registration successful",
    };

    // Add vendor-specific response data
    if (role === "vendor") {
      const vendor = await Vendor.findOne({ user: user._id });
      if (vendor) {
        Object.assign(response, {
          ownerName: firstName, // Use firstName as ownerName for vendors
          shopName: vendor.shopName,
          shopType: vendor.shopType,
          yearsInBusiness: vendor.yearsInBusiness,
          website: vendor.website,
          description: vendor.description,
        });
      }
    }

    res.status(201).json(response);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      //Role validation

      if (req.body.role && req.body.role !== user.role) {
        return res.status(403).json({
          message: "Unauthorized role access",
        });
      }

      const token = generateToken(user._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
      });
      res.json({
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender,
        address: user.address,
        role: user.role,
        isApproved: user.isApproved,
        approvalDate: user.approvalDate,
        message: "User Login successful",
      });
    } else {
      res.status(401).json({ message: "Invalidd email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out sucessfully" });
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender,
      address: user.address,
      role: user.role,
      isApproved: user.isApproved,
      approvalDate: user.approvalDate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
