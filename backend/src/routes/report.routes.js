const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const {
  uploadReport,
  getMyReports,
  filterReports,
  deleteReport,
} = require("../controllers/report.controller");

/* ======================================================
   UPLOAD MEDICAL REPORT
   Field name must match frontend FormData key
====================================================== */
router.post(
  "/upload",
  protect,
  upload.single("report"), // ✅ must match frontend
  uploadReport
);

/* ======================================================
   GET ALL REPORTS (LOGGED-IN USER)
====================================================== */
router.get("/", protect, getMyReports);

/* ======================================================
   FILTER REPORTS
====================================================== */
router.get("/filter", protect, filterReports);

/* ======================================================
   DELETE REPORT (OWNER ONLY)
====================================================== */
router.delete("/:id", protect, deleteReport);

module.exports = router;
