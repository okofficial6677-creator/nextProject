const propertyDao = require("../dao/hotelPropDao");

exports.getAllProperties = () => propertyDao.getAllProperties();
exports.getPropertyById = (id) => propertyDao.getPropertyById(id);
exports.createProperty = (data) => propertyDao.createProperty(data);
