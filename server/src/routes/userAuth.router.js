import {Router} from 'express';
import {register} from '../controllers/auth/register.controller.js';
import {verifyOTP} from '../controllers/auth/verifyOTP.controller.js';
import {resendOTP} from '../controllers/auth/resendOTP.controller.js';

const router = Router();

router.route('/sign-up').post(register)
router.route('/verify-otp').post(verifyOTP)
router.route('/resend-otp').post(resendOTP)


export default router;