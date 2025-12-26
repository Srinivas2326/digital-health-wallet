const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const {
  addVital,
  getMyVitals,
  filterVitals,
} = require("../controllers/vitals.controller");

  //  VALIDATION MIDDLEWARE
const validateVital = (req, res, next) => {
  const { vitalType, value } = req.body;

  if (!vitalType || value === undefined) {
    return res.status(400).json({
      message: "Vital type and value are required",
    });
  }

  if (isNaN(value)) {
    return res.status(400).json({
      message: "Vital value must be numeric",
    });
  }

  next();
};

  //  ROUTES

router.post("/", protect, validateVital, addVital);

router.get("/", protect, getMyVitals);

router.get("/filter", protect, filterVitals);

module.exports = router;
