const express = require('express');
const {addAnswer, getAnswer, allAnswer, deleteAnswer , updateAnswer} = require('../controller/answer.controller');
const router = express.Router();
const {upload} = require('../utlity/uploadImageFunction')

router.route('/addAnswer/:id').post(upload, addAnswer);
router.route('/getAnswer').get(allAnswer);
router.route('/getAnswerById/:id').get(getAnswer);
router.route('/updateAnswer/:id').put(upload, updateAnswer);
router.route('/deleteAnswer/:id').delete(deleteAnswer);

module.exports = router;
