const connection = require("../config/db");

exports.allroomamenity = async () => {
  const [rows] = await connection
    .promise()
    .execute("SELECT amenity_name, amenity_code, status FROM room_amenities");
  return rows;
};



exports.roomamenityByCode = async (amenity_code) => {
  try {
    if (!amenity_code) throw new Error("Amenity code is required");

    const [rows] = await connection
      .promise()
      .execute("SELECT amenity_name, amenity_code, status FROM room_amenities WHERE amenity_code = ?", [
        amenity_code,
      ]);

    return rows.length ? rows[0] : "No data found for the given amenity code";
  } catch (err) {
    console.error("DAO Error - roomamenityByCode:", err.message);
    return "Failed to fetch data";
  }
};

exports.roomamenityByName = async (amenity_name) => {
  try {
    if (!amenity_name) throw new Error("Amenity name is required");

    const [rows] = await connection
      .promise()
      .execute("SELECT amenity_name, amenity_code, status FROM room_amenities WHERE amenity_name = ?", [
        amenity_name,
      ]);

    return rows.length ? rows[0] : "No data found for the given amenity name";
  } catch (err) {
    console.error("DAO Error - roomamenityByName:", err.message);
    return "Failed to fetch data";
  }
};
