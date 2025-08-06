const ratePlanDao = require("../dao/rateplanDao");

// Add Rate Plan
exports.addRatePlan = async (ratePlanData) => {
  return await ratePlanDao.addRatePlan(ratePlanData);
};

// Get All Rate Plans
exports.getAllRatePlans = async () => {
  return await ratePlanDao.getAllRatePlans();
};
