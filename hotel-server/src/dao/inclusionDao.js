const path = require("path");
const connection = require("../config/db");

exports.allInclusions = async () => {
  try {
    const [rows] = await connection
      .promise()
      .execute("SELECT inclusion_id,inclusion_name, inclusion_code, status FROM inclusions");
    return rows;
  } catch (err) {
    console.error("DAO Error - allInclusions:", err.message);
    throw err;
  }
};

exports.addInclusion = async ({ inclusion_name, inclusion_code, status }) => {
  try {
    const [result] = await connection.promise().execute(
      "INSERT INTO inclusions (inclusion_name, inclusion_code, status) VALUES (?, ?, ?)",
      [inclusion_name, inclusion_code, status]
    );
    return result.affectedRows === 1 ? "Data saved" : "Not saved";
  } catch (err) {
    console.error("DAO Error - addInclusion:", err.message);
    throw err;
  }
};

exports.inclusionByCode = async (inclusion_code) => {
  try {
    if (!inclusion_code) {
      throw new Error("Inclusion code is required");
    }

    const [rows] = await connection
      .promise()
      .execute("SELECT inclusion_name, inclusion_code, status FROM inclusions WHERE inclusion_code = ?", [
        inclusion_code,
      ]);

    if (rows.length === 0) {
      return "No data found for the given inclusion code";
    }

    return rows[0];
  } catch (err) {
    console.error("DAO Error - inclusionByCode:", err.message);
    return "Failed to fetch data";
  }
};

exports.inclusionByName = async (inclusion_name) => {
  try {
    if (!inclusion_name) {
      throw new Error("Inclusion name is required");
    }

    const [rows] = await connection
      .promise()
      .execute("SELECT inclusion_name, inclusion_code, status FROM inclusions WHERE inclusion_name = ?", [
        inclusion_name,
      ]);

    if (rows.length === 0) {
      return "No data found for the given inclusion name";
    }

    return rows[0];
  } catch (err) {
    console.error("DAO Error - inclusionByName:", err.message);
    return "Failed to fetch data";
  }
};
