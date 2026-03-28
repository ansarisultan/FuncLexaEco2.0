import express from 'express';
import { getSession, logout, mockLogin, ssoCallback } from '../controllers/authController.js';
import {
  localLogin,
  localSignup,
  sendSignupOtp,
  verifySignupOtp,
  forgotPassword,
  resetPassword
} from '../controllers/localAuthController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/callback', ssoCallback);
router.get('/session', authMiddleware, getSession);
router.post('/mock-login', mockLogin);
router.post('/logout', logout);

// Local Auth Endpoints
router.post('/login', localLogin);
router.post('/signup', localSignup);
router.post('/send-signup-otp', sendSignupOtp);
router.post('/verify-signup-otp', verifySignupOtp);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

export default router;
