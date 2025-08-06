const hotelPropertyService = require("../business/hotelPropService");

exports.getAllProperties = async (req, res) => {
  try {
    const data = await hotelPropertyService.getAllProperties();
    res.json({ success: true, message: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPropertyById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ success: false, message: "Missing property ID" });
  }
  try {
    const data = await hotelPropertyService.getPropertyById(id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }
    res.json({ success: true, message: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProperty = async (req, res) => {
  const {
    name,
    description,
    address,
    city_id,
    star_rating,
    cover_image,
    is_featured
  } = req.body;

  if (!name || !address || !city_id || typeof star_rating === "undefined") {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const newProperty = await hotelPropertyService.createProperty({
      name,
      description,
      address,
      city_id,
      star_rating,
      cover_image,
      is_featured
    });
    res.status(201).json({ success: true, message: newProperty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
