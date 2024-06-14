const questionModel = require('../model/question.model');
const userModel = require('../model/user.model');
const { z } = require('zod');
const { uploadOnCloudinary } = require('../utlity/uploadImageFunction');

const { ApiResponse } = require('../utlity/responseHandling');
const ErrorHandling = require('../utlity/errorResponse');
const answerModel = require('../model/answer.model');
const { model } = require('mongoose');



// Create and Save a new Question

const addQuestionVaild = z.object({
    text: z.string(),
    codeSnippet: z.string(),
});


const addAnswer = async (req, res) => {
    try {
        const questionDetails = req.body;
        console.log('questionDetails', questionDetails);
        const questionDetailVaild = addQuestionVaild.parse(questionDetails);
        const questionId = z.string(24).parse(req.params.id);
        const user = await userModel.findById(req?.user?._id);

        if (!user) {
            throw new ErrorHandling(404, 'User not found');
        }

        const images = [];

        if (req.file) {
            const image = await uploadOnCloudinary(req.file.path);
            images.push(image);
        }

        const question = new answerModel({
            userId: req.user._id,
            questionId: questionId,
            text: questionDetailVaild.text,
            codeSnippet: questionDetailVaild.codeSnippet,
            images: images,
        })

        await question.save();
        return res.status(200).json(new ApiResponse(201, question, 'Question added successfully'));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, {}, err.message));
    }
}


const getAnswer = async (req, res) => {
    try {
        const questionId = req.params.id = z.string().nonempty();
        if (!questionId) {
            return new ErrorHandling(400, null, 'Question id is required');
        }

        const question = await answerModel.findOne(questionId);
        if (!question) {
            return new ErrorHandling(404, null, 'Answer not found');
        }
        return new ApiResponse(200, question, 'Answer fetched successfully').send(res);
    } catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}

const allAnswer = async (req, res) => {
    try {
        const questionId = req.params.id = z.string().nonempty();
        if (!questionId) {
            return new ErrorHandling(400, 'Question id is required');
        }

        const question = await question.find({ questionId: questionId });
        return new ApiResponse(200, question, 'Answer fetched successfully').send(res);
    } catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}

const addQuestionVaildForUpdate = z.object({
    text: z.string().nonempty().optional(),
    codeSnippet: z.string().optional(),
}).refine(data => Object.values(data).some(value => value !== undefined), {
    message: "At least one field must be provided.",
    path: [], // this refers to the entire object
});

const updateAnswer = async (req, res) => {
    try {
        const answerId = req.params.id = z.string().nonempty();
        const answerDetails = req.body;
        const answerDetailsVaild = addQuestionVaildForUpdate.parse(answerDetails);
        if (!answerId) {
            return new ErrorHandling(400, null, 'answer id is required');
        }

        const question = await answerModel.findByIdAndUpdate(answerId, answerDetailsVaild, { new: true });
        if (!question) {
            return new ErrorHandling(404, 'Answer not found');
        }
        return new ApiResponse(200, question, 'Answer updated successfully').send(res);
    } catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}

const deleteAnswer = async (req, res) => {
    try {
        const answerId = req.params.id = z.string().nonempty();

        if (!answerId) {
            return new ErrorHandling(400, null, 'Answer id is required');
        }

        const answer = await answerModel.findByIdAndDelete(answerId);
        if (!answer) {
            return new ErrorHandling(404, null, 'Answer not found');
        }
        return new ApiResponse(200, null, 'Answer deleted successfully').send(res);
    } catch (err) {
        return new ErrorHandling(500, null, err.message);
    }
}

module.exports = {
    addAnswer,
    getAnswer,
    allAnswer,
    deleteAnswer,
    updateAnswer
}

