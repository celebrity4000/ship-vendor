const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const Supplier = require("../models/Supplier");
const { getDataUri } = require("../utils/feature");

// Supplier Signup
exports.signupSupplier = async (req, res) => {
  const {
    companyName,
    firstName,
    lastName,
    email,
    password,
    website,
    phoneNumber,
    industry,
  } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Check if email already exists
    const existingSupplier = await Supplier.findOne({ email });
    if (existingSupplier) {
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

    // Create new supplier with default applicationStatus
    const newSupplier = new Supplier({
      userImg,
      companyName,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      website,
      phoneNumber,
      industry,
      applicationStatus: "pending", // Default status as pending
    });

    await newSupplier.save();

    // Generate JWT
    const token = jwt.sign(
      { id: newSupplier._id, email: newSupplier.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Token expires in 7 days
    );

    res.status(201).json({
      message: "Supplier registered successfully",
      userData: newSupplier,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Supplier Login
exports.loginSupplier = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await Supplier.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Token expires in 7 days
    );

    res
      .status(200)
      .json({ message: "Login successful", userData: user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Supplier Profile (Including banner image uploads)
exports.updateSupplier = async (req, res) => {
  const { id } = req.params;
  const {
    companyName,
    firstName,
    lastName,
    website,
    phoneNumber,
    industry,
    applicationStatus,
  } = req.body;

  try {
    const supplier = await Supplier.findById(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    // Update supplier details
    supplier.companyName = companyName || supplier.companyName;
    supplier.firstName = firstName || supplier.firstName;
    supplier.lastName = lastName || supplier.lastName;
    supplier.website = website || supplier.website;
    supplier.phoneNumber = phoneNumber || supplier.phoneNumber;
    supplier.industry = industry || supplier.industry;
    supplier.applicationStatus =
      applicationStatus || supplier.applicationStatus; // Update application status if provided

    // Update profile image if provided
    if (req.files && req.files["file"] && req.files["file"].length > 0) {
      const file = req.files["file"][0];
      const fileUri = getDataUri(file).content;
      const result = await cloudinary.uploader.upload(fileUri);
      supplier.userImg = result.secure_url;
    }

    // Handle multiple banner image uploads if provided
    if (req.files && req.files["files"] && req.files["files"].length > 0) {
      const bannerImgUrls = [];
      for (const file of req.files["files"]) {
        const fileUri = getDataUri(file).content;
        const result = await cloudinary.uploader.upload(fileUri);
        bannerImgUrls.push(result.secure_url);
      }
      supplier.bannerImg = bannerImgUrls;
    }

    await supplier.save();
    res
      .status(200)
      .json({ message: "Supplier profile updated", userData: supplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const { status } = req.query; // Allow filtering by status if provided
    const query = status ? { applicationStatus: status } : {};
    const suppliers = await Supplier.find(query);
    res.status(200).json({ suppliers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Supplier by ID
exports.getSupplierById = async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await Supplier.findById(id)
      .populate("retailers")
      .populate({
        path: "products",
        select: "name industry image price currency label supplier", // Select specific fields from the product
      });

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({ userData: supplier });
  } catch (error) {
    console.error("Error fetching supplier:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Supplier
exports.deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await Supplier.findByIdAndDelete(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Supplier Application Status
exports.updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const supplier = await Supplier.findById(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    supplier.applicationStatus = status || supplier.applicationStatus;
    await supplier.save();

    res
      .status(200)
      .json({ message: "Supplier status updated", userData: supplier });
  } catch (error) {
    console.error("Error updating supplier status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
