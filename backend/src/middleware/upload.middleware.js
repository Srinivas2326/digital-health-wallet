const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Absolute path to uploads/reports
const uploadDir = path.join(__dirname, "../uploads/reports");

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ===============================
// Storage config (FIXED)
// ===============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// ===============================
// File filter (PDF & Images only)
// ===============================
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype.toLowerCase();

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and image files are allowed"));
  }
};

// ===============================
// Export upload middleware
// ===============================
module.exports = multer({
  storage,
  fileFilter,
});
