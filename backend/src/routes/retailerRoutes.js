const express = require("express");
const {
  getRetailerById,
  updateRetailer,
  deleteRetailer,
} = require("../controllers/retailerController");
const { singleUpload, retailerUpload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/VerifyToken");
const { signupRetailer } = require("../controllers/retailerController");
const { loginRetailer } = require("../controllers/retailerController");
const { getAllRetailers } = require("../controllers/retailerController");
const router = express.Router();

// Retailer Signup
router.post("/", singleUpload, signupRetailer);

// Retailer Login
router.post("/login", loginRetailer);

// Get all retailers
router.get("/", verifyToken, getAllRetailers);

// Get retailer by ID
router.get("/:id", verifyToken, getRetailerById);

// Update retailer profile
router.put("/:id", verifyToken, retailerUpload, updateRetailer);

// Delete retailer
router.delete("/:id", verifyToken, deleteRetailer);

module.exports = router;
