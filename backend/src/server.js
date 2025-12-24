const path = require("path");
const express = require("express");
const cors = require("cors");

// Load env variables
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();

// ===============================
// DB init
// ===============================
require("./config/db");

// ===============================
// CORS CONFIG
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  "https://digital-health-wallet-ochre.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server & Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);

// ===============================
// Middlewares
// ===============================
app.use(express.json());

// ===============================
// Static Files (Uploaded Reports)
// ===============================
const uploadsPath = path.resolve(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

// ===============================
// Routes
// ===============================
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/protected", require("./routes/protected.routes"));
app.use("/api/reports", require("./routes/report.routes"));
app.use("/api/vitals", require("./routes/vitals.routes"));
app.use("/api/share", require("./routes/share.routes"));

// ===============================
// Health Check
// ===============================
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Digital Health Wallet API running",
  });
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("📂 Serving uploads from:", uploadsPath);
});
