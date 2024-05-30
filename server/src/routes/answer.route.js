const express = require('express');

const router = express.Router();

router.route('/addAnswer').post();
router.route('/getAnswer').get();
router.route('/getAnswerById/:id').get();
router.route('/updateAnswer').put();
router.route('/deleteAnswer').delete();

module.exports = router;
