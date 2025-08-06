const connection = require("../config/db");


exports.getAllStates = async () => {
  try {
    const [rows] = await connection.promise().execute(`
      SELECT 
        s.state_id,s.state_name, s.state_code, c.country_name, s.status 
      FROM state s
      JOIN country c ON s.country_id = c.country_id
    `);
    return rows;
  } catch (err) {
    console.error("DAO Error - getAllStates:", err.message);
    throw err;
  }
};


exports.addState = async ({ state_name, state_code, country_id, status }) => {
  try {
    const [result] = await connection.promise().execute(
      `INSERT INTO state (state_name, state_code, country_id, status) VALUES (?, ?, ?, ?)`,
      [state_name, state_code, country_id, status]
    );
    return result.affectedRows === 1 ? "State added successfully" : "Failed to add state";
  } catch (err) {
    console.error("DAO Error - addState:", err.message);
    throw err;
  }
};


exports.getStateByCode = async (state_code) => {
  try {
    const [rows] = await connection.promise().execute(`
      SELECT s.state_name, s.state_code, c.country_name, s.status
      FROM state s
      JOIN country c ON s.country_id = c.country_id
      WHERE s.state_code LIKE ?
    `, [`%${state_code}%`]);
    return rows;
  } catch (err) {
    console.error("DAO Error - getStateByCode:", err.message);
    throw err;
  }
};


exports.getStateByName = async (state_name) => {
  try {
    const [rows] = await connection.promise().execute(
      `SELECT s.state_name, s.state_code, c.country_name, s.status
       FROM state s
       JOIN country c ON s.country_id = c.country_id
       WHERE s.state_name LIKE ?`,
      [`%${state_name}%`]
    );
    return rows;
  } catch (err) {
    console.error("DAO Error - getStateByName:", err.message);
    throw err;
  }
};


exports.getStateByCountryName = async (country_name) => {
  try {
    const [rows] = await connection.promise().execute(
      `SELECT s.state_name, s.state_code, c.country_name, s.status
       FROM state s 
       JOIN country c ON s.country_id = c.country_id
       WHERE c.country_name LIKE ?`,
      [`%${country_name}%`]
    );
    return rows;
  } catch (err) {
    console.error("DAO Error - getStateByCountryName:", err.message);
    throw err;
  }
};
