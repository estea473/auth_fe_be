const express = require('express');
const { authenticate } = require('../middleware/authenticateToken');

const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});

app.get('/loginsignup',function(req,res){
  res.sendFile('../login_signup/login_signup.html');
});

module.exports = router;