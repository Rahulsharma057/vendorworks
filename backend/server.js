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
| - New Vercel production domain
| - Old Vercel production domain
| - Vercel preview deployments
|--------------------------------------------------------------------------
*/

const allowedOrigins = [
  // Local
  "http://localhost:3000",
  "http://127.0.0.1:3000",

  // New production frontend
  "https://rakesh-construction-maintenance.vercel.app",

  // Old production frontend
  "https://vendorworks.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without Origin
      // Postman, server-to-server, health checks, etc.
      if (!origin) {
        return callback(null, true);
      }

      // Allow fixed origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      /*
      |--------------------------------------------------------------------------
      | Allow Vercel Preview URLs
      |--------------------------------------------------------------------------
      |
      | Example:
      | https://rakesh-construction-maintenance-xxxxx.vercel.app
      |
      */

      if (
        origin.startsWith(
          "https://rakesh-construction-maintenance-"
        ) &&
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      /*
      |--------------------------------------------------------------------------
      | Temporary support for old Vendorworks preview URLs
      |--------------------------------------------------------------------------
      */

      if (
        origin.startsWith("https://vendorworks-") &&
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

/*
|--------------------------------------------------------------------------
| Body Parser
|--------------------------------------------------------------------------
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
|--------------------------------------------------------------------------
| Logger
|--------------------------------------------------------------------------
*/

app.use(morgan("dev"));

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
  res.status(200).json({
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

/*
|--------------------------------------------------------------------------
| Keep Backend Awake
|--------------------------------------------------------------------------
| Render free services can go to sleep after inactivity.
| This sends a request to the backend health endpoint every 10 minutes.
|--------------------------------------------------------------------------
*/

const KEEP_ALIVE_INTERVAL = 10 * 60 * 1000; // 10 minutes

if (process.env.NODE_ENV === "production") {
  setInterval(async () => {
    try {
      const backendUrl =
        process.env.BACKEND_URL || "https://vendorworks.onrender.com";

      const response = await fetch(`${backendUrl}/api/health`);

      console.log(
        `[KEEP-ALIVE] ${new Date().toISOString()} - Status: ${response.status}`
      );
    } catch (error) {
      console.error(
        "[KEEP-ALIVE] Failed:",
        error.message
      );
    }
  }, KEEP_ALIVE_INTERVAL);
}