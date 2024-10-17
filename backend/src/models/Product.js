const mongoose = require("mongoose");

const { Schema } = mongoose;
const ProductSchema = new Schema(
  {
    name: { type: String },
    industry: { type: String },
    image: { type: String },
    price: { type: String },
    currency: { type: String },
    label: { type: String },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
