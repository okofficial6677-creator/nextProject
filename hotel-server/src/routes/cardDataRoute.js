const express = require("express");
const router = express.Router();

const propertyController = require("../controller/cardDataController");

router.get("/card", propertyController.getHotelCards);

module.exports = router;
