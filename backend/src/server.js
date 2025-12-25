const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ===============================
// DB INIT
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
    origin: function (origin, callback) {
      // Allow server-to-server / Postman
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
// MIDDLEWARES
// ===============================
app.use(express.json());

// ===============================
// ROUTES
// ===============================
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/protected", require("./routes/protected.routes"));
app.use("/api/reports", require("./routes/report.routes"));
app.use("/api/vitals", require("./routes/vitals.routes"));
app.use("/api/share", require("./routes/share.routes"));

// ✅ DASHBOARD ROUTE (NEW & IMPORTANT)
app.use("/api/dashboard", require("./routes/dashboard.routes"));

// ===============================
// HEALTH CHECK
// ===============================
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Digital Health Wallet API running",
  });
});

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
