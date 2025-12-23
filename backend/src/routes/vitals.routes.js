const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const {
  addVital,
  getMyVitals,
  filterVitals,
} = require("../controllers/vitals.controller");

/**
 * ADD VITAL
 */
router.post("/", protect, addVital);

/**
 * GET ALL VITALS
 */
router.get("/", protect, getMyVitals);

/**
 * FILTER VITALS
 */
router.get("/filter", protect, filterVitals);

module.exports = router;
