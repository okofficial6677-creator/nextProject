const registrationDao = require("../dao/registrationDao");

exports.registerUser = async (req, res) => {
  try {
    const userData = req.body;

    // const existingUser = await registrationDao.getUserByEmail(userData.email);
    // if (existingUser) {
    //   return res.status(409).json({ message: "Email already exists" });
    // }

    const result = await registrationDao.registerUser(userData);
    return res.status(201).json({ message: result });
  } catch (err) {
    console.error("Controller Error - registerUser:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await registrationDao.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.error("Controller Error - getAllUsers:", err.message);
    return res.status(500).json({ message: "Failed to retrieve users" });
  }
};

