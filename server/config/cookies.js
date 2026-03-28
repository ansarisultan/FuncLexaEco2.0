import { isProd } from './env.js';

export const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: isProd,
  maxAge: 1000 * 60 * 60 * 24 * 7,
};
