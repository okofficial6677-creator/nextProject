const jwt = require('jsonwebtoken');
const { findUserByEmailAndPassword } = require('../dao/login_authDao');
const { JWT_SECRET } = require('../config/jwt');

exports.loginUser = async (email, password) => {
  const user = await findUserByEmailAndPassword(email, password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: user.reg_id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    token,
    user: {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email
    }
  };
};
