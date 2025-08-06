const { loginUser } = require('../business/login_authService');
exports.login = async (req, res) => {
  const { email, password } = req.body || {};
  console.log('Login attempt:', email, password); // log this

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const result = await loginUser(email, password);
    res.json(result); // { user, token }
  } catch (err) {
    console.error('Controller Login Error:', err.message);
    res.status(401).json({ message: err.message });
  }
};
