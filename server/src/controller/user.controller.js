const userModel = require('../model/user.model');
const z = require('zod');
const bcrypt = require('bcrypt');
// const { genrateAccessToken, genrateRefreshToken } = require('../service/genrateToken.service');
const ErrorResponse = require('../utlity/errorResponse');
const ApiResponse = require('../utlity/responseHandling');
const { upload, uploadOnCloudinary } = require('../utlity/uploadImageFunction');



const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await userModel.findById(userId)
        const accessToken = user.genrateAccessTkn();
        const refreshToken = user.genrateRefToken();

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ErrorResponse(500, "Something went wrong while generating referesh and access token")
    }
}

const userDataRegister = z.object({
    name: z.string().min(1, 'Name is required'),  // Name should be a non-empty string
    email: z.string().email('Invalid email address'),  // Valid email format
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
    ),
    //optional role 
    role: z.string().optional()
});


async function registerUser(req, res) {
    try {
        console.log("register function for user ", req);
        const userData = userDataRegister.parse(req.body);
        const isUserExist = await userModel.findOne({ email: userData.email });
        const profileImageLocalAddress = req.file

        if (isUserExist) {
            res.clearCookie('accessToken');
            throw new ErrorResponse('User already registered', 409);
        }

        if (!profileImageLocalAddress) {
            return new ErrorResponse(404, 'Profile image is required');
        }

        const profileImage = await uploadOnCloudinary(profileImageLocalAddress);
        console.log(profileImage);
        if (!profileImage) {
            return new ErrorResponse(404, 'Profile image is not uploaded');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        if (userData.role) {
            const user = new userModel({
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                role: userData.role,
                profileImage: profileImage.url
            });
            const userCreated = await userModel.findById({ _id: user._id }).select('-password', '-refreshToken');
            if (!userCreated) {
                return new ErrorResponse(404, 'User is not created');
            }
            return new ApiResponse(200, userCreated, 'User is created successfully');
        } else {
            const user = new userModel({
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                profileImage: profileImage.url
            });
            const userCreated = await userModel.findById({ _id: user._id }).select('-password', '-refreshToken');
            if (!userCreated) {
                return new ErrorResponse(404, 'User is not created');
            }
            return new ApiResponse(200, userCreated, 'User is created successfully');
        }
    } catch (err) {
        res.clearCookie('accessToken');
        throw new ErrorResponse(err.message, 404);
    }
}


const loginRequestSchema = z.object({
    email: z.string().email('Invalid email address'),  // Valid email format
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
    ),
    role: z.string().optional()
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

        const isPasswordVaild = userExist.isPasswordMatch(userData.password);

        if (!isPasswordVaild) {
            res.clearCookie('accessToken');
            throw new ErrorResponse('Password is not correct', 404);
        }


        const { accessToken, refreshToken } = generateAccessAndRefereshTokens(userExist._id);

        const options = {
            httpOnly: true,
            secure: true,
        }

        const userResult = await userModel.findById({ _id: userExist._id }).select('-password', '-refreshToken');

        res.cookie("accessToken", accessToken, options);
        res.cookie("refreshToken", refreshToken, options);
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.setHeader('Authorization', `Bearer ${refreshToken}`);
        return new ApiResponse(200, userResult, "User is sucessfull Login");
    } catch (err) {
        res.clearCookie('accessToken');
        throw new ErrorResponse(err.message, 404);
    }
}


const logoutUser = async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1 // this removes the field from document
                }
            },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "User logged Out"))
    }
    catch (err) {
        throw new ErrorResponse(err.message, 404);
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}