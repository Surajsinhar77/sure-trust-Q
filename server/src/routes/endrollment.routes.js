const express = require('express');
const router = express.Router();

const { addEnrollment, getEnrollment, getEnrollmentById, updateEnrollment, deleteEnrollment } = require('../controller/enrollment.controller');

router.route('/addEnrollment').post(addEnrollment);
router.route('/getEnrollment').get(getEnrollment);
router.route('/getEnrollmentById/:id').get(getEnrollmentById);
router.route('/updateEnrollment/:id').put(updateEnrollment);
router.route('/deleteEnrollment/:id').delete(deleteEnrollment);

module.exports = router;


