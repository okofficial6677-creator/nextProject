const pool = require("../config/db");

exports.getAllRoom = async () => {
  const sql = "SELECT room_id,property_id, room_type, total_rooms, room_area, size_unit, status, description, smoking_policy, extra_beds_allowed, min_price, min_adult_occupancy, max_adult_occupancy, max_total_occupancy, child_with_bed, child_without_bed FROM room";
  const [rows] = await pool.promise().query(sql);
  return rows;
};

exports.addRoom = async (data) => {
  const sql = `INSERT INTO room 
  (property_id, room_type, total_rooms, room_area, size_unit, status, description, smoking_policy, extra_beds_allowed, min_price, min_adult_occupancy, max_adult_occupancy, max_total_occupancy, child_with_bed, child_without_bed) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  const values = [
    data.property_id,
    data.room_type,
    data.total_rooms,
    data.room_area,
    data.size_unit,
    data.status,
    data.description,
    data.smoking_policy,
    data.extra_beds,
    data.min_price,
    data.min_adult,
    data.max_adult,
    data.max_occupancy,
    data.child_with_bed,
    data.child_without_bed,
  ];

  const [result] = await pool.promise().query(sql, values);
  return result.insertId;
};
