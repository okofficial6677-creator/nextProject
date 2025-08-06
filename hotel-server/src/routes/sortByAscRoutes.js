const express = require("express");
const router = express.Router();
const propertyController = require("../controller/sortByAscController");

router.get("/sortByAsc", propertyController.getHotelCardsSortedByPrice);

router.get("/sortByDes", propertyController.getHotelCardsSortedByDes);

router.get("/sortByRating", propertyController.getHotelCardsSortedByRating);

module.exports = router;

