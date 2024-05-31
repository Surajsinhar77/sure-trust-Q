const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Database connection failed', error);
    }
}

module.exports = db;