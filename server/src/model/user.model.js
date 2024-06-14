const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {genrateAccessToken, genrateRefreshToken} = require('../service/genrateToken.service');
const role = ['admin', 'student' ,'teacher'];
const questionModel = require('./question.model');  
const answerModel = require('./answer.model');
const endrollment = require('./endrollment.model');
const batchModel = require('./batch.model');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    role: {
        type: String,
        enum: role,
        default: 'student',
    },

    isApproved: {
        type: Boolean,
        default: false,
    },

    profilePicture: {
        type: String,
        required: true,
    },

    phoneNo: {
        type: String,
        default: '',
    },

    github: {
        type: String,
        default: '',
    },

    linkedin: {
        type: String,
        default: '',
    },

    resume: {
        type: String,
        default: '',
    },

    bio: {
        type: String,
        default: '',
    },

    skills: {
        type: Array,
        default: [],
    },

    experience: {
        type: Array,
        default: [],
    },

    refreshToken: {
        type: String,
        default: '',
    },
    
    courseId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },

    batchId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
        required: true,
    }
}, { timestamps: true });


userSchema.methods.genrateRefToken =async function() {
    const newtoken = await genrateRefreshToken({_id : this._id});
    return newtoken;
}

userSchema.methods.genrateAccessTkn = async function() {
    return await genrateAccessToken({
        _id : this._id,
        email : this.email,
        name : this.name,
        role : this.role,
    })
}

userSchema.methods.isPasswordMatch = async function(password) {
    return await bcrypt.compare(password, this.password);
}


userSchema.pre('remove', async function(next) {
    const userId = this._id;
    const Question = mongoose.model('Question');
    const Answer = mongoose.model('Answer');
    const Enrollment = mongoose.model('Enrollment');
    const Batch = mongoose.model('Batch');
    
    try {
        // Remove all references to the user in other collections
        await Question.deleteMany({ userId: userId });
        await Answer.deleteMany({ userId: userId });
        await Enrollment.deleteMany({ userId: userId });
        await Batch.updateMany({ userId: userId }, { $pull: { userId: userId } });
        
        next();
    } catch (err) {
        next(err);
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;