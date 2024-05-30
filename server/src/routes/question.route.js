const express = require('express');
const {upload} = require('../utlity/uploadImageFunction');
const {addQuestion , getQuestion} =require('../controller/question.controller');
const router = express.Router();

router.route('/addQuestion').post(addQuestion , upload);
router.route('/getQuestion').get(getQuestion);
router.route('/getQuestionById/:id').get();
router.route('/updateQuestion').put();
router.route('/deleteQuestion').delete();

module.exports = router;
