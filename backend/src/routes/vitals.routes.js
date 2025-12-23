const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const {
  addVital,
  getMyVitals,
  filterVitals,
} = require("../controllers/vitals.controller");

router.post("/", protect, addVital);
router.get("/", protect, getMyVitals);
router.get("/filter", protect, filterVitals);

module.exports = router;
