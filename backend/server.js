require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const workRoutes = require("./routes/workRoutes");
const contactRoutes = require("./routes/contactRoutes");
const profileRoutes = require("./routes/profileRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");

connectDB();

const app = express();

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
| Supports:
| - Local frontend
| - Vercel production
| - Vercel preview deployments
|--------------------------------------------------------------------------
*/

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://vendorworks.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without Origin
      // (Postman, server-to-server, health checks, etc.)
      if (!origin) {
        return callback(null, true);
      }

      // Allow fixed origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow all Vercel preview URLs for this project
      if (
        origin.startsWith(
          "https://vendorworks-"
        ) &&
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      console.log("CORS blocked:", origin);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/works", workRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/testimonials", testimonialRoutes);

/*
|--------------------------------------------------------------------------
| Error Handling
|--------------------------------------------------------------------------
*/

app.use(notFound);
app.use(errorHandler);

/*
|--------------------------------------------------------------------------
| Server
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});