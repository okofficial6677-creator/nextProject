const inclusionService = require("../business/inclusionervic");

exports.allInclusions = async (req, res) => {
  try {
    const data = await inclusionService.allinclusion();
    res.json({ success: true, message: data });
  } catch (err) {
    console.error("Controller Error - allInclusions:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
exports.addInclusion = async (req, res) => {
  try {
    const { inclusion_name, inclusion_code, status } = req.body;
    console.log("Received:", inclusion_name, inclusion_code, status);

    if (!inclusion_name || !inclusion_code || typeof status === "undefined") {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: inclusion_name, inclusion_code, or status",
      });
    }

    const result = await inclusionService.addinclusion({
      inclusion_name,
      inclusion_code,
      status,
    });

    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - addInclusion:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


exports.inclusionByCode = async (req, res) => {
  try {
    const { inclusion_code } = req.params;

    const result = await inclusionService.inclusionByCode(inclusion_code);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - inclusionByCode:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.inclusionByName = async (req, res) => {
  try {
    const {inclusion_name } = req.params;

    const result = await inclusionService.inclusionByName(inclusion_name);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - inclusionByName:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
