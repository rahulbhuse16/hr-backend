require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 5500;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const dbConnection = require('./configs/db-config');
const authRoute = require('./routes/auth-route');
const adminRoute = require('./routes/admin-route');
const employeeRoute = require('./routes/employee-route');
const leaderRoute = require('./routes/leader-route');
const errorMiddleware = require('./middlewares/error-middleware');
const ErrorHandler = require('./utils/error-handler');
const {auth, authRole} = require('./middlewares/auth-middleware');
const app = express();

// Database Connection
dbConnection();



//Cors Option
const corsOption = {
    credentials:true,
    origin:true
}

//Configuration
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth',authRoute);
app.use('/api/admin',auth,authRole(['admin']),adminRoute);
app.use('/api/employee',auth,authRole(['employee','leader']),employeeRoute);
app.use('/api/leader',auth,authRole(['leader']),leaderRoute);


app.use('/storage',express.static('storage'))

//Middlewares;
app.use((req,res,next)=>
{
    return next(ErrorHandler.notFound('The Requested Resources Not Found'));
});

app.use(errorMiddleware)





app.listen(PORT,()=>console.log(`Listening On Port : ${PORT}`));