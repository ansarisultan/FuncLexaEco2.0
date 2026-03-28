import { env } from '../config/env.js';

export const lexachatConfig = {
  slug: 'lexachat',
  target: env.lexachatUrl,
  path: '/proxy/lexachat',
};
