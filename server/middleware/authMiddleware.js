import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const cookieToken = req.cookies?.funclexa_token;
  const token = bearerToken || cookieToken;

  if (!token) {
    req.user = null;
    next();
    return;
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    req.user = null;
    next();
  }
};

export const requireAuth = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Authentication required' });
    return;
  }
  next();
};
