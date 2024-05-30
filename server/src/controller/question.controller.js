const questionModel = require('../model/question.model');
const userModel = require('../model/user.model');
const {uploadOnCloudinary} = require('../utlity/uploadImageFunction');
const {ApiResponse} = require('../utlity/responseHandling');
const ErrorHandling = require('../utlity/errorResponse');
// Create and Save a new Question

const addQuestionVaild = z.object({
    courseId: z.string().nonempty(), 
    title: z.string().nonempty(),   //
    text: z.string().nonempty(),    //
    codeSnippet: z.string(),        //
    tags: z.string(),              //
    batchId: z.string().nonempty(), 
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
        return new ApiResponse(201, question, 'Question added successfully' );
    }catch(err){
        return new ErrorHandling(500, null, err.message);
    }
}

async function getQuestion(req, res){
    try{
        // paganation for 10 item in one page
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
       
        const questions = await questionModel.find().skip(offset).limit(limit);
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
        return new ApiResponse(200, result, 'Questions fetched successfully');
    }catch(err){
        return new ErrorHandling(500, null, err.message);
    }
};

module.exports ={
    addQuestion,
    getQuestion
}