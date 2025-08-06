const connection = require("../config/db");

/**
 * Get all registered users.
 */
exports.getAllUsers = async () => {
  try {
    const [rows] = await connection.execute(
      "SELECT reg_id, first_name, last_name, email FROM registration"
    );
    return rows;
  } catch (err) {
    console.error("DAO Error - getAllUsers:", err.message);
    throw err;
  }
};

/**
 * Register a new user in the database.
 * Ensures no bind parameter is undefined by replacing with null if needed.
 */
exports.registerUser = async ({ first_name, last_name, email, password }) => {
  try {
    // Ensure no values are undefined — replace undefined with null (which becomes SQL NULL)
    const safeValues = [
      first_name ?? null,
      last_name ?? null,
      email ?? null,
      password ?? null
    ];

    // Basic check to prevent null insertion
    if (safeValues.includes(null)) {
      throw new Error("Missing required user registration fields");
    }

    const [result] = await connection.execute(
      "INSERT INTO registration (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
      safeValues
    );

    return result.affectedRows === 1
      ? "User registered successfully"
      : "Registration failed";
  } catch (err) {
    console.error("DAO Error - registerUser:", err.message);

    // Handle duplicate email
    if (err.code === "ER_DUP_ENTRY") {
      return "Email already exists";
    }

    throw err;
  }
};
