const facilityDao = require("../dao/facilitiesDao");

exports.getAllFacilities = () => facilityDao.getAllFacilities();
exports.addFacility = (data) => facilityDao.addFacility(data);
exports.getFacilityByCode = (code) => facilityDao.getFacilityByCode(code);
exports.getFacilityByName = (name) => facilityDao.getFacilityByName(name);
