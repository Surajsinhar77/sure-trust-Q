const express = require('express');
const router = express.Router();
const { addCourse } = require('../controller/course.controller');

router.route('/addCourse').post(addCourse);
router.route('/getCourse').get();
router.route('/getCourseById/:id').get();
router.route('/updateCourse').put();
router.route('/deleteCourse').delete();

module.exports = router;
