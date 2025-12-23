const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const {
  shareReport,
  getSharedWithMe,
  revokeAccess,
} = require("../controllers/share.controller");


router.post("/", protect, shareReport);

router.get("/me", protect, getSharedWithMe);

router.delete("/", protect, revokeAccess);

module.exports = router;
