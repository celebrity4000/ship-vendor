const mongoose = require("mongoose");

const { Schema } = mongoose;
const ApplicationSchema = new Schema(
  {
    retailer: { type: Schema.Types.ObjectId, ref: "Retailer" },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
