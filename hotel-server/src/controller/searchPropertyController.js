const propertyService = require("../business/searchPropertyService");


exports.getAutoSuggest = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const result = await propertyService.getAutoSuggest(keyword);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Controller Error:", err);
    res.status(500).json({ success: false, message: err.message });
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