const express = require("express");
const router = express.Router();
const propertyController = require("../controller/propertyController");

router.post("/add", propertyController.addProperty);

router.get("/all", propertyController.getAllProperties);

router.get("/filter/country/:country_name", propertyController.getByCountryName);
router.get("/filter/state/:state_name", propertyController.getByStateName);
router.get("/filter/city/:city_name", propertyController.getByCityName);
router.get("/filter/name/:property_name", propertyController.getByPropertyName);
router.get("/filter/code/:property_code", propertyController.getByPropertyCode);
router.get("/filter/chain/:chain_name", propertyController.getByChainName);
router.get("/filter/status/:status", propertyController.getByStatus);
router.get("/filter/id/:property_id", propertyController.getById);
router.get('/search/:keyword', propertyController.searchProperties);
module.exports = router;
