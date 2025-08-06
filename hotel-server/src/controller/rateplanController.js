const ratePlanService = require("../business/rateplanService");

// Add Rate Plan
exports.addRatePlan = async (req, res) => {
  try {
    const data = req.body;

    // Basic validation
    if (!data.property_id || !data.room_id || !data.rate_code || !data.rate_name) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const result = await ratePlanService.addRatePlan(data);
    res.status(201).json({ success: true, message: "Rate plan added successfully", rate_plan_id: result });
  } catch (error) {
    console.error("Error adding rate plan:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get All Rate Plans
exports.getAllRatePlans = async (req, res) => {
  try {
    const data = await ratePlanService.getAllRatePlans();
    res.status(200).json({ success: true, message: data });
  } catch (error) {
    console.error("Error fetching rate plans:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
