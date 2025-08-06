const propertyService = require("../business/cardDataService");

exports.getHotelCards = async (req, res) => {
  try {
    const data = await propertyService.getAllHotelCards();
    res.json(data);
  } catch (err) {
    console.error("Error in getHotelCards:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
