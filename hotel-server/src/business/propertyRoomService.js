const roomDao = require("../dao/propertyRoomDao");

exports.addRoom = async (data) => {
  return roomDao.addRoom(data);
};

exports.getAllRoom = async () => {
  return roomDao.getAllRoom();
};
