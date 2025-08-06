
const express = require("express");
const countryController = require("../controller/countryController");

const router = express.Router();

router.get("/all", countryController.getAllCountries);

router.post("/add", countryController.addCountry);

router.get("/by-code/:country_code", countryController.getCountryByCode);

router.get("/by-name/:country_name", countryController.getCountryByName);

module.exports = router;
