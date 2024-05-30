const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({ 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    
    text : {
        type: String,
        required: true,
    },
    
    codeSnippet: {
        type: String,
        default: '',
    },
    
    images : {
        type: [String],
        default: [''],
    },
}
, { timestamps: true });

const Answer = mongoose.model('Answer', answerSchema);
export default Answer;