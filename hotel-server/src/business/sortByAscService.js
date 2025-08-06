const propertyDao = require("../dao/sortByAscDao");

exports.getHotelCardsSortedByPrice = async ()=> {
  return await propertyDao.getHotelCardsSortedByPrice();
};

exports.getHotelCardsSortedByDes = async ()=> {
  return await propertyDao.getHotelCardsSortedByDes();
};

exports.getHotelCardsSortedByRating = async ()=> {
  return await propertyDao.getHotelCardsSortedByRating();
};