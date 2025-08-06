const room_amenityDao = require("../dao/room_amenityDao");

exports.allroomamenity = async () => room_amenityDao.allroomamenity();

exports.addroomamenity = async (data) => room_amenityDao.addroomamenity(data);

exports.roomamenityByCode = async (amenity_code) =>
  room_amenityDao.roomamenityByCode(amenity_code);

exports.roomamenityByName = async (amenity_name) =>
  room_amenityDao.roomamenityByName(amenity_name);
