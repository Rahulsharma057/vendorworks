// Creates the first admin account, a default set of service categories, and
// the (singleton) business profile document.
// Run once after setting up your .env file:  npm run seed
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");
const Category = require("./models/Category");
const Profile = require("./models/Profile");
const Testimonial = require("./models/Testimonial");

const defaultCategories = [
  { name: "Gate & Fencing", icon: "fence", description: "Gate repair, installation and boundary fencing", order: 1 },
  { name: "Painting", icon: "paint", description: "Interior and exterior painting work", order: 2 },
  { name: "Electrical & Wiring", icon: "bolt", description: "House wiring, fittings and repairs", order: 3 },
  { name: "Road & Paving", icon: "road", description: "Road laying, paving and driveway work", order: 4 },
  { name: "Building Construction", icon: "building", description: "Full construction and civil work", order: 5 },
  { name: "General Maintenance", icon: "tools", description: "Everyday repair and upkeep jobs", order: 6 },
];

const slugify = (t) =>
  t.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const run = async () => {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase();
  const existing = await Admin.findOne({ email });
  if (!existing) {
    await Admin.create({
      name: process.env.ADMIN_NAME || "Vendor Admin",
      email,
      password: process.env.ADMIN_PASSWORD || "changeme123",
    });
    console.log(`Admin created: ${email}`);
  } else {
    console.log(`Admin already exists: ${email}`);
  }

  for (const cat of defaultCategories) {
    const found = await Category.findOne({ slug: slugify(cat.name) });
    if (!found) {
      await Category.create({ ...cat, slug: slugify(cat.name) });
      console.log(`Category created: ${cat.name}`);
    }
  }
  console.log("Note: add as many more categories as your business actually offers from /admin/categories — these six are just a starting point.");

  const profile = await Profile.findOne();
  if (!profile) {
    await Profile.create({
      businessName: process.env.ADMIN_NAME || "Vendor Admin",
    });
    console.log("Default business profile created — fill it in from /admin/profile");
  }

  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    await Testimonial.insertMany([
      {
        clientName: "Sample Client — edit or delete from /admin/testimonials",
        workLocation: "Aligarh",
        message: "Replace this with a real review from a customer once you have one — add it from the admin panel.",
        rating: 5,
        order: 1,
      },
    ]);
    console.log("Sample testimonial created — manage real ones from /admin/testimonials");
  }

  console.log("Seed complete");
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
