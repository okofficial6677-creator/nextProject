const express = require("express");
const facilityController = require("../controller/facilitiesController");
const router = express.Router();

router.get("/all", facilityController.getAllFacilities);
router.post("/add", facilityController.addFacility);
router.get("/filter/code/:code", facilityController.getFacilityByCode);
router.get("/filter/name/:name", facilityController.getFacilityByName);

module.exports = router;
