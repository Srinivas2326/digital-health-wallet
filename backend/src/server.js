const path = require("path");
const express = require("express");
const cors = require("cors");


require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});


const app = express();


require("./config/db");

   // Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

app.use(express.json());


   // Static Files (Uploaded Reports)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

   // Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/protected", require("./routes/protected.routes"));
app.use("/api/reports", require("./routes/report.routes"));
app.use("/api/vitals", require("./routes/vitals.routes"));
app.use("/api/share", require("./routes/share.routes"));

   // Health Check
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Digital Health Wallet API running",
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
