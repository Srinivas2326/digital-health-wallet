const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ===============================
   DATABASE INIT
=============================== */
require("./config/db");

/* ===============================
   CORS CONFIG
=============================== */
const allowedOrigins = [
  "http://localhost:5173",
  "https://digital-health-wallet-ochre.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

/* ===============================
   MIDDLEWARES
=============================== */
app.use(express.json());

/* ===============================
   API ROUTES
=============================== */
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/protected", require("./routes/protected.routes"));
app.use("/api/reports", require("./routes/report.routes"));
app.use("/api/vitals", require("./routes/vitals.routes"));
app.use("/api/share", require("./routes/share.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes")); // ✅ dashboard stats
app.use("/api/profile", require("./routes/profile.routes"));     // ✅ profile management

/* ===============================
   HEALTH CHECK
=============================== */
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Digital Health Wallet API running 🚀",
  });
});

/* ===============================
   GLOBAL ERROR HANDLER (OPTIONAL)
=============================== */
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({
    message: "Internal server error",
  });
});

/* ===============================
   START SERVER
=============================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
