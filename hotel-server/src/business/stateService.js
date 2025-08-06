const stateDao = require("../dao/stateDao");

exports.getAllStates = async () => {
  return stateDao.getAllStates();
};

exports.addState = async (data) => {
  return stateDao.addState(data);
};

exports.getStateByCode = async (state_code) => {
  return stateDao.getStateByCode(state_code);
};

exports.getStateByName = async (state_name) => {
  return stateDao.getStateByName(state_name);
};

exports.getStateByCountryName = async (country_name) => {
  return stateDao.getStateByCountryName(country_name);
};
