const propertyService = require("../business/sortByAscService");

exports.getHotelCardsSortedByPrice = async (req, res) => {
  try {
    const result = await propertyService.getHotelCardsSortedByPrice();
    res.json(result);
  } catch (error) {
    console.error("Hotel fetch error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getHotelCardsSortedByDes = async (req, res) => {
  try {
    const result = await propertyService.getHotelCardsSortedByDes();
    res.json(result);
  } catch (error) {
    console.error("Hotel fetch error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getHotelCardsSortedByRating = async (req, res) => {
  try {
    const result = await propertyService.getHotelCardsSortedByRating();
    res.json(result);
  } catch (error) {
    console.error("Hotel fetch error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};