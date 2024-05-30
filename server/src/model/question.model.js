const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
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
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },

    codeSnippet: {
        type: String,
        default: '',
    },

    tags: {
        type: [String],
        default: [],
    },
    
    images: {
        type: [String],
        default: [''],
    },

    batchId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
        required: true,
    }
}, { timestamps: true });


const Question = mongoose.model('Question', questionSchema);
export default Question;