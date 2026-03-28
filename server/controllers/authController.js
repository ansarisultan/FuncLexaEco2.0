import { signToken } from '../utils/jwt.js';
import { TOKEN_COOKIE } from '../utils/constants.js';
import { cookieOptions } from '../config/cookies.js';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';
import { isProd } from '../config/env.js';

export const ssoCallback = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send("Token missing");
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || env.jwtSecret);
    const { email, name } = decoded;

    // check user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        authProvider: "lexachat",
        plan: "free",
      });
    } else {
      // Patch shared LexaChat users with FuncLexa fields silently
      let needsSave = false;
      if (!user.plan) { user.plan = "free"; needsSave = true; }
      if (!user.authProvider) { user.authProvider = "lexachat"; needsSave = true; }
      if (needsSave) await user.save();
    }

    // create FuncLexa session token
    const funcToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || env.jwtSecret,
      { expiresIn: "7d" }
    );

    // set cookie using the requested format
    res.cookie("funclexa_token", funcToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    });

    // redirect to dashboard
    // Alternatively, use env.clientUrls[0] or process.env.CLIENT_URL to support localhost
    const redirectUrl = env.nodeEnv === 'development' ? 'http://localhost:5173/dashboard' : 'https://funclexa.com/dashboard';
    res.redirect(redirectUrl);

  } catch (err) {
    res.status(500).send("SSO Failed: " + err.message);
  }
};

export const mockLogin = async (req, res) => {
  const provider = req.body.provider || 'lexachat';
  const user = {
    id: `user-${provider}`,
    name: provider === 'flexa' ? 'Flexa User' : 'Lexa User',
    email: provider === 'flexa' ? 'flexa@example.com' : 'lexa@example.com',
    provider,
  };

  const token = signToken(user);

  res.cookie(TOKEN_COOKIE, token, cookieOptions);
  res.json({
    success: true,
    data: {
      user,
      token,
    },
  });
};

export const getSession = async (req, res) => {
  res.json({
    success: true,
    data: {
      user: req.user,
    },
  });
};

export const logout = async (req, res) => {
  res.clearCookie(TOKEN_COOKIE);
  res.json({ success: true, message: 'Logged out' });
};
