const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create a new Admin
exports.createAdmin = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the admin already exists by email
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin already exists with this email" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res
      .status(201)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d", // Token expires in 7 days
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
