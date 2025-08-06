const propertyDao = require("../dao/propertyDao");

exports.addProperty = async (data) => {
  return await propertyDao.addProperty(data);
};

exports.getAllProperties = async () => {
  return await propertyDao.getAllProperties();
};

exports.getByCountryName = async (country_name) => {
  if (!country_name) throw new Error("country_name is required");
  return await propertyDao.getByCountryName(country_name);
};

exports.getByStateName = async (state_name) => {
  if (!state_name) throw new Error("state_name is required");
  return await propertyDao.getByStateName(state_name);
};

exports.getByCityName = async (city_name) => {
  if (!city_name) throw new Error("city_name is required");
  return await propertyDao.getByCityName(city_name);
};

exports.getByPropertyName = async (property_name) => {
  if (!property_name) throw new Error("property_name is required");
  return await propertyDao.getByPropertyName(property_name);
};

exports.getByPropertyCode = async (property_code) => {
  if (!property_code) throw new Error("property_code is required");
  return await propertyDao.getByPropertyCode(property_code);
};

exports.getByChainName = async (chain_name) => {
  if (!chain_name) throw new Error("chain_name is required");
  return await propertyDao.getByChainName(chain_name);
};

exports.getByStatus = async (status) => {
  if (typeof status === "undefined") throw new Error("status is required");
  return await propertyDao.getByStatus(status);
};

exports.searchProperties = async (keyword) => {
  return await propertyDao.searchProperties(keyword);
};
