const express = require("express");
const hotelPropertyController = require("../controller/hotelPropController");
const router = express.Router();

router.get("/all", hotelPropertyController.getAllProperties);
router.post("/add", hotelPropertyController.createProperty);
router.get("/filter/id/:id", hotelPropertyController.getPropertyById);

module.exports = router;
