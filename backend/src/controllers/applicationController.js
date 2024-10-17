const Application = require("../models/Applications");

// Create a new application
exports.createApplication = async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: "Error creating application", error });
  }
};

// Get all applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("retailer")
      .populate("supplier");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

// Edit an application by ID
exports.editApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: "Error updating application", error });
  }
};

// Delete an application by ID
exports.deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedApplication = await Application.findByIdAndDelete(id);
    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting application", error });
  }
};

// Get applications by supplier ID
exports.getApplicationsBySupplierId = async (req, res) => {
  const { supplierId } = req.params;
  try {
    const applications = await Application.find({ supplier: supplierId })
      .populate("retailer")
      .populate("supplier");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

// Get applications by retailer ID
exports.getApplicationsByRetailerId = async (req, res) => {
  const { retailerId } = req.params;
  try {
    const applications = await Application.find({ retailer: retailerId })
      .populate("retailer")
      .populate("supplier");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

// Check recent application between a retailer and supplier within the last 3 days
exports.checkRecentApplication = async (req, res) => {
  const { retailerId, supplierId } = req.query; // Assuming retailerId and supplierId are passed as query parameters

  try {
    // Calculate the date 3 days ago from now
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    // Find the most recent application within the last 3 days
    const recentApplication = await Application.findOne({
      retailer: retailerId,
      supplier: supplierId,
      createdAt: { $gte: threeDaysAgo }, // Filter by createdAt within the last 3 days
    })
      .sort({ createdAt: -1 }) // Sort by creation date descending
      .populate("retailer")
      .populate("supplier");

    if (!recentApplication) {
      return res.status(404).json({
        message: "No recent application found within the last 3 days",
      });
    }

    res.status(200).json(recentApplication);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching recent application", error });
  }
};
