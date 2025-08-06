const path = require("path");
const connection = require("../config/db");

exports.allCategories = async () => {
  try {
    const [rows] = await connection
      .promise()
      .execute("SELECT category_id, category_name, category_code, status FROM category");
    return rows;
  } catch (err) {
    console.error("DAO Error - allCategories:", err.message);
    throw err;
  }
};

exports.addCategory = async ({ category_name, category_code, status }) => {
  try {
    const [result] = await connection.promise().execute(
      "INSERT INTO category (category_name, category_code, status) VALUES (?, ?, ?)",
      [category_name, category_code, status]
    );
    return result.affectedRows === 1 ? "Data saved" : "Not saved";
  } catch (err) {
    console.error("DAO Error - addCategory:", err.message);
    throw err;
  }
};

exports.categoryByCode = async (category_code) => {
  try {
    if (!category_code) {
      throw new Error("Category code is required");
    }

    const [rows] = await connection
      .promise()
      .execute("SELECT category_name, category_code, status FROM category WHERE category_code = ?", [
        category_code,
      ]);

    if (rows.length === 0) {
      return "No data found for the given category code";
    }

    return rows[0];
  } catch (err) {
    console.error("DAO Error - categoryByCode:", err.message);
    return "Failed to fetch data";
  }
};

exports.categoryByName = async (category_name) => {
  try {
    if (!category_name) {
      throw new Error("Category name is required");
    }

    const [rows] = await connection
      .promise()
      .execute("SELECT category_name, category_code, status FROM category WHERE category_name = ?", [
        category_name,
      ]);

    if (rows.length === 0) {
      return "No data found for the given category name";
    }

    return rows[0];
  } catch (err) {
    console.error("DAO Error - categoryByName:", err.message);
    return "Failed to fetch data";
  }
};
