const express = require('express');
const { authenticateToken } = require('../middleware/authenticateToken');
const { registerUser, loginUser, logoutUser, getUser, updateProfile, loginSignup,dashboard } = require('../controllers/authControllers');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getUser', getUser);
router.get('/loginSignup', loginSignup);
router.get('/dashboard',authenticateToken, dashboard);
router.put('/update-profile', authenticateToken, updateProfile);

module.exports = router;
