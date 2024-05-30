const express = require('express');
const router = express.Router();

router.route('/addCourse').post();
router.route('/getCourse').get();
router.route('/getCourseById/:id').get();
router.route('/updateCourse').put();
router.route('/deleteCourse').delete();

module.exports = router;
