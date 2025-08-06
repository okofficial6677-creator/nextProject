const registrationDao = require("../dao/registrationDao");

exports.registerUser = async (userData) => {
  return await registrationDao.registerUser(userData);
};

exports.getAllUsers = async () => {
  return await registrationDao.getAllUsers();
};
