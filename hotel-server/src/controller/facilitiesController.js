const facilityService = require("../business/facilitiesService");

exports.getAllFacilities = async (req, res) => {
  const data = await facilityService.getAllFacilities();
  res.json({ success: true, message: data });
};

exports.addFacility = async (req, res) => {
  const { facility_name, facility_code, facility_tag, status } = req.body;
  if (!facility_name || !facility_code || typeof status === "undefined") {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }
  const result = await facilityService.addFacility({ facility_name, facility_code, facility_tag, status });
  res.json({ success: true, message: result });
};

exports.getFacilityByCode = async (req, res) => {
  const code = req.params.code;
  const data = await facilityService.getFacilityByCode(code);
  res.json({ success: true, message: data });
};

exports.getFacilityByName = async (req, res) => {
  const name = req.params.name;
  const data = await facilityService.getFacilityByName(name);
  res.json({ success: true, message: data });
};
