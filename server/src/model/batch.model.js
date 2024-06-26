
const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    batchName: { 
        type: String,
        required: true,
        unique: true,
    },
    
    courseId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },

    TeacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: 'Not assigned',
    },

    userId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },

    startDate: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });


// i just want to delete one user from the batch with is User Id array

const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;

