const db = require('../config/db'); // This is already a promise-based pool

exports.findUserByEmailAndPassword = async (email, password) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM registration WHERE email = ? AND password = ?',
      [email, password]
    );
    return rows.length ? rows[0] : null;
  } catch (err) {
    console.error('DAO Error:', err.message);
    throw err;
  }
};
