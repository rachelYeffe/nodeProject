const User = require('../moudels/user.moudles');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  TOKEN_SECRET = "config.TOKEN_SECRET"; // הפנייה לקובץ הגדרות שלך

const signIn = async (user) => {
    try {
        // בודק אם קיים משתמש עם הסיסמה והמייל שנשלחו באובייקט user
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
            throw new Error('User not found or invalid credentials'); // אם לא נמצא משתמש, זרוק שגיאה
        }
        console.log(user.password);
        const validPassword = await bcrypt.compare(user.password, existingUser.password);
        if (!validPassword)
            return res.status(401).json({ message: 'Invalid password' });
        // const myUser = { userEmail: existingUser.email };
        console.log(existingUser);
        const token = jwt.sign(
            {
                userType: existingUser.type,
                userEmail: existingUser.email

            },
            TOKEN_SECRET, // השתמש במפתח הסודי מהגדרות
            { expiresIn: '1h' } // אפשרות להוסיף תפוגה לטוקן, לדוגמה 1 שעה
        ); console.log(`${token}`);
        console.log("User successfully signed in");
        return token; // אם המשתמש קיים, החזר את המשתמש ממסד הנתונים
    } catch (error) {
        console.error(`Error in signing in: ${error.message}`);
        throw error;
    }
};

const signUp = async (userData) => {
    try {
        // בודק אם כבר קיים משתמש עם האימייל שנשלח באובייקט userData

        console.log("llllgggllll");
        const existingUser = await User.findOne({ email: userData.email });
        console.log();

        if (existingUser) {
            throw new Error('User with this email already exists'); // אם כבר קיים משתמש עם האימייל, זרוק שגיאה
        }
        console.log("llllllll");
        // יצירת משתמש חדש במסד הנתונים

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = {
            email: userData.email,
            password: hashedPassword,
            name: userData.name,
            type: 'user',
        };
        const newUser = new User(user);
        const savedUser = await newUser.save();
        console.log("User successfully signed up");
        return savedUser; // החזרת המשתמש החדש שנוצר במסד הנתונים
    } catch (error) {
        console.error(`Error in signing up: ${error.message}`);
        throw error;
    }
};






module.exports = {
    signIn,
    signUp
};
