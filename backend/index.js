const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary");

//import routes
const supplierRoutes = require("./src/routes/supplierRoutes.js");
const retailerRoutes = require("./src/routes/retailerRoutes.js");
const productRoutes = require("./src/routes/productRoutes.js");
const adminRoutes = require("./src/routes/adminRoutes.js");
const applicationRoutes = require("./src/routes/applicationRoutes.js");

dotenv.config();
const app = express();

//select port
const PORT = process.env.PORT || 5001;

//cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware to parse JSON bodies
// app.use(express.json());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connection successfull!");
  })
  .catch((err) => {
    console.log(err);
  });

//allow to send json
app.use(express.json());
app.use(cors());

//routes
app.use("/api/supplier", supplierRoutes);
app.use("/api/retailer", retailerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/application", applicationRoutes);

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
