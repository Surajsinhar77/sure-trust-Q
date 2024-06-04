// Initilize express router
const express = require('express');
const { registerUser, loginUser, logoutUser, getUser, getUsers, deleteUser, updateUser, refreshAccessToken} = require('../controller/user.controller');
const {upload} = require('../utlity/uploadImageFunction');
const verifyToken = require('../middleware/auth.middleware');
const router = express.Router();

router.route('/signup').post(upload , registerUser);
router.route('/login').post(loginUser);
router.route('/userById/:id').get(verifyToken, getUser);
router.route('/users').get(verifyToken, getUsers);
router.route('/deleteUser/:id').delete(verifyToken, deleteUser);
router.route('/logout').get(verifyToken, logoutUser);
router.route('/updateUser/:id').put(verifyToken, updateUser);
router.route('/refreshAccessToken').get(refreshAccessToken);


module.exports = router;