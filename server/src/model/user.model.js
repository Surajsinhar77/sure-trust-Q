const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {genrateAccessToken, genrateRefreshToken} = require('../service/genrateToken.service');
const role = ['admin', 'student' ,'teacher'];

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
    
}, { timestamps: true });


userSchema.methods.genrateRefToken = function() {
    return genrateRefreshToken({_id : this._id});
}

userSchema.methods.genrateAccessTkn = function() {
    return genrateAccessToken({
        _id : this._id,
        email : this.email,
        name : this.name,
        role : this.role,
    })
}

userSchema.methods.isPasswordMatch = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;