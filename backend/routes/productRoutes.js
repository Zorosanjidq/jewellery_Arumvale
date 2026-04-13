import express from "express";
import multer from "multer";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getVendorProducts,
  removeProductImage,
} from "../controllers/productController.js";
import { protect, approvedVendorOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Configure multer for image uploads
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Public routes - no authentication required
router.get("/", getProducts);
router.get("/:id", getProduct);

// Protected routes - require approved vendor authentication
router.use(protect);
router.use(approvedVendorOnly);

// Create product (approved vendors only) - handle multipart/form-data
router.post("/", upload.array("images", 10), createProduct);

// Get vendor's products (approved vendors only)
router.get("/my", getVendorProducts);

// Update product (vendor can only update their products)
router.put("/:id", updateProduct);

// Delete product (vendor can only delete their products)
router.delete("/:id", deleteProduct);

// Remove product image (vendor can only update their products)
router.delete("/:id/images/:imageUrl", removeProductImage);

export default router;
