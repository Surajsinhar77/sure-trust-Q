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
}, { timestamps: true });


const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;
