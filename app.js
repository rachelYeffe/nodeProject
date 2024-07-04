const express = require('express');
require('dotenv').config({ path: '../env/enviroment.env' });

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 9997;
const loginController = require('./controller/login.controller.js');
const serviceController = require('./controller/services.controller.js');
const bussinessController = require('./controller/bussines.controller.js');
const productController = require('./controller/product.controller.js');
const meetingController = require('./controller/meeting.controller.js');
const {authMiddleware,isAdminMiddleware,isUserMiddleware}=require('./middleware/auth.middleware.js')
const connectDB = require('./DB/db.js'); // החיבור ל- db.js שיצרת
const swaggerSpecService = require('./swagger/swagger.js'); // יבוא של swaggerSpec מהקובץ של ה- swagger


connectDB();




app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpecService)); // שימוש ב- swaggerSpec כאן

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("",loginController);
app.use("/service",authMiddleware, serviceController);
app.use("/business",authMiddleware,isAdminMiddleware,bussinessController);
app.use("/meeting", authMiddleware,isUserMiddleware,meetingController);
app.use("/product",authMiddleware,productController);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
