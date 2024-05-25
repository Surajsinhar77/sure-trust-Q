const userModel = require('../model/user.model');
const z = require('zod');
const bcrypt = require('bcrypt');
const serviceAuth = require('../service/auth.service');
const ErrorResponse = require('../utlity/errorResponse');
const ApiResponse = require('../utlity/responseHandling');



const userDataRegister = z.object({
    name: z.string().min(1, 'Name is required'),  // Name should be a non-empty string
    email: z.string().email('Invalid email address'),  // Valid email format
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
    )
});


async function registerUser(req, res) {
    try {
        const userData = userDataRegister.parse(req.body);
        const isUserExist = await userModel.findOne({ email: userData.email });

        if (isUserExist) {
            res.clearCookie('accessToken');
            throw new ErrorResponse('User already registered', 409);
        }

        const authToken = req?.cookies?.accessToken;

        if (!authToken) {
            const hashPassword = await bcrypt.hash(userData.password, 10);

            if (!req?.cloudinaryUrl) {
                console.log(req.cloudinaryUrl)
                res.clearCookie('accessToken');
                throw new ErrorResponse('Profile Image is required', 409);
            }

            const user = await userModel.create({
                name: userData.name,
                email: userData.email,
                password: hashPassword,
                profileImage: req.cloudinaryUrl,
            });

            const token = serviceAuth.createUserToken({ id: user._id, email: user.email });

            const updateUserToken = await userModel.findOneAndUpdate({ email: userData.email }, { $set: { token: token } }, { new: true })

            const options = {
                httpOnly: true,
                secure: true,
            }

            const userResult = {
                id: updateUserToken._id,
                name: updateUserToken.name,
                email: updateUserToken.email,
                token: updateUserToken.token,
                profileImage: updateUserToken.profileImage
            }
            res.cookie("accessToken", token, options);
            res.setHeader('Authorization', `Bearer ${token}`);
            return new ApiResponse(201, userResult, "User is sucessfull SignUp");
        }
        res.setHeader('Authorization', `Bearer ${authToken}`);
        throw new ErrorResponse('Another user is already loggedIn', 409);
    } catch (err) {
        res.clearCookie('accessToken');
        console.log("here is the errror ", err);
        throw new ErrorResponse(err.message, 404);
    }
}


const loginRequestSchema = z.object({
    email: z.string().email('Invalid email address'),  // Valid email format
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
    )
});

async function loginUser(req, res) {
    try {
        const userData = loginRequestSchema.parse(req.body);
        const userExist = await userModel.findOne({ email: userData.email });
        if (!userExist) {
            res.clearCookie('accessToken');
            throw new ErrorResponse('User is not found', 404);
        }

        const isPasswordMatch = await bcrypt.compare(userData.password, userExist.password);
        if (!isPasswordMatch) {
            res.clearCookie('accessToken');
            throw new ErrorResponse('Password is not correct', 404);
        }
        const token = serviceAuth.createUserToken({ id: userExist._id, email: userExist.email });

        const updateUserToken = await userModel.findOneAndUpdate
            ({ email: userData.email },
                { $set: { token: token } }
                , {
                    new: true
                });

        const options = {
            httpOnly: true,
            secure: true,
        }

        const userResult = {
            id: updateUserToken._id,
            name: updateUserToken.name,
            email: updateUserToken.email,
            token: updateUserToken.token,
            profileImage: updateUserToken.profileImage
        }

        res.cookie("accessToken", token, options);
        res.setHeader('Authorization', `Bearer ${token}`);
        return new ApiResponse(200, userResult, "User is sucessfull Login");
    } catch (err) {
        res.clearCookie('accessToken');
        throw new ErrorResponse(err.message, 404);
    }
}

module.exports = {
    registerUser,
    loginUser
}