const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');
const ApiError = require('./utils/ApiError');
const errorHandler = require('./middleware/errorHandler');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const carRoute = require('./routes/cars');
const inquiryRoute = require('./routes/inquiries');



// Create Express app
const app = express();

// =============================
// Middlewares
// =============================
app.use(cors({
    origin:'http://localhost:5173', 
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());


// =============================
// Database Connection
// =============================
const connectDB = require('./config/db');
connectDB();

// =============================
// Routes
// =============================
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/cars',carRoute);
app.use('/api/v1/inquiries', inquiryRoute);
app.use('/api/v1/admin', adminRoute);

app.all(/.*/, (req, res, next) => {
    next(ApiError.notFound(`Can't find ${req.originalUrl} on this server`));
});

// =============================
// Global Error Handler
// =============================
app.use(errorHandler);

// =============================
// Start Server
// =============================
const PORT = process.env.PORT || 5000;

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
});
