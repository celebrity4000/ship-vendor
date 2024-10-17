const express = require("express");
const {
  addProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  getProductsBySupplierId,
} = require("../controllers/productController");
const { singleUpload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/VerifyToken");

const router = express.Router();

// Add a new product with image upload
router.post("/", verifyToken, singleUpload, addProduct);

// Update product by ID with image upload
router.put("/:id", verifyToken, singleUpload, updateProduct);

// Get all products
router.get("/", verifyToken, getAllProducts);

// Get product by ID
router.get("/:id", getProductById);

// Delete product by ID
router.delete("/:id", verifyToken, deleteProductById);

// Get products by supplier ID
router.get("/supplier/:supplierId", getProductsBySupplierId);

module.exports = router;
