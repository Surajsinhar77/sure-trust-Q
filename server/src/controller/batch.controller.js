const userModels = require('../model/user.model');
const endrollModel = require('../model/endrollment.model');
const courseModel = require('../model/course.model');
const batchModel = require('../model/batch.model');
const { ApiResponse } = require('../utlity/responseHandling');
const ErrorHandling = require('../utlity/errorResponse');
const { z, array } = require('zod');


const batchDetail = z.object({
    batchName: z.string().min(3).max(20),
    TeacherId: z.string().min(24).optional(),
    courseId: z.string().nonempty(),
    userId: array(z.string().nonempty()).optional(),
    startDate: z.string().nonempty(),
});

const addBatch = async (req, res) => {
    try {

        async function getCourseId() {
            let id = req?.params?.id;
            if (req?.params?.id) {
                id = z.string().parse(req?.params?.id);
            }
            return id;
        }
        const users = await getCourseId();
        const batchDetailVaild = batchDetail.parse(req.body);

        const batchExist = await batchModel.findOne({ batchName: batchDetailVaild.batchName });

        if (batchExist) {
            console.log('Batch already exists');
            throw new ErrorHandling(409, 'Batch already exists');
        }

        const userRole = req.user.role;
        if (userRole !== 'admin') {
            throw new ErrorHandling(403, 'You are not allowed to add batch');
        }

        const batchDetails = {
            batchName: batchDetailVaild.batchName,
            courseId: batchDetailVaild.courseId || courseId,
            TeacherId: batchDetailVaild?.TeacherId,
            startDate: batchDetailVaild.startDate,
        };
        
        // Only add userId if it is present
        if (req?.params?.id || users) {
            const user = await endrollModel.findByIdAndUpdate(users, {
                $set: { allowed: true }
            });
            if (!user) throw new ErrorHandling(404, 'User not found');
            batchDetails.userId = req?.params?.id || users;
        }
        
        const batch = await batchModel.create(batchDetails);

        const updateCourse = await courseModel.findByIdAndUpdate(batchDetailVaild.courseId, {
            $push: { batches: batch._id }
        });
        
        if(!updateCourse) throw new ErrorHandling(404, 'Course not found');
        
        const batchInfo = await batchModel.findById(batch._id).populate([
            { path: 'courseId' },
            { path: 'TeacherId' }
        ]);
        return res.status(201).json(new ApiResponse(200, batchInfo, 'Batch added successfully'));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, {}, err.message));
    }
}

const getBatch = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            throw new ErrorHandling(403, 'You are not allowed to get batch');
        }
        const batches = await batchModel.find().populate([
            { path: 'courseId' },
            { path: 'userId' },
        ]);
        return res.status(200).json(new ApiResponse(200, batches, 'Batches fetched successfully'));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, {}, err.message));
    }
}

const getBatchById = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin' && userRole !== 'teacher') {
            throw new ErrorHandling(403, 'You are not allowed to get batch');
        }
        if(!req?.params?.id){
            throw new ErrorHandling(404, "id is invalid");
        }
        const batchId = z.string().parse(req.params.id);
        const batch = await batchModel.findById(batchId);
        return res.status(200).json(new ApiResponse(200, batch, 'Batch fetched successfully'));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, {}, err.message));
    }
}

const batchDetailForUpdate = z.object({
    batchName: z.string().nonempty().optional(),
    TeacherId: z.string().min(16).optional(),
}).refine((data) => { return data.batchName || data.TeacherId }, {
    message: 'Atleast one field is required to update',
    path: ['batchName', 'TeacherId'],
});

const updateBatch = async (req, res) => {
    try {
        const userRole = req?.user?.role;
        if (userRole !== 'admin') {
            return new ErrorHandling(403, 'You are not allowed to update batch');
        }
        const batchId = z.string().parse(req?.params?.id);
        const batchDetails = batchDetailForUpdate.parse(req?.body);

        const batch = await batchModel.findByIdAndUpdate(batchId, batchDetails, { new: true }).populate([
            { path: 'courseId' },
            { path: 'userId' },
        ]);

        if (!batch) return new ErrorHandling(404, 'Batch not found');

        return res.status(200).json(new ApiResponse(200, batch, 'Batch updated successfully'));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, {}, err.message));
    }
}


const deleteBatch = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            return new ErrorHandling(403, 'You are not allowed to delete batch');
        }
        const batchId = z.string().parse(req.params.id);
        const batch = await batchModel.findByIdAndDelete(batchId);
        return res.status(200).json(new ApiResponse(200, batch, 'Batch deleted successfully'));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, {}, err.message));
    }
}


module.exports = {
    addBatch,
    getBatch,
    getBatchById,
    updateBatch,
    deleteBatch,
}

