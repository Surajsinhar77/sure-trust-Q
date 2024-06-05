const userModel = require('../model/user.model')
const courseModels = require('../model/course.model');
const { ApiResponse } = require('../utlity/responseHandling');
const ErrorHandling = require('../utlity/errorResponse');
const { z } = require('zod');

const courseDetail = z.object({
    title: z.string().min(3, "Minmum length required 3"),
    description: z.string().min(5, "Minmum length required 5"),
    tags: z.array(z.string()).optional(),
    batches: z.array(z.string()).optional(),
})

const addCourse = async (req, res) => {
    try {
        const courseDetails = req.body;
        const courseDetailVaild = courseDetail.parse(courseDetails);
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            return new ErrorHandling(403, null, 'You are not allowed to add course');
        }

        const course = new courseModels({
            title: courseDetailVaild.title,
            description: courseDetailVaild.description,
            tags: courseDetailVaild.tags,
            batches: courseDetailVaild.batches,
        });

        await course.save();
        return res.status(201).json(new ApiResponse(201, course, 'Course added successfully'));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, {}, err.message));
    }
}

const getCourse = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin' && userRole !== 'teacher') {
            return new ErrorHandling(403, null, 'You are not allowed to get course');
        }
        const courses = await courseModels.find().populate(['batches']);
        return res.status(200).json(new ApiResponse(200, courses, 'Courses fetched successfully'));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, {}, err.message));
    }
}

const getCourseById = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin' && userRole !== 'teacher') {
            return new ErrorHandling(403, null, 'You are not allowed to get course');
        }
        const courseId = z.string().parse(req.params.id);

        const course = await courseModels.findById(courseId);
        return new ApiResponse(200, course, 'Course fetched successfully').send(res);
    } catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}

const courseDetailForUpdate = z.object({
    title: z.string().min(3, "Minmum length required 3").optional(),
    description: z.string().min(5, "Minmum length required 5").optional(),
    tags: z.array(z.string()).optional(),
    batches: z.array(z.string()).optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
    path: [], // this refers to the entire object
});


const updateCourse = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            return new ErrorHandling(403, null, 'You are not allowed to update course');
        }

        const courseId = z.string().parse(req.params.id);
        const courseDetails = req.body;
        const courseDetailVaild = courseDetailForUpdate.parse(courseDetails);

        const course = await courseModels.findById(courseId);
        course.title = courseDetailVaild.title;
        course.description = courseDetailVaild.description;
        course.tags = courseDetailVaild.tags;
        await course.save();

        const updatedbatch = courseModels.findByIdAndUpdate(courseId, {
            $push: { batches: courseDetailVaild.batches }
        }, { new: true });
        return new ApiResponse(200, updatedbatch, 'Course updated successfully').send(res);
    }catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}

const deleteCourse = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            return new ErrorHandling(403, null, 'You are not allowed to delete course');
        }

        const courseId = z.string().parse(req.params.id);
        const course = await courseModels.findById(courseId);
        if (!course) {
            throw new ErrorHandling(404, 'Course not found');
        }
        course.remove();
        await courseModels.findByIdAndDelete(courseId);
        return new ApiResponse(200, null, 'Course deleted successfully').send(res);
    } catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}

module.exports = {
    addCourse,
    getCourse,
    getCourseById,
    updateCourse,
    updateCourse,
    deleteCourse
}