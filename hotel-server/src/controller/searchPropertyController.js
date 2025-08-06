const propertyService = require("../business/searchPropertyService");


exports.getAutoSuggest = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    console.log("Auto suggest request for keyword:", keyword);
    
    if (!keyword || keyword.trim().length < 3) {
      return res.json({ success: true, data: [] });
    }
    
    const result = await propertyService.getAutoSuggest(keyword);
    console.log("Auto suggest result:", result);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Controller Error:", err);
    res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};


exports.searchHotelsByName = async (req, res) => {
  try {
    const name = req.params.property_name || "";
    const data = await propertyService.searchHotels(name);
    res.json(data);
  } catch (err) {
    console.error("Error in searchHotelsByName:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Rename getHotelCardsByInclusion to searchHotelsByOffers
exports.searchHotelsByOffers = async (req, res) => {
  try {
    const offer = req.query.offer || null;
    const data = await propertyService.searchHotelsByOffers(offer);
    res.json(data);
  } catch (err) {
    console.error("Error in searchHotelsByOffers:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update: read inclusion name from req.params.inclusion_name
exports.isInclusionPresent = async (req, res) => {
  try {
    const inclusionName = req.params.inclusion_name;
    const present = await propertyService.isInclusionPresent(inclusionName);
    res.json({ present });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property_id = req.params.property_id;
    const data = await propertyService.getPropertyById(property_id);
    if (!data) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🎯 Recommended Search Controllers
exports.getRecommendedSearches = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    console.log("Recommended searches request with limit:", limit);
    
    const recommendations = await propertyService.getRecommendedSearches(limit);
    console.log("Recommended searches result:", recommendations);
    
    res.json({ 
      success: true, 
      data: recommendations,
      message: `Retrieved ${recommendations.length} recommended searches`
    });
  } catch (err) {
    console.error("Controller Error in getRecommendedSearches:", err);
    res.status(500).json({ 
      success: false, 
      message: err.message || "Internal server error",
      data: []
    });
  }
};

exports.getSearchAnalytics = async (req, res) => {
  try {
    console.log("Search analytics request");
    
    const analytics = await propertyService.getSearchAnalytics();
    console.log("Search analytics result:", analytics);
    
    res.json({ 
      success: true, 
      data: analytics,
      message: "Search analytics retrieved successfully"
    });
  } catch (err) {
    console.error("Controller Error in getSearchAnalytics:", err);
    res.status(500).json({ 
      success: false, 
      message: err.message || "Internal server error",
      data: null
    });
  }
};