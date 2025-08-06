
const connection = require("../config/db");

exports.addCity = async ({ city_name, city_code, state_id, status }) => {
  try {
    const [result] = await connection.promise().execute(
      `INSERT INTO city (city_id,city_name, city_code, state_id, status)
       VALUES (?, ?, ?, ?)`,
      [city_name, city_code, state_id, status]
    );
    return result.affectedRows === 1 ? "City added successfully" : "Failed to add city";
  } catch (err) {
    console.error("DAO Error - addCity:", err.message);
    throw err;
  }
};

exports.getAllCities = async () => {
  try {
    const [rows] = await connection.promise().execute(
      `SELECT  city_id,city_name, city_code, status FROM city`
    );
    return rows;
  } catch (err) {
    console.error("DAO Error - getAllCities:", err.message);
    throw err;
  }
};

// Filter by city code
exports.getCityByCode = async (city_code) => {
  try {
    const [rows] = await connection.promise().execute(
      `SELECT city_name, city_code, status FROM city WHERE city_code LIKE ?`,
      [`%${city_code}%`]
    );
    return rows;
  } catch (err) {
    console.error("DAO Error - getCityByCode:", err.message);
    throw err;
  }
};

exports.getCityByName = async (city_name) => {
  try {
    const [rows] = await connection.promise().execute(
      `SELECT city_name, city_code, status FROM city WHERE city_name LIKE ?`,
      [`%${city_name}%`]
    );
    return rows;
  } catch (err) {
    console.error("DAO Error - getCityByName:", err.message);
    throw err;
  }
};
