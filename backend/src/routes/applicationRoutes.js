const express = require("express");
const {
  createApplication,
  getAllApplications,
  editApplication,
  deleteApplication,
  getApplicationsBySupplierId,
  getApplicationsByRetailerId,
  checkRecentApplication,
} = require("../controllers/applicationController");
const { verifyToken } = require("../middlewares/VerifyToken");
const router = express.Router();

// Route to create a new application
router.post("/", verifyToken, createApplication);

// Route to get all applications
router.get("/", verifyToken, getAllApplications);

// Route to edit an application by ID
router.put("/:id", verifyToken, editApplication);

// Route to delete an application by ID
router.delete("/:id", verifyToken, deleteApplication);

// Route to get applications by supplier ID
router.get("/supplier/:supplierId", verifyToken, getApplicationsBySupplierId);

// Route to get applications by retailer ID
router.get("/retailer/:retailerId", verifyToken, getApplicationsByRetailerId);

// Route to check recent applications between a retailer and a supplier within the last 3 days
router.get("/recent", verifyToken, checkRecentApplication);

module.exports = router;
