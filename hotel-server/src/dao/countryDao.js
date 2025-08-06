const path = require("path");
const connection = require("../config/db");

exports.getAllCountries = async () => {
  try {
    const [rows] = await connection
      .promise()
      .execute("SELECT country_id,country_name, country_code, country_isd, status FROM country");
    return rows;
  } catch (err) {
    console.error("DAO Error - getAllCountries:", err.message);
    throw err;
  }
};

exports.addCountry = async ({ country_name, country_code, country_flag, country_isd, status }) => {
  try {
    const [result] = await connection.promise().execute(
      "INSERT INTO country (country_name, country_code, country_flag, country_isd, status) VALUES (?, ?, ?, ?, ?)",
      [country_name, country_code, country_flag, country_isd, status]
    );
    return result.affectedRows === 1 ? "Country added successfully" : "Failed to add country";
  } catch (err) {
    console.error("DAO Error - addCountry:", err.message);
    throw err;
  }
};

exports.getCountryByCode = async (country_code) => {
  try {
    const [rows] = await connection
      .promise()
      .execute(
        "SELECT country_name, country_code, country_isd, status FROM country WHERE country_code LIKE ?",
        [`%${country_code}%`]
      );

    if (rows.length === 0) {
      return "No data found for the given country code";
    }

    return rows;
  } catch (err) {
    console.error("DAO Error - getCountryByCode:", err.message);
    return "Failed to fetch data";
  }
};

exports.getCountryByName = async (country_name) => {
  try {
    const [rows] = await connection
      .promise()
      .execute(
        "SELECT country_name, country_code, country_isd, status FROM country WHERE country_name LIKE ?",
        [`%${country_name}%`]
      );

    if (rows.length === 0) {
      return "No data found for the given country name";
    }

    return rows;
  } catch (err) {
    console.error("DAO Error - getCountryByName:", err.message);
    return "Failed to fetch data";
  }
};
