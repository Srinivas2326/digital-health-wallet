const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "digital-health-wallet/reports",
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
    public_id: (req, file) =>
      Date.now() + "-" + file.originalname.split(".")[0],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
