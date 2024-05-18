const mongoose = require('mongoose');

const role = ['admin', 'user' ,'teacher'];

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
        trim: true,
    },

    role: {
        type: String,
        enum: role,
        default: 'user',
    },

    isApproved: {
        type: Boolean,
        default: false,
    },

    profilePicture: {
        type: String,
        default: '',
        required: true,
    },

    phoneNo: {
        type: String,
        default: '',
        required: true,
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
    
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
export default User;