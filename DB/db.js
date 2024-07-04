const mongoose = require('mongoose');
require('dotenv').config();
const mongoUri = process.env.MONGO_URI;
const connectDB = async () => {
    try {
   
        const conn = await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
    
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
