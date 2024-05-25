const app = require('../application/app');
const { registerUser } = require('../controller/user.controller.js');
const router = app.Router();

router.post('/login', );
router.post('/signup', registerUser);


export default router;