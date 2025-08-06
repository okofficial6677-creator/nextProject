const express = require("express");
const router = express.Router();
const propertyController = require("../controller/searchPropertyController");

router.get("/search/:keyword", propertyController.getAutoSuggest);

router.get("/searchByName/:property_name",propertyController.searchHotelsByName);

// Route for searching hotels by offers (inclusion)
router.get("/searchByOffers", propertyController.searchHotelsByOffers);

// Route for checking if an inclusion is present
router.get("/isInclusionPresent/:inclusion_name", propertyController.isInclusionPresent);

router.get("/PropertyById/:property_id", propertyController.getPropertyById);

// 🎯 Recommended Search Routes
router.get("/recommendations", propertyController.getRecommendedSearches);
router.get("/analytics", propertyController.getSearchAnalytics);

module.exports = router;
