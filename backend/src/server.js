const path = require("path");
const express = require("express");
const cors = require("cors");

// Load env variables
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();

// DB init
require("./config/db");

// ===============================
// ✅ CORS CONFIG (IMPORTANT FIX)
// ===============================
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://digital-health-wallet-ochre.vercel.app", // vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"));
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
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

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
});
