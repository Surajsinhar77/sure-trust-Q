const userModels = require('../models/user.models');
const courseModels = require('../models/course.models');
const batchModels = require('../models/batch.models');
const { ApiResponse } = require('../utlity/responseHandling');
const ErrorHandling = require('../utlity/errorResponse');
const { z } = require('zod');


const batchDetail = z.object({
    batchName: z.string().nonempty(),
    userId: z.string().nonempty(),
});

const addBatch = async (req, res) => {
    try {
        const courseId = z.string().parse(req.params.id);
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            return new ErrorHandling(403, null, 'You are not allowed to add batch');
        }

        const batchDetails = req.body;
        const batchDetailVaild = batchDetail.parse(batchDetails);

        const teacher = await userModels.findById(batchDetailVaild.userId);
        if(!teacher.role === 'teacher') {
            return new ErrorHandling(404, null, 'Teacher not found');
        }

        const batch = new batchModels({
            batchName: batchDetailVaild.batchName,
            courseId: courseId,
            userId: teacher._id,
        });

        await batch.save();
        return new ApiResponse(200, batch, 'Batch added successfully').send(res);
    } catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}

const getBatch = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            return new ErrorHandling(403, 'You are not allowed to get batch');
        }
        const batches = await batchModels.find();
        return new ApiResponse(200, batches, 'Batches fetched successfully').send(res);
    } catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}

const getBatchById = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin' && userRole !== 'teacher') {
            return new ErrorHandling(403, 'You are not allowed to get batch');
        }
        const batchId = z.string().parse(req.params.id);
        const batch = await batchModels.findById(batchId);
        return new ApiResponse(200, batch, 'Batch fetched successfully').send(res);
    } catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}

const updateBatch = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            return new ErrorHandling(403, 'You are not allowed to update batch');
        }
        const batchId = z.string().parse(req.params.id);
        const batchDetails = req.body;
        const batch = await batchModels.findByIdAndUpdate(batchId, batchDetails, { new: true });
        return new ApiResponse(200, batch, 'Batch updated successfully').send(res);
    } catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}


const deleteBatch = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            return new ErrorHandling(403, 'You are not allowed to delete batch');
        }
        const batchId = z.string().parse(req.params.id);
        const batch = await batchModels.findByIdAndDelete(batchId);
        return new ApiResponse(200, batch, 'Batch deleted successfully').send(res);
    } catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}


module.exports = {
    addBatch,
    getBatch,
    getBatchById,
    updateBatch,
    deleteBatch,
}

