
const cityDao = require("../dao/cityDao");

exports.addCity = async (data) => {
  return cityDao.addCity(data);
};

exports.getAllCities = async () => {
  return cityDao.getAllCities();
};

exports.getCityByCode = async (city_code) => {
  return cityDao.getCityByCode(city_code);
};

exports.getCityByName = async (city_name) => {
  return cityDao.getCityByName(city_name);
};
