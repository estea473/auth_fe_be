const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    console.log("Cookies received:", req.cookies); // Debugging output

    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Token otentikasi tidak tersedia' });
    }

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Token otentikasi tidak valid' });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
