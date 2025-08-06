const express = require("express");
const router = express.Router();
const ratePlanController = require("../controller/rateplanController");

// POST: Add a new rate plan
router.post("/add", ratePlanController.addRatePlan);

// GET: Get all rate plans
router.get("/all", ratePlanController.getAllRatePlans);

module.exports = router;
