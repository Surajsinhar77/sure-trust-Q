// Initilize express router
const express = require('express');
const { registerUser, loginUser, logoutUser, getUser, getUsers, deleteUser, updateUser} = require('../controller/user.controller');
const {upload} = require('../utlity/uploadImageFunction');
const router = express.Router();

router.route('/signup').post(registerUser, upload);
router.route('/login').post(loginUser);
router.route('/userById/:id').post(getUser);
router.route('/users').get(getUsers);
router.route('/deleteUser/:id').delete(deleteUser);
router.route('/logout').get(logoutUser);
router.route('/updateUser/:id').put(updateUser);

module.exports = router;