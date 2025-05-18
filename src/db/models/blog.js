const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: true,
      ref: "user",
    },
    title: { type: String, trim: true, required: true },
    image_url: { type: String },
    description: { type: String, trim: true, required: true },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
