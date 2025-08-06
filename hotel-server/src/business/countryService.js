
const countryDao = require("../dao/countryDao");

exports.getAllCountries = async () => {
  return countryDao.getAllCountries();
};

exports.addCountry = async (data) => {
  return countryDao.addCountry(data);
};

exports.getCountryByCode = async (country_code) => {
  return countryDao.getCountryByCode(country_code);
};

exports.getCountryByName = async (country_name) => {
  return countryDao.getCountryByName(country_name);
};
