import { env } from './env.js';

const matchOrigin = (origin, allowed) => {
  if (allowed === origin) return true;
  if (!allowed.includes('*')) return false;
  const escaped = allowed.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
  const pattern = `^${escaped.replace(/\*/g, '.*')}$`;
  return new RegExp(pattern).test(origin);
};

export const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }

    const allowed = env.clientUrls.some((entry) => matchOrigin(origin, entry));
    if (allowed) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
};
