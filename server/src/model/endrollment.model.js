const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    courseId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },

    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
        required: true,
    },
    allowed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });


const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;