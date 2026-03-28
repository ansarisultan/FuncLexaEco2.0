import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [
      function() { return this.authProvider === 'local'; },
      'Please provide a password for local checkout'
    ],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  
  /* FuncLexa Specific Fields */
  authProvider: {
    type: String,
    enum: {
      values: ['local', 'lexachat', 'flexa'],
      message: '{VALUE} is not a valid auth provider',
    },
    default: 'local'
  },
  plan: {
    type: String,
    enum: {
      values: ['free', 'pro'],
      message: '{VALUE} is not a valid plan',
    },
    default: 'free'
  },
  /* End FuncLexa Specific Fields */

  passwordResetToken: { type: String, select: false },
  passwordResetExpires: { type: Date, select: false },
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String, select: false },
  emailVerificationExpires: { type: Date, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String, default: '', trim: true, maxlength: [2500000, 'Avatar is too large'] },
  bio: { type: String, default: '', trim: true, maxlength: [280, 'Bio too long'] },
  phone: { type: String, default: '', trim: true, maxlength: 30 },
  links: {
    portfolio: { type: String, default: '', trim: true, maxlength: 500 },
    linkedin: { type: String, default: '', trim: true, maxlength: 500 },
    github: { type: String, default: '', trim: true, maxlength: 500 }
  },
  linkBadges: {
    portfolio: { type: Boolean, default: false },
    linkedin: { type: Boolean, default: false },
    github: { type: Boolean, default: false }
  },
  preferences: {
    theme: { type: String, enum: ['cyber', 'light', 'dark'], default: 'cyber' },
    defaultMode: { type: String, enum: ['local', 'session'], default: 'local' },
    memory: {
      preferredName: { type: String, default: '', trim: true, maxlength: 80 },
      responseTone: { type: String, default: '', trim: true, maxlength: 80 },
      customPrompt: { type: String, default: '', trim: true, maxlength: 1200 },
      savedMemories: [
        { type: String, trim: true, maxlength: 240 }
      ]
    }
  },
  lastLogin: {
    type: Date,
    default: null
  },
}, {
  timestamps: true,
  bufferCommands: false
});

// Indexes for common FuncLexa / shared queries
userSchema.index({ authProvider: 1 });
userSchema.index({ plan: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  if (!this.password) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password || !candidatePassword) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create password reset token
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

// Create email verification token
userSchema.methods.createEmailVerificationToken = function() {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  this.emailVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;
  return verificationToken;
};

// Remove sensitive data when converting to JSON
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

const User = mongoose.model('User', userSchema);
export default User;