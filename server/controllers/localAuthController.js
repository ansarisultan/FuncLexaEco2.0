import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import SignupOtp from '../models/SignupOtp.js';
import { AppError } from '../utils/AppError.js';
import { env, isProd } from '../config/env.js';
import {
  buildResetUrl,
  sendPasswordResetEmail,
  sendSignupOtpEmail,
  sendWelcomeEmail
} from '../utils/email.js';

// Setup FuncLexa Cookie dropping based on consistent JWT signing mapping
const dropFuncLexaCookie = (user, res, statusCode = 200, additionalData = {}) => {
  const funcToken = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET || env.jwtSecret,
    { expiresIn: "7d" }
  );

  res.cookie("funclexa_token", funcToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });

  res.status(statusCode).json({
    success: true,
    data: { user, ...additionalData }
  });
};

export const localLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next(new AppError('Please provide email and password', 400));

    const user = await User.findOne({ email }).select('+password');
    if (!user) return next(new AppError('Invalid email or password', 401));

    // Handle lexachat SSO users trying to login locally without a password set
    if (!user.password && user.authProvider === 'lexachat') {
      return next(new AppError('This email is connected via LexaChat SSO. Please use the LexaChat login button, or reset your password to add a local one.', 400));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return next(new AppError('Invalid email or password', 401));

    if (user.emailVerified === false) return next(new AppError('Please verify your email before logging in.', 403));

    void User.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } }).catch(e => console.error(e));
    
    // For local login, we enforce setting the properties so FuncLexa context plays nice
    if (user.plan !== 'pro' && !user.plan) await User.updateOne({ _id: user._id }, { $set: { plan: 'free' } });

    dropFuncLexaCookie(user, res, 200);
  } catch (error) {
    next(error);
  }
};

export const localSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new AppError('User already exists with this email', 400));

    const otpRecord = await SignupOtp.findOne({ email });
    if (!otpRecord || !otpRecord.verifiedAt || otpRecord.otpExpiresAt < Date.now()) {
      return next(new AppError('Please verify your email with OTP before creating an account.', 400));
    }

    const user = await User.create({
      name,
      email,
      password,
      authProvider: 'local',
      plan: 'free',
      emailVerified: true
    });
    
    await SignupOtp.deleteOne({ email });
    void sendWelcomeEmail({ to: email, name }).catch(e => console.error(e));

    dropFuncLexaCookie(user, res, 201, { message: 'Signup successful.' });

  } catch (error) {
    next(error);
  }
};

export const sendSignupOtp = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new AppError('User already exists with this email', 400));

    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await SignupOtp.findOneAndUpdate(
      { email },
      { otpHash, otpExpiresAt, verifiedAt: null, attempts: 0 },
      { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true }
    );

    const emailResult = await sendSignupOtpEmail({ to: email, name, otp });

    const response = { success: true, message: 'OTP sent to your email.' };
    if (!emailResult.delivered && process.env.NODE_ENV !== 'production') {
      response.data = { otp, note: 'SMTP fallback active for local testing.' };
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error("sendSignupOtp crash:", error);
    return next(new AppError('Unable to send OTP right now.', 503));
  }
};

export const verifySignupOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const otpRecord = await SignupOtp.findOne({ email }).select('+otpHash +otpExpiresAt');
    if (!otpRecord) return next(new AppError('OTP not found.', 400));
    if (otpRecord.otpExpiresAt < Date.now()) return next(new AppError('OTP expired.', 400));
    if (otpRecord.attempts >= 5) return next(new AppError('Too many failed attempts.', 429));

    const incomingHash = crypto.createHash('sha256').update(otp).digest('hex');
    if (incomingHash !== otpRecord.otpHash) {
      otpRecord.attempts += 1;
      await otpRecord.save({ validateBeforeSave: false });
      return next(new AppError('Invalid OTP', 400));
    }

    otpRecord.verifiedAt = new Date();
    otpRecord.otpHash = undefined;
    otpRecord.attempts = 0;
    otpRecord.otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await otpRecord.save({ validateBeforeSave: false });

    return res.status(200).json({ success: true, message: 'Email verified. You can now create your account.' });
  } catch (error) {
    return next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const genericMessage = "If an account exists, a password reset link has been sent.";
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ success: true, message: genericMessage });

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = buildResetUrl(resetToken);
    
    // Custom redirect URL base for FuncLexa!
    // LexaChat's buildResetUrl will use process.env.CLIENT_URL or fallback. Make sure frontend handles /reset-password
    const emailResult = await sendPasswordResetEmail({ to: user.email, name: user.name, resetUrl });

    const response = { success: true, message: genericMessage };
    if (!emailResult.delivered && process.env.NODE_ENV !== 'production') {
      response.data = { resetUrl, note: 'SMTP fallback active for local testing.' };
    }
    return res.status(200).json(response);
  } catch (error) {
    const reason = error?.message || 'unknown_email_failure';
    console.error('forgotPassword email failure:', reason);
    if (process.env.NODE_ENV !== 'production') {
      return next(new AppError(`Unable to send reset email. ${reason}`, 503));
    }
    return next(new AppError('Unable to send reset email.', 503));
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password) return next(new AppError('Token and password are required', 400));

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    }).select('+passwordResetToken +passwordResetExpires +password');

    if (!user) return next(new AppError('Token invalid or expired', 400));

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    
    // Automatically flag as local auth if they reset password to claim their account natively
    user.authProvider = 'local';
    
    await user.save();
    dropFuncLexaCookie(user, res, 200, { message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
};
