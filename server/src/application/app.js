const express = require('express');
const cors = require('cors');
const app = express();
const userRoute = require('../routes/user.route');
const courseRoute = require('../routes/course.route');
const batchRoute = require('../routes/batch.route');
const questionRoute = require('../routes/question.route');
const answerRoute = require('../routes/answer.route');
const endrollmentRoute = require('../routes/endrollment.routes');
const testRoute = require('../test/test.route');
const verifyToken = require('../middleware/auth.middleware');
const cookiesParser = require('cookie-parser');
require('dotenv').config();

app.use(cookiesParser());
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend domain
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

app.get('/', async(_, res) => {

    return res.send(`
        Welcome to the backend
        Endpoints: 
        /api/v1/user/auth  </br>
        /api/v1/course </br>
        /api/v1/batch </br>
        /api/v1/question </br>
        /api/v1/answer </br>
        /api/v1/enrollment  </br>
    `);
});

app.use('/api/v1/auth', userRoute);
app.use('/api/v1/course', verifyToken, courseRoute);
app.use('/api/v1/batch', verifyToken, batchRoute);
app.use('/api/v1/question', verifyToken, questionRoute);
app.use('/api/v1/answer', verifyToken, answerRoute);
app.use('/api/v1/enrollment', verifyToken, endrollmentRoute);
app.use('/api/v1/test',verifyToken, testRoute);

module.exports = app;