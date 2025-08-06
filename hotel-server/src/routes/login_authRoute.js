const express = require('express');
const router = express.Router();
const { login } = require('../controller/login_authoController');
const { verifyToken } = require('../middleware/login_authMiddleware');


router.post('/', login);
router.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Profile accessed successfully',
    user: req.user, 
  });
});
module.exports = router;


