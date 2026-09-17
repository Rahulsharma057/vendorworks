const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    location: { type: String, trim: true, default: "" },
    completedOn: { type: Date },
    durationDays: { type: Number },
    clientType: { type: String, enum: ["residential", "commercial", "government", "other"], default: "residential" },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["completed", "in-progress"], default: "completed" },
  },
  { timestamps: true }
);

workSchema.index({ title: "text", description: "text", location: "text" });

module.exports = mongoose.model("Work", workSchema);
