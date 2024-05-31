const userModels = require('../model/user.model');
const courseModels = require('../model/course.model');
const enrollmentModels = require('../model/endrollment.model');
const { ApiResponse } = require('../utlity/responseHandling');
const ErrorHandling = require('../utlity/errorResponse');
const { z } = require('zod');


const courseDetail = z.object({
    courseId: z.string().nonempty(),
    batchId: z.string().nonempty(),
})

const addEnrollment = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'student') {
            return new ErrorHandling(403, null, 'You are not allowed to add enrollment');
        }

        const enrollmentDetails = req.body;
        const enrollmentDetailVaild = courseDetail.parse(enrollmentDetails);
        const userId = z.string().parse(req.user._id);


        const enrollment = new enrollmentModels({
            courseId: enrollmentDetailVaild.courseId,
            userId: userId,
            batchId: enrollmentDetailVaild.batchId,
            allowed: false,
        });

        await enrollment.save();
        return new ApiResponse(200, enrollment, 'Enrollment added successfully').send(res);
    } catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}

const getEnrollment = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            return new ErrorHandling(403, 'You are not allowed to get enrollment');
        }
        const enrollments = await enrollmentModels.find();
        return new ApiResponse(200, enrollments, 'Enrollments fetched successfully').send(res);
    } catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}

const getEnrollmentById = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin' && userRole !== 'student') {
            return new ErrorHandling(403, 'You are not allowed to get enrollment');
        }
        const enrollmentId = z.string().parse(req.params.id);

        const enrollment = await enrollmentModels.findById(enrollmentId);
        return new ApiResponse(200, enrollment, 'Enrollment fetched successfully').send(res);
    } catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}

const updateEnrollment = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            return new ErrorHandling(403, 'You are not allowed to update enrollment');
        }
        const enrollmentId = z.string().parse(req.params.id);
        const enrollmentDetails = req.body;
        const enrollmentDetailVaild = courseDetail.parse(enrollmentDetails);

        const enrollment = await enrollmentModels.findById(enrollmentId);
        if (!enrollment) {
            return new ErrorHandling(404, null, 'Enrollment not found');
        }

        enrollment.courseId = enrollmentDetailVaild.courseId;
        enrollment.batchId = enrollmentDetailVaild.batchId;

        await enrollment.save();
        return new ApiResponse(200, enrollment, 'Enrollment updated successfully').send(res);
    } catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}


const deleteEnrollment = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            return new ErrorHandling(403, 'You are not allowed to delete enrollment');
        }
        const enrollmentId = z.string().parse(req.params.id);

        const enrollment = await enrollmentModels.findById(enrollmentId);
        if (!enrollment) {
            return new ErrorHandling(404, null, 'Enrollment not found');
        }

        await enrollment.delete();
        return new ApiResponse(200, null, 'Enrollment deleted successfully').send(res);
    } catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}

module.exports = {
    addEnrollment,
    getEnrollment,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment
}

