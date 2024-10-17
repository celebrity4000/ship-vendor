const express = require("express");
const { createAdmin, loginAdmin } = require("../controllers/adminController");
const router = express.Router();

// Route for creating an admin
router.post("/", createAdmin);

// Route for admin login
router.post("/login", loginAdmin);

module.exports = router;
