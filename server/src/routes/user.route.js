// Initilize express router
const express = require('express');
const { registerUser, loginUser, logoutUser, getUser, getUsers, deleteUser, updateUser, refreshAccessToken} = require('../controller/user.controller');
const {upload} = require('../utlity/uploadImageFunction');
const verifyUser = require('../middleware/auth.middleware');
const router = express.Router();

router.route('/signup').post(upload , registerUser );
router.route('/login').post(loginUser);
router.route('/userById/:id').get(verifyUser ,getUser);
router.route('/users').get(verifyUser ,getUsers);
router.route('/deleteUser/:id').delete(verifyUser,deleteUser);
router.route('/logout').get(verifyUser, logoutUser);
router.route('/updateUser/:id').put(verifyUser,updateUser);
router.route('/refreshAccessToken').get(refreshAccessToken);

module.exports = router;