const app = require('../application/app');
const { registerUser, loginUser} = require('../controller/user.controller');
const router = app.Router();

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);


export default router;