const express = require('express');
const cors = require('cors');
const app = express();
const userRoute = require('../routes/user.route');
const courseRoute = require('../routes/course.route');
const batchRoute = require('../routes/batch.route');
const questionRoute = require('../routes/question.route');
const answerRoute = require('../routes/answer.route');
const verifyToken = require('../middleware/auth.middleware');


const cookiesParser = require('cookie-parser')
require('dotenv').config();

app.use(cookiesParser());

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
));

app.use('/api/v1/user/auth', userRoute);   
app.use('/api/v1/course',verifyToken, courseRoute);
app.use('/api/v1/batch',verifyToken, batchRoute);
app.use('/api/v1/question',verifyToken, questionRoute);
app.use('/api/v1/answer',verifyToken, answerRoute);

app.use(express.json());
export default app;