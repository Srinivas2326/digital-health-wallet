const express = require("express");
const cors = require("cors");
require("dotenv").config();

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
    origin: function (origin, callback) {
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
