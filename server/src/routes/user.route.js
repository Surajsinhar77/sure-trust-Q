const app = require('../application/app');
const { registerUser, loginUser} = require('../controller/user.controller');
const {upload} = require('../utlity/uploadImageFunction');
const router = app.Router();

router.route('/signup').post(registerUser , upload);
router.route('/login').post(loginUser);


export default router;