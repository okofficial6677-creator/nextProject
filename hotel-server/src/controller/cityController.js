
const cityService = require("../business/cityService");

exports.addCity = async (req, res) => {
  try {
    const { city_name, city_code, state_id, status } = req.body;

    if (!city_name || !city_code || !state_id || typeof status === "undefined") {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: city_name, city_code, state_id, or status",
      });
    }

    const result = await cityService.addCity({ city_name, city_code, state_id, status });

    res.json({
      success: true,
      message: result,
    });
  } catch (err) {
    console.error("Controller Error - addCity:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get all cities
exports.getAllCities = async (req, res) => {
  try {
    const result = await cityService.getAllCities();
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getAllCities:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getCityByCode = async (req, res) => {
  try {
    const { city_code } = req.params;
    if (!city_code) {
      return res.status(400).json({ success: false, message: "city_code is required" });
    }

    const result = await cityService.getCityByCode(city_code);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getCityByCode:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getCityByName = async (req, res) => {
  try {
    const { city_name } = req.params;
    if (!city_name) {
      return res.status(400).json({ success: false, message: "city_name is required" });
    }

    const result = await cityService.getCityByName(city_name);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getCityByName:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
