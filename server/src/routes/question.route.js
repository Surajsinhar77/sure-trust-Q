const express = require('express');
const {upload} = require('../utlity/uploadImageFunction');
const {addQuestion , getQuestion, getQuestionById , updateQuestion, deleteQuestion} =require('../controller/question.controller');
const router = express.Router();

router.route('/addQuestion').post(upload, addQuestion);
router.route('/getQuestion').get(getQuestion);
router.route('/getQuestionById/:id').get(getQuestionById);
router.route('/updateQuestion').put(updateQuestion, upload);
router.route('/deleteQuestion').delete(deleteQuestion);

module.exports = router;
