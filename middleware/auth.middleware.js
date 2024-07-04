// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const JWT_SECRET = "config.TOKEN_SECRET"; // הפנייה לקובץ הגדרות שלך

// Middleware function to authenticate JWT token
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        console.log(decodedToken+" kkkk");
        req.user = decodedToken.userType; // הוספת כל הנתונים של המשתמש מהטוקן ל-request
        next();
    } catch (error) {
        console.error('Error verifying JWT:', error);
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// Middleware function to check if user is admin
const isAdminMiddleware = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User information not available' });
        }

        // Assuming your user type is stored in the JWT payload under 'usrType'
        const userType = req.user;
        console.log(userType+" " +req.user);
        
        if (userType !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        next();
    } catch (error) {
        console.error('Error checking admin status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const isUserMiddleware = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User information not available' });
        }

        // Assuming your user type is stored in the JWT payload under 'usrType'
        const userType = req.user;
        console.log(userType);
        if (userType !== 'user'&&userType !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        next();
    } catch (error) {
        console.error('Error checking admin status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    authMiddleware,
    isAdminMiddleware,
    isUserMiddleware,
};
