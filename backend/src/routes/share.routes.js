const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const {
  shareReport,
  getSharedWithMe,
  revokeAccess,
} = require("../controllers/share.controller");

/**
 * SHARE REPORT
 */
router.post("/", protect, shareReport);

/**
 * REPORTS SHARED WITH ME
 */
router.get("/me", protect, getSharedWithMe);

/**
 * REVOKE ACCESS
 */
router.delete("/", protect, revokeAccess);

module.exports = router;
