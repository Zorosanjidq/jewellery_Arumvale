import express from "express";
import {
  getPendingVendors,
  approveVendor,
  rejectVendor,
  getAllVendors,
  getVendorStats,
  getVendorDetails,
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(adminOnly);

// Get pending vendors
router.get("/vendors/pending", getPendingVendors);

// Approve vendor
router.post("/vendors/:id/approve", approveVendor);

// Reject vendor
router.post("/vendors/:id/reject", rejectVendor);

// Get all vendors with filtering
router.get("/vendors", getAllVendors);

// Get vendor statistics
router.get("/vendors/stats", getVendorStats);

// Get single vendor details
router.get("/vendors/:id", getVendorDetails);

export default router;
