const room_amenityService = require("../business/room_amenityService");

exports.allroomamenity = async (req, res) => {
  const data = await room_amenityService.allroomamenity();
  res.json({ success: true, message: data });
};

exports.addroomamenity = async (req, res) => {
  try {
    const { amenity_name, amenity_code, status } = req.body;
    console.log("Received:", amenity_name, amenity_code, status);

    if (!amenity_name || !amenity_code || typeof status === "undefined") {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: amenity_name, amenity_code, or status",
      });
    }

    const result = await room_amenityService.addroomamenity({ amenity_name, amenity_code, status });
    res.json({ success: true, message: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.roomamenityByCode = async (req, res) => {
  const { amenity_code } = req.params;
  const result = await room_amenityService.roomamenityByCode(amenity_code);
  res.json({ success: true, message: result });
};

exports.roomamenityByName = async (req, res) => {
  const { amenity_name } = req.params;
  const result = await room_amenityService.roomamenityByName(amenity_name);
  res.json({ success: true, message: result });
};
