const userModels = require('../model/user.model');
const batchModel = require('../model/batch.model');
const { ApiResponse } = require('../utlity/responseHandling');
const ErrorHandling = require('../utlity/errorResponse');
const { z } = require('zod');


const batchDetail = z.object({
    batchName: z.string().nonempty(),
    TeacherId: z.string().min(16),
});

const addBatch = async (req, res) => {
    try {
        const courseId = z.string().parse(req.params.id);
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            return new ErrorHandling(403, 'You are not allowed to add batch');
        }

        const batchDetails = req.body;
        const batchDetailVaild = batchDetail.parse(batchDetails);

        const user = await userModels.findById(batchDetailVaild.TeacherId);
        if(!user.role === 'teacher') {
            return new ErrorHandling(404, 'Teacher not found');
        }

        const batch = await new batchModel({
            batchName: batchDetailVaild.batchName,
            courseId: courseId,
            userId: user._id,
        }).save();

        // await batch.save();
        const batchInfo = await batchModel.findById(batch._id).populate([
            { path: 'courseId' },
            { path: 'userId' },
        ]);
        return res.status(201).json(new ApiResponse(200, batchInfo, 'Batch added successfully'));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, {} , err.message));
    }
}

const getBatch = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            return new ErrorHandling(403, 'You are not allowed to get batch');
        }
        const batches = await batchModel.find().populate([
            { path: 'courseId' },
            { path: 'userId' },
        ]);
        return res.status(200).json(new ApiResponse(200, batches, 'Batches fetched successfully'));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, {} , err.message));
    }
}

const getBatchById = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin' && userRole !== 'teacher') {
            return new ErrorHandling(403, 'You are not allowed to get batch');
        }
        const batchId = z.string().parse(req.params.id);
        const batch = await batchModel.findById(batchId);
        return res.ststus(200).json(new ApiResponse(200, batch, 'Batch fetched successfully'));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, {} , err.message));
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
            { path: 'courseId'},
            { path: 'userId'},
        ]);

        if(!batch) return new ErrorHandling(404, 'Batch not found');

        return res.status(200).json(new ApiResponse(200, batch, 'Batch updated successfully'));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, {} , err.message));
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
        return res.status(500).json(new ApiResponse(500, {} , err.message));
    }
}


module.exports = {
    addBatch,
    getBatch,
    getBatchById,
    updateBatch,
    deleteBatch,
}

