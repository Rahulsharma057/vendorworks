const mongoose = require("mongoose");

// Singleton document — one business profile per site.
const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    businessName: { type: String, trim: true, default: "Rakesh Maintenance & Build" },
    ownerName: { type: String, trim: true, default: "" },
    tagline: { type: String, trim: true, default: "One crew for every job your property needs." },
    about: {
      type: String,
      trim: true,
      default: "We take on gate repair, painting, fencing, wiring, road work and full building construction.",
    },
    phone: { type: String, trim: true, default: "" },
    whatsapp: { type: String, trim: true, default: "" },
    email: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    yearsExperience: { type: Number, default: 0 },
    logo: { type: imageSchema, default: null },
    cover: { type: imageSchema, default: null },
    gallery: { type: [imageSchema], default: [] }, // vendor's own photos — owner, team, workshop, vehicle etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
