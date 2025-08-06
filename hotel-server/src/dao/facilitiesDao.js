const connection = require("../config/db");

exports.getAllFacilities = async () => {
  const [rows] = await connection.promise().execute(
    "SELECT facility_id,facility_name, facility_code, status FROM facilities"
  );
  return rows;
};

exports.addFacility = async ({ facility_name, facility_code, facility_tag, status }) => {
  const [result] = await connection.promise().execute(
    `INSERT INTO facilities (facility_name, facility_code, facility_tag, status) 
     VALUES (?, ?, ?, ?)`,
    [facility_name, facility_code, facility_tag, status]
  );
  return result.affectedRows === 1 ? "Facility added successfully" : "Insert failed";
};

exports.getFacilityByCode = async (code) => {
  const [rows] = await connection.promise().execute(
    `SELECT facility_name, facility_code, status 
     FROM facilities 
     WHERE facility_code LIKE ?`,
    [`%${code}%`]
  );
  return rows;
};

exports.getFacilityByName = async (name) => {
  const [rows] = await connection.promise().execute(
    `SELECT facility_name, facility_code, status 
     FROM facilities 
     WHERE facility_name LIKE ?`,
    [`%${name}%`]
  );
  return rows;
};
