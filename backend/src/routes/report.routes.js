const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const {
  uploadReport,
  getMyReports,
  filterReports,
} = require("../controllers/report.controller");


router.post(
  "/upload",
  protect,
  upload.single("report"),
  uploadReport
);


router.get("/", protect, getMyReports);


router.get("/filter", protect, filterReports);

module.exports = router;
