const express = require('express');
const router = express.Router();
const { addCourse, getCourse, getCourseById, updateCourse, deleteCourse } = require('../controller/course.controller');

router.route('/addCourse').post(addCourse);
router.route('/getCourse').get(getCourse);
router.route('/getCourseById/:id').get(getCourseById);
router.route('/updateCourse/:id').put(updateCourse);
router.route('/deleteCourse/:id').delete(deleteCourse);

module.exports = router;
