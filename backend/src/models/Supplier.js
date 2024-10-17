const mongoose = require("mongoose");

const { Schema } = mongoose;
const SupplierSchema = new Schema(
  {
    userImg: { type: String },
    userType: {
      type: String,
      default: "supplier",
    },
    companyName: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    website: { type: String },
    phoneNumber: { type: String },
    industry: { type: String },
    rating: {
      rate: { type: Number, default: 0 },
      ratedBy: { type: Number, default: 0 },
    },
    bannerImg: [{ type: String }],
    retailers: [{ type: Schema.Types.ObjectId, ref: "Retailer" }],
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    applicationStatus: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplier", SupplierSchema);
