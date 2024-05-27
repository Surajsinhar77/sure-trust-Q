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


userSchema.methods.genrateRefreshToken = function() {
    const user = this;
    const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    user.refreshToken = refreshToken;
    return refreshToken;
}

userSchema.methods.genrateAccessToken = function() {
    const user = this;
    const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    return accessToken;
}

const User = mongoose.model('User', userSchema);
export default User;