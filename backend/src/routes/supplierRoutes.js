const express = require("express");
const router = express.Router();
const {
  signupSupplier,
  loginSupplier,
  updateSupplier,
  getAllSuppliers,
  getSupplierById,
  deleteSupplier,
} = require("../controllers/supplierController");
const { verifyToken } = require("../middlewares/VerifyToken");
const {
  singleUpload,
  multipleUpload,
  upload,
} = require("../middlewares/multer");

// Signup route
router.post("/", singleUpload, signupSupplier);

// Login route
router.post("/login", loginSupplier);

// Update supplier profile (including banner image uploads)
router.put("/:id", verifyToken, upload, updateSupplier);

// Get all suppliers
router.get("/", getAllSuppliers);

// Get supplier by ID
router.get("/:id", getSupplierById);

// Delete supplier
router.delete("/:id", verifyToken, deleteSupplier);

module.exports = router;
