const questionModel = require('../model/question.model');
const userModel = require('../model/user.model');
const {uploadOnCloudinary} = require('../utlity/uploadImageFunction');
const {ApiResponse} = require('../utlity/responseHandling');
const ErrorHandling = require('../utlity/errorResponse');
const { z } = require('zod');
const e = require('express');
// Create and Save a new Question

const addQuestionVaild = z.object({
    courseId: z.string(24).nonempty(), 
    title: z.string().nonempty(),   
    text: z.string().nonempty(),   
    codeSnippet: z.string().optional(),        
    tags: z.string().optional(),              
    batchId: z.string(24).nonempty(), 
});

async function addQuestion(req, res){
    try{
        const questionDetails = req.body;
        const questionDetailVaild = addQuestionVaild.parse(questionDetails);

        const user = await userModel.findById(req.user._id);

        if(!user){
            throw new ErrorHandling(404, 'User not found');
        }

        const userId = req.user._id;

        const images = [];
        if(req.file){
            console.log(req.file.path);
            // const filepath = join(__dirname, req.file.path);
            const image = await uploadOnCloudinary(req.file.path);
            images.push(image.url);
            if(!image){
                throw new ErrorHandling(500, 'Image upload failed');
            }
        }

        console.log('images', images);

        const question = new questionModel({
            userId: userId,
            courseId: questionDetailVaild.courseId,
            title: questionDetailVaild.title,
            text: questionDetailVaild.text,
            codeSnippet: questionDetailVaild.codeSnippet,
            tags: questionDetailVaild.tags,
            images: images,
            batchId: questionDetailVaild.batchId,
        });

        await question.save();
        return res.status(200).json(new ApiResponse(201, question, 'Question added successfully' ));
    }catch(err){
        return res.status(500).json(new ErrorHandling(500, err.message , [err], err.stack));
    }
}

async function getQuestion(req, res){
    try{
        // paganation for 10 item in one page
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
       
        const questions = await questionModel.find().skip(offset).limit(limit).populate(['userId', 'courseId', 'batchId']);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await questionModel.countDocuments();
        const pagination = {};
        if(endIndex < total){
            pagination.next = {
                page: page + 1,
                limit: limit
            }
        }
        if(startIndex > 0){
            pagination.prev = {
                page: page - 1,
                limit: limit
            }
        }

        if(!questions){
            throw new ErrorHandling(404, 'No question found');
        }

        const result = {
            questions,
            pagination
        }
        return res.status(200).json(new ApiResponse(200, result, 'Questions fetched successfully'));
    }catch(err){
        return res.status(500).json(new ErrorHandling(500, err.message , [err], err.stack));
    }
};


const getQuestionById = async (req, res) =>{
    try{
        const questionId = z.string(24).parse(req.params.id);
        
        const question = await questionModel.findById(questionId).populate(['userId', 'courseId', 'batchId']);
        if(!question){
            throw new ErrorHandling(404, 'Question not found');
        }
        return res.status(200).json(new ApiResponse(200, question, 'Question fetched successfully'));
    }catch(err){
        return res.status(500).json(new ErrorHandling(500, err.message , [err], err.stack));
    }
}

const addQuestionValidForUpdate = z.object({
    courseId: z.string().optional(),
    title: z.string().optional(),
    text: z.string().optional(),
    codeSnippet: z.string().optional(),
    tags: z.string().optional(),
  }).refine(data => Object.values(data).some(value => value !== undefined), {
    message: "At least one field must be provided.",
    path: [], // this refers to the entire object
  });
  

const updateQuestion = async (req, res) =>{
    try{
        const question = await questionModel.findById(req.params.id);
        if(!question){
            throw new ErrorHandling(404, 'Question not found');
        }
        const updateQuestion = req.body;
        const updateQuestionVaild = addQuestionValidForUpdate.parse(updateQuestion);

        const updatedQuestion = await questionModel.findByIdAndUpdate(req.params.id,{
            updateQuestionVaild
        } , {new: true});
        return new ApiResponse(200, updatedQuestion, 'Question updated successfully').send(res);
    }catch(err){
        return new ErrorHandling(500, err.message);
    }
}

const deleteQuestion = async (req, res) =>{
    try{
        const question = await questionModel.findById(req.params.id);
        if(!question){
            throw new ErrorHandling(404, 'Question not found');
        }
        question.remove();
        await questionModel.findByIdAndDelete(req.params.id);
        return new ApiResponse(200, null, 'Question deleted successfully').send(res);
    }catch(err){
        return new ErrorHandling(500, err.message);
    }
}

module.exports ={
    addQuestion,
    getQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion
}