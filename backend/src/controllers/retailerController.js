const Retailer = require("../models/Retailer");
const { getDataUri } = require("../utils/feature");
const cloudinary = require("cloudinary").v2; // Cloudinary for storing images
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Retailer Signup
exports.signupRetailer = async (req, res) => {
  const {
    companyName,
    firstName,
    lastName,
    email,
    password,
    website,
    phoneNumber,
    yearsBusiness,
    taxId,
  } = req.body;

  try {
    // Validate required input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if email already exists
    const existingRetailer = await Retailer.findOne({ email });
    if (existingRetailer) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload profile image to Cloudinary if provided
    let userImg = "";
    if (req.file) {
      const fileUri = getDataUri(req.file).content;
      const result = await cloudinary.uploader.upload(fileUri);
      userImg = result.secure_url;
    }

    // Create new retailer with default applicationStatus
    const newRetailer = new Retailer({
      userImg,
      companyName,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      website,
      phoneNumber,
      yearsBusiness,
      taxId,
      applicationStatus: "pending", // Default status as pending
    });

    await newRetailer.save();

    // Generate JWT
    const token = jwt.sign(
      { id: newRetailer._id, email: newRetailer.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d", // Token expires in 7 days
      }
    );

    res.status(201).json({
      message: "Retailer registered successfully",
      userData: newRetailer,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Retailer Login
exports.loginRetailer = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const retailer = await Retailer.findOne({ email });
    if (!retailer) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, retailer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: retailer._id, email: retailer.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Token expires in 7 days
    );

    res
      .status(200)
      .json({ message: "Login successful", userData: retailer, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateRetailer = async (req, res) => {
  const { id } = req.params;
  const {
    companyName,
    firstName,
    lastName,
    phoneNumber,
    yearsBusiness,
    taxId,
    businessFile, // URL of business file from the frontend
    applicationStatus, // Application status update field
  } = req.body;

  try {
    // Find retailer by ID
    const retailer = await Retailer.findById(id);
    if (!retailer) {
      return res.status(404).json({ message: "Retailer not found" });
    }

    // Update retailer details
    retailer.companyName = companyName || retailer.companyName;
    retailer.firstName = firstName || retailer.firstName;
    retailer.lastName = lastName || retailer.lastName;
    retailer.phoneNumber = phoneNumber || retailer.phoneNumber;
    retailer.yearsBusiness = yearsBusiness || retailer.yearsBusiness;
    retailer.taxId = taxId || retailer.taxId;

    // Update the application status if provided in the request
    if (applicationStatus) {
      retailer.applicationStatus = applicationStatus;
    }

    // Handle profile image upload if provided
    if (req.files && req.files["file"] && req.files["file"].length > 0) {
      const file = req.files["file"][0];
      const fileUri = getDataUri(file).content;
      const result = await cloudinary.uploader.upload(fileUri);
      retailer.userImg = result.secure_url;
    }

    // Store the business file URL from frontend if provided
    if (businessFile) {
      retailer.businessFile = businessFile; // Directly store the URL
    }

    // Save updated retailer details
    await retailer.save();

    res
      .status(200)
      .json({ message: "Retailer profile updated", userData: retailer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Retailers
exports.getAllRetailers = async (req, res) => {
  try {
    const { status } = req.query; // Allow filtering by status if provided
    const query = status ? { applicationStatus: status } : {};
    const retailers = await Retailer.find(query);
    res.status(200).json({ retailers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Retailer by ID
exports.getRetailerById = async (req, res) => {
  const { id } = req.params;

  try {
    const retailer = await Retailer.findById(id);
    if (!retailer) {
      return res.status(404).json({ message: "Retailer not found" });
    }

    res.status(200).json({ userData: retailer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Retailer
exports.deleteRetailer = async (req, res) => {
  const { id } = req.params;

  try {
    const retailer = await Retailer.findByIdAndDelete(id);
    if (!retailer) {
      return res.status(404).json({ message: "Retailer not found" });
    }

    res.status(200).json({ message: "Retailer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Retailer Application Status
exports.updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const retailer = await Retailer.findById(id);
    if (!retailer) {
      return res.status(404).json({ message: "Retailer not found" });
    }

    retailer.applicationStatus = status || retailer.applicationStatus;
    await retailer.save();

    res
      .status(200)
      .json({ message: "Retailer status updated", userData: retailer });
  } catch (error) {
    console.error("Error updating retailer status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
