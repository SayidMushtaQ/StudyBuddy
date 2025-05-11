import {Router} from 'express';
import {register} from '../controllers/auth/register.controller.js';
import {verifyOTP} from '../controllers/auth/verifyOTP.controller.js';
import {resendOTP} from '../controllers/auth/resendOTP.controller.js';
import {login} from '../controllers/auth/login.controller.js';

const router = Router();

router.route('/sign-up').post(register)
router.route('/verify-otp').post(verifyOTP)
router.route('/send-otp').post(resendOTP)
router.route('/login').post(login)



export default router;