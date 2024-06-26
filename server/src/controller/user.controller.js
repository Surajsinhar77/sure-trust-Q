const userModel = require('../model/user.model');
const endrollmentModel = require('../model/endrollment.model');
const batchModel = require('../model/batch.model');
const z = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const FileSystem = require('fs');
// const { genrateAccessToken, genrateRefreshToken } = require('../service/genrateToken.service');
const ErrorResponse = require('../utlity/errorResponse');
const { ApiResponse } = require('../utlity/responseHandling');
const { upload, uploadOnCloudinary, deleteFromCloudinary } = require('../utlity/uploadImageFunction');
const { default: mongoose } = require('mongoose');



const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await userModel.findById(userId)
        const accessToken = await user.genrateAccessTkn();
        const refreshToken = await user.genrateRefToken();
        // console.log('refreshToken', refreshToken)
        // console.log('accessToken', accessToken)

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        if(!refreshToken || !accessToken){
            throw new ErrorResponse(500, "Something went wrong while generating referesh and access token")
        }
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ErrorResponse(500, "Something went wrong while generating referesh and access token")
    }
}

const userDataRegister = z.object({
    name: z.string().min(1, 'Name is required'),  // Name should be a non-empty string
    email: z.string().email('Invalid email address').toLowerCase(),  // Valid email format
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
    ),
    courseId : z.string(24),
    batchId : z.string(24),
    //optional role 
    role: z.string(['student', 'teacher', 'admin'])
});


async function registerUser(req, res) {
    try {
        const userData = userDataRegister.parse(req.body);
        const isUserExist = await userModel.findOne({ email: userData.email });

        const profileImageLocalAddress = req?.file?.path;
        // console.log('profileImageLocalAddress', req.file);

        console.log("the data getting from the login ", req.body, "file also ", req?.file)
        if (!profileImageLocalAddress) {
            throw new ErrorResponse(404, 'Profile image is required');
        }

        if (isUserExist) {
            // res.clearCookie('accessToken');
            FileSystem.unlinkSync(profileImageLocalAddress);
            throw new ErrorResponse(409, 'User already registered');
        }

        const { public_id, image_url } = await uploadOnCloudinary(profileImageLocalAddress);
        if (!image_url) {
            throw new ErrorResponse(404, 'Profile image is not uploaded');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // if (userData?.role) {
            const user = new userModel({
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                role: userData.role,
                profilePicture: image_url,
                courseId: userData.courseId,
                batchId: userData.batchId
            });

            const result = await user.save();

            if (!result) {
                await deleteFromCloudinary(public_id);
                throw new ErrorResponse(404, 'User is not created');
            }

            await batchModel.findByIdAndUpdate(
                userData?.batchId,
                {
                    $push:{userId : result._id}
                },
                {new : true}
            )

            
            const userCreated = await userModel.findById(result._id).select('-password -refreshToken').populate('courseId').populate('batchId');

            if (!userCreated) {
                await deleteFromCloudinary(public_id);
                throw new ErrorResponse(404, 'User is not created');
            }

            return res.status(200).json(
                new ApiResponse(201, userCreated, 'User is created successfully')
            );
    } catch (err) {
        return res.status(err.statusCode || 500).json(new ApiResponse(err.statusCode || 500, {}, err.message));
    }
}


const loginRequestSchema = z.object({
    email: z.string().email('Invalid email address').toLowerCase(),  // Valid email format
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
    ),
    role: z.string().optional()
});

async function loginUser(req, res) {
    try {
        const userData = loginRequestSchema.parse(req.body);
        const userExist = await userModel.findOne({ email: userData.email } || { name: userData.email });

        if (!userExist) {
            res.clearCookie('accessToken');
            throw new ErrorResponse(404, 'User is not found');
        }


        const isPasswordVaild = await userExist.isPasswordMatch(userData.password);
        console.log('isPasswordVaild ', isPasswordVaild);
        if (!isPasswordVaild) {
            throw new ErrorResponse(404, 'Password is not correct');
        }

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(userExist._id);

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: "/"
        }

        const userResult = await userModel.findById({ _id: userExist._id }).select('-password -refreshToken');

        res.cookie("accessToken", accessToken, options);
        res.cookie("refreshToken", refreshToken, options);
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        return res.status(200).json(new ApiResponse(200, { user: userResult, accessToken, refreshToken }, 'User is logged in'));
    } catch (err) {
        res.clearCookie('accessToken');
        return res.status(err.statusCode || 500).json(new ApiResponse(err.statusCode || 500, {}, err.message));
    }
}

const logoutUser = async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(
            req.user?._id,
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
    try {
        const incomingRefreshToken = req.cookies.refreshToken;

        if (!incomingRefreshToken) {
            throw new ErrorResponse(401, "unauthorized request")
        }
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        // if (!decodedToken) {
        //     throw new ErrorResponse(401, "Invalid refresh token")
        // }

        const user = await userModel.findById(decodedToken?._id);

        if (!user) {
            throw new ErrorResponse(401, "User refresh token is Invalid");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ErrorResponse(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .setHeader('Authorization', `Bearer ${accessToken}`)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        return res.status(401).json(new ApiResponse(401, {}, error.message))
    }
}

const getUser = async (req, res) => {
    try {
        const userId = z.string().min(24).parse(req?.params?.id || req?.query?.id); 
        const user = await userModel.findById(userId).select('-password -refreshToken').populate(['courseId','batchId']);
        if (!user) {
            throw new ErrorResponse(404, 'User is not found');
        }

        return res.status(200).json(new ApiResponse(200, user, 'User is found'));
    } catch (err) {
        return res.status(err.statusCode || 500).json(new ApiResponse(err.statusCode || 500, {}, err.message));
    }
}


const getUsers = async (req, res) => {
    try {
        console.log('req.query', req.query);
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;

        const users = await userModel.find().limit(limit).skip(skip).select('-password -refreshToken').populate(['batchId', 'courseId']);
        if (!users) {
            throw new ErrorResponse(404, 'Users are not found');
        }
        const totalUsers = await userModel.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);
        const pagination = { totalUsers, totalPages, page, limit };
        return res.status(200).json(new ApiResponse(200, { users, pagination }, 'All users are found'));
    } catch (err) {
        return res.status(err.statusCode || 500).json(new ApiResponse(err.statusCode || 500, {}, err.message));
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            throw new ErrorResponse(404, 'User is not found');
        }

        const delUser = await user.deleteOne();

        if(!delUser){
            throw new ErrorResponse(404, 'User is not deleted');
        }
        return res.status(200).json(new ApiResponse(200, {}, 'User is deleted'));
    } catch (err) {
        return res.status(err.statusCode || 500).json(new ApiResponse(err.statusCode || 500, {}, err.message));
    }
}

const userDataRegisterForUpdate = z.object({
    name: z.string().min(1, 'Name is required'),  // Name should be a non-empty string
    email: z.string().email('Invalid email address'),  // Valid email format
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
    ),
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
