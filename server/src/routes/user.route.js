import { route } from './answer.route';

const app = require('../application/app');
const { registerUser, loginUser, logoutUser} = require('../controller/user.controller');
const {upload} = require('../utlity/uploadImageFunction');
const router = app.Router();

router.route('/signup').post(registerUser , upload);
router.route('/login').post(loginUser);
router.route('/userById/:id').post(getUser);
router.route('/users').get(getUsers);
router.route('/deleteUser/:id').delete(deleteUser);
router.route('/logout').get(logoutUser);
router.route('/updateUser/:id').put(updateUser);

export default router;