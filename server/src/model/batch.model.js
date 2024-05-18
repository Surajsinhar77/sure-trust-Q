
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
}, { timestamps: true });

const Batch = mongoose.model('Batch', batchSchema);
export default Batch;

