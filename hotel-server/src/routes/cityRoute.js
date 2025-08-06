
const express = require("express");
const cityController = require("../controller/cityController");

const router = express.Router();

router.post("/add", cityController.addCity);

router.get("/all", cityController.getAllCities);

router.get("/filter/code/:city_code", cityController.getCityByCode);

router.get("/filter/name/:city_name", cityController.getCityByName);

module.exports = router;
