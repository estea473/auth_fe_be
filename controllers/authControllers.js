const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { compile } = require('morgan')

const generateAccessToken = (id) => {
    console.log("JWT Secret:", process.env.JWT_SEC); // Debugging line
    return jwt.sign({ id }, process.env.JWT_SEC, { expiresIn: '1d' });
};
const sendAuthToken  = (user, statusCode, res, redirectPath = null) => {
    const authToken = generateAccessToken(user._id);
    console.log("Generated Auth Token:", authToken); // Debugging line

    const cookieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.cookie('jwt', authToken, cookieOptions);
    user.password = undefined;

    if (redirectPath) {
        return res.redirect(redirectPath);
    }
    
    res.status(statusCode).json({
        success: true,
        authToken,
        data: user
    });
};

const registerUser = async (req, res) => {
    try {
        const { fullname, username, age, email, password } = req.body;
        const createUser = await User.create({
            fullname, 
            username, 
            age, 
            email,
            password
        });
        
        
    } catch (error) {
        return res.status(400).json({
            message: "Error",
            error
        });
    }

    res.redirect('/loginSignup');
};

const loginSignup = (req, res) => {
    res.sendFile('./login_signup/login_signup.html',{ root: '.' });
}

const dashboard = (req, res) => {
    res.sendFile('./dashboard/dashboard1.html',{ root: '.' });
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                message: "Username dan password tidak boleh kosong"
            });
        }
        const userData = await User.findOne({ username });
        if (!userData) {
            return res.status(400).json({
                message: "Username belum terdaftar"
            });
        }
        // const passValid = await bcrypt.compare(password, userData.password);
        if (userData && userData.password) {
            return sendAuthToken(userData, 200, res, '/dashboard');
        } else {
            return res.status(400).json({
                message: "Password salah"
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: "Error",
            error: error.message
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updatedData = req.body;
        await User.findByIdAndUpdate(userId, updatedData);
        res.status(200).json({ success: true, message: 'Profil berhasil diperbarui' });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ success: false, message: 'Terjadi kesalahan saat memperbarui profil pengguna' });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ success: true, message: 'Logout berhasil' });
}

const getUser = (req, res) => {
    res.send('Berhasil');
    res.status(200).json({ success: true, message: 'Logout berhasil' });
}

module.exports = { registerUser, loginUser, logoutUser, getUser, updateProfile, loginSignup,dashboard };