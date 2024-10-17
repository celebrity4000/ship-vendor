const mongoose = require("mongoose");

const { Schema } = mongoose;
const RetailerSchema = new Schema(
  {
    userImg: { type: String },
    userType: {
      type: String,
      default: "retailer",
    },
    companyName: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    website: { type: String },
    phoneNumber: { type: String },
    yearsBusiness: { type: String },
    taxId: { type: String },
    businessFile: { type: String },
    suppliers: [{ type: Schema.Types.ObjectId, ref: "Supplier" }],
    applicationStatus: { type: String, default: "pending" },
    //products
  },
  { timestamps: true }
);

module.exports = mongoose.model("Retailer", RetailerSchema);
