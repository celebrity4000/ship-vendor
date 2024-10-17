const mongoose = require("mongoose");

const { Schema } = mongoose;
const AdminSchema = new Schema(
  {
    userType: {
      type: String,
      default: "admin",
    },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);
