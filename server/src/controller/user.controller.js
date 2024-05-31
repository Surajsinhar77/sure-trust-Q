const userModel = require('../model/user.model');
const z = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const FileSystem = require('fs');
// const { genrateAccessToken, genrateRefreshToken } = require('../service/genrateToken.service');
const ErrorResponse = require('../utlity/errorResponse');
const {ApiResponse} = require('../utlity/responseHandling');
const { upload, uploadOnCloudinary, deleteFromCloudinary} = require('../utlity/uploadImageFunction');



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
        const userData = userDataRegister.parse(req.body);
        const isUserExist = await userModel.findOne({ email: userData.email });

        const profileImageLocalAddress = req?.file?.path;

        if (!profileImageLocalAddress) {
            throw new ErrorResponse(404, 'Profile image is required');
        }

        if (isUserExist) {
            // res.clearCookie('accessToken');
            FileSystem.unlinkSync(profileImageLocalAddress);
            throw new ErrorResponse(409, 'User already registered');
        }

        const {public_id, image_url} = await uploadOnCloudinary(profileImageLocalAddress);
        if (!image_url) {
            throw new ErrorResponse(404, 'Profile image is not uploaded');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        if (userData?.role) {
            const user = new userModel({
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                role: userData.role,
                profilePicture: image_url
            });
            
            const result = await user.save();
            
            if (!result) {
                await deleteFromCloudinary(public_id);
                throw new ErrorResponse(404, 'User is not created');
            }

            const userCreated = await userModel.findById(result._id).select('-password -refreshToken');

            if (!userCreated) {
                await deleteFromCloudinary(public_id);
                throw new ErrorResponse(404, 'User is not created');
            }
            return res.status(200).json(
                new ApiResponse(201, userCreated, 'User is created successfully')
            );
        } else {
            const user = await userModel.create({
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                profilePicture: image_url
            });

            if(!user) {
                await deleteFromCloudinary(public_id);
                throw new ErrorResponse(404, 'User is not created');
            }

            const userCreated = await userModel.findById(user._id).select('-password -refreshToken');

            if (!userCreated) {
                await userModel.findByIdAndDelete(user._id);
                await deleteFromCloudinary(public_id);
                throw new ErrorResponse(404, 'User is not created');
            }

            return res.status(200).json(
                new ApiResponse(201, userCreated, 'User is created successfully')
            );
        }
    } catch (err) {
        return res.status(err.statusCode || 500).json(new ApiResponse(err.statusCode || 500, {}, err.message));
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
            throw new ErrorResponse(404, 'User is not found');
        }

        const isPasswordMatch = await bcrypt.compare(userData.password, userExist.password);
        if (!isPasswordMatch) {
            res.clearCookie('accessToken');
            throw new ErrorResponse(404, 'Password is not correct');
        }

        const isPasswordVaild = userExist.isPasswordMatch(userData.password);

        if (!isPasswordVaild) {
            res.clearCookie('accessToken');
            throw new ErrorResponse(404, 'Password is not correct');
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
        return new ApiResponse(200, userResult, "User is sucessfull Login").send(res);
    } catch (err) {
        res.clearCookie('accessToken');
        return res.status(err.statusCode || 500).json(new ApiResponse(err.statusCode || 500, {}, err.message));
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
        throw new ErrorResponse(404, err.message);
    }
}

const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ErrorResponse(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await userModel.findById(decodedToken?._id);

        if (!user) {
            throw new ErrorResponse(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ErrorResponse(401, "Refresh token is expired or used")

        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ErrorResponse(401, error?.message || "Invalid refresh token")
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id).select('-password', '-refreshToken');
        if (!user) {
            throw new ErrorResponse(404, 'User is not found');
        }
        return new ApiResponse(200, user, 'User is found').send(res);
    } catch (err) {
        throw new ErrorResponse(404, err.message);
    }
}


const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password', '-refreshToken');
        if (!users) {
            throw new ErrorResponse(404, 'Users are not found');
        }
        return new ApiResponse(200, users, 'Users are found').send(res);
    } catch (err) {
        throw new ErrorResponse(404, err.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) {
            throw new ErrorResponse(404, 'User is not found');
        }
        return new ApiResponse(200, {}, 'User is deleted').send(res);
    } catch (err) {
        throw new ErrorResponse(404, err.message);
    }
}

const userDataRegisterForUpdate = z.object({
    name: z.string().min(1, 'Name is required'),  // Name should be a non-empty string
    email: z.string().email('Invalid email address'),  // Valid email format
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
    ),
    role: z.string().optional()
}).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field is required'
});

const updateUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            throw new ErrorResponse(404, 'User is not found');
        }
        return new ApiResponse(200, user, 'User is updated').send(res);
    } catch (err) {
        throw new ErrorResponse(404, err.message);
    }
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getUser,
    getUsers,
    deleteUser,
    updateUser
}