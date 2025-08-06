const propertyDao = require("../dao/cardDataDao");
exports.getAllHotelCards = async ()=> {
  return await propertyDao.getAllHotelCards();
};
