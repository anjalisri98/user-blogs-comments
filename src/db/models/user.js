// src/db/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    profile_url: { type: String },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
