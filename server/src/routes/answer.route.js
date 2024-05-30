const express = require('express');
const {addAnswer, getAnswer, allAnswer, deleteAnswer , updateAnswer} = require('../controller/answer.controller');
const router = express.Router();
const {upload} = require('../utlity/uploadImageFunction')

router.route('/addAnswer').post(addAnswer, upload);
router.route('/getAnswer').get(allAnswer);
router.route('/getAnswerById/:id').get(getAnswer);
router.route('/updateAnswer/:id').put(updateAnswer, upload);
router.route('/deleteAnswer/:id').delete(deleteAnswer);

module.exports = router;
