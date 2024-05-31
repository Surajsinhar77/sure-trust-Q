const express = require('express');
const cors = require('cors');
const app = express();
const userRoute = require('../routes/user.route');
const courseRoute = require('../routes/course.route');
const batchRoute = require('../routes/batch.route');
const questionRoute = require('../routes/question.route');
const answerRoute = require('../routes/answer.route');
const endrollmentRoute = require('../routes/endrollment.routes');
const verifyToken = require('../middleware/auth.middleware');
const {upload} = require('../utlity/uploadImageFunction')
const cookiesParser = require('cookie-parser')
require('dotenv').config();

app.use(cookiesParser());

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
));
app.use(express.json());

app.post('/', upload,(req, res) => {

    const file = req.file;
    const filepath = file.path;
    console.log("Test Api ", filepath);
    console.log("Test Api ", file);
    res.send(`
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

module.exports = app;