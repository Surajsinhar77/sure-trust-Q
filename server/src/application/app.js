const express = require('express');
const cors = require('cors');
const app = express();
const userRoute = require('../routes/user.route');
require('dotenv').config();

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
));

app.use('/api/v1/user/auth', userRoute);    

app.use(express.json());
export default app;