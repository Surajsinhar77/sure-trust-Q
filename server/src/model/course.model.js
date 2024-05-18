const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    
    tags: {
        type: [String],
        default: [],
    },
    batches: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Batch',
        default: [],
    },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;