import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

const cwdEnvPath = path.resolve(process.cwd(), '.env');
const parentEnvPath = path.resolve(process.cwd(), '..', '.env');

if (fs.existsSync(cwdEnvPath)) {
  dotenv.config({ path: cwdEnvPath, quiet: true });
} else if (fs.existsSync(parentEnvPath)) {
  dotenv.config({ path: parentEnvPath, quiet: true });
} else {
  dotenv.config({ quiet: true });
}

const splitList = (value, fallback = []) => {
  if (!value) return fallback;
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'funclexa-dev-secret',
  jwtExpiry: process.env.JWT_EXPIRES_IN || '7d',
  clientUrls: splitList(process.env.CLIENT_URLS, [process.env.CLIENT_URL || 'http://localhost:5173']),
  lexachatUrl: process.env.LEXACHAT_URL || 'http://localhost:3001',
  flexaUrl: process.env.FLEXA_URL || 'http://localhost:3002',
  skipDb: process.env.SKIP_DB === 'true',
};

export const isProd = env.nodeEnv === 'production';
export const isDev = !isProd;
