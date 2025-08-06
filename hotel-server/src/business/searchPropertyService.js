const propertyDao = require("../dao/searchPropertyDao");

exports.getAutoSuggest = async (keyword) => {
  return await propertyDao.getAutoSuggest(keyword);
};

exports.getHotelCardsSortedByPrice = async ()=> {
  return await propertyDao.getHotelCardsSortedByPrice();
};

exports.searchHotels = async (name) => {
  return await propertyDao.searchByPropertyName(name);
};

// Rename getHotelCardsByInclusion to searchHotelsByOffers
exports.searchHotelsByOffers = async (offer) => {
  return await propertyDao.searchHotelsByOffers(offer);
};

// Add service for checking if inclusion is present
exports.isInclusionPresent = async (inclusionName) => {
  return await propertyDao.isInclusionPresent(inclusionName);
};

exports.getPropertyById = async (property_id) => {
  return await propertyDao.getPropertyById(property_id);
};

// 🎯 Recommended Search Services
exports.getRecommendedSearches = async (limit = 6) => {
  return await propertyDao.getRecommendedSearches(limit);
};

exports.getSearchAnalytics = async () => {
  return await propertyDao.getSearchAnalytics();
};