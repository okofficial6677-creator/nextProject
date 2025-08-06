const roomService = require("../business/propertyRoomService");

exports.getAllRoom = async (req, res) => {
  try {
    const data = await roomService.getAllRoom();
    res.json({ success: true, message: data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

exports.addRoom = async (req, res) => {
  const {
    property_id,
    room_type,
    total_rooms,
    room_area,
    size_unit,
    status,
    description,
    smoking_policy,
    extra_beds,
    min_price,
    min_adult,
    max_adult,
    max_occupancy,
    child_with_bed,
    child_without_bed,
  } = req.body;

  if (!property_id || !room_type || !total_rooms || typeof status === "undefined") {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const result = await roomService.addRoom({
      property_id,
      room_type,
      total_rooms,
      room_area,
      size_unit,
      status,
      description,
      smoking_policy,
      extra_beds,
      min_price,
      min_adult,
      max_adult,
      max_occupancy,
      child_with_bed,
      child_without_bed,
    });
    res.json({ success: true, message: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding room", error });
  }
};
