const connection = require("../config/db");

exports.getAllChains = async () => {
  try {
    const [rows] = await connection.promise().execute("SELECT chain_id,chain_name, chain_description, status FROM chain");
    return rows;
  } catch (err) {
    console.error("DAO Error - getAllChains:", err.message);
    throw err;
  }
};

exports.addChain = async ({ chain_name, chain_description, status }) => {
  try {
    const [result] = await connection.promise().execute(
      "INSERT INTO chain (chain_name, chain_description, status) VALUES (?, ?, ?)",
      [chain_name, chain_description, status]
    );
    return result.affectedRows === 1 ? "Data saved" : "Not saved";
  } catch (err) {
    console.error("DAO Error - addChain:", err.message);
    throw err;
  }
};

exports.getChainByName = async (chain_name) => {
  try {
    if (!chain_name) throw new Error("Chain name is required");

    const [rows] = await connection
      .promise()
      .execute("SELECT chain_name, chain_description, status FROM chain WHERE chain_name = ?", [chain_name]);

    if (rows.length === 0) return "No data found for the given chain name";

    return rows[0];
  } catch (err) {
    console.error("DAO Error - getChainByName:", err.message);
    return "Failed to fetch data";
  }
};

exports.getChainByDesc = async (chain_description) => {
  try {
    if (!chain_description) throw new Error("Chain Code is required");

    const [rows] = await connection
      .promise()
      .execute("SELECT chain_name, chain_description, status FROM chain WHERE chain_description = ?", [chain_description]);

    if (rows.length === 0) return "No data found for the given chain code";

    return rows[0];
  } catch (err) {
    console.error("DAO Error - getChainById:", err.message);
    return "Failed to fetch data";
  }
};
