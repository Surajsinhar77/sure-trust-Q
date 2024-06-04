const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
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


courseSchema.pre('remove', async function(next) {
    await this.model('Batch').deleteMany({ courseId: this._id });
    next();
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;