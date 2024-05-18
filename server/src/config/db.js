
const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Database connection failed', error);
    }
}

export default db;