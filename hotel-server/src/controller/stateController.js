const stateService = require("../business/stateService");

exports.getAllStates = async (req, res) => {
  try {
    const result = await stateService.getAllStates();
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getAllStates:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.addState = async (req, res) => {
  try {
    const { state_name, state_code, country_id, status } = req.body;
    if (!state_name || !state_code || !country_id || typeof status === "undefined") {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: state_name, state_code, country_id, or status",
      });
    }

    const result = await stateService.addState({ state_name, state_code, country_id, status });
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - addState:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getStateByCode = async (req, res) => {
  try {
    const { state_code } = req.params;
    const result = await stateService.getStateByCode(state_code);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getStateByCode:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getStateByName = async (req, res) => {
  try {
    const { state_name } = req.params;
    const result = await stateService.getStateByName(state_name);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getStateByName:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


exports.getStateByCountryName = async (req, res) => {
  try {
    const {country_name} = req.query;
    if (!country_name) {
      return res.status(400).json({ success: false, message: "country_name is required" });
    }
    const result = await stateService.getStateByCountryName(country_name);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - filterByCountryName:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
