const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const { getDataUri } = require("../utils/feature");
const cloudinary = require("cloudinary").v2;

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, industry, price, currency, label, supplier } = req.body;

  try {
    let imageUrl = "";

    // Handle image upload
    if (req.file) {
      const fileUri = getDataUri(req.file).content;
      const result = await cloudinary.uploader.upload(fileUri);
      imageUrl = result.secure_url;
    }

    const newProduct = new Product({
      name,
      industry,
      image: imageUrl, // Save the uploaded image URL
      price,
      currency,
      label,
      supplier,
    });

    await newProduct.save();

    console.log(supplier);

    // Add product ID to the supplier's products array
    await Supplier.findByIdAndUpdate(supplier, {
      $push: { products: newProduct._id },
    });

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, industry, price, currency, label, supplier } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let imageUrl = product.image;

    // Handle image upload if provided
    if (req.file) {
      const fileUri = getDataUri(req.file).content;
      const result = await cloudinary.uploader.upload(fileUri);
      imageUrl = result.secure_url;
    }

    // Check if the supplier has changed
    const oldSupplier = product.supplier;

    // Update product details
    product.name = name || product.name;
    product.industry = industry || product.industry;
    product.image = imageUrl; // Update image if a new one was uploaded
    product.price = price || product.price;
    product.currency = currency || product.currency;
    product.label = label || product.label;
    product.supplier = supplier || product.supplier;

    await product.save();

    // Update the supplier's products array if the supplier has changed
    if (supplier && oldSupplier.toString() !== supplier.toString()) {
      await Supplier.findByIdAndUpdate(oldSupplier, {
        $pull: { products: id },
      });
      await Supplier.findByIdAndUpdate(supplier, {
        $push: { products: id },
      });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("supplier");
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate("supplier");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product by ID
exports.deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Remove product ID from the supplier's products array
    await Supplier.findByIdAndUpdate(product.supplier, {
      $pull: { products: id },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get products by supplier ID
exports.getProductsBySupplierId = async (req, res) => {
  const { supplierId } = req.params;

  try {
    const products = await Product.find({ supplier: supplierId }).populate(
      "supplier"
    );
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
