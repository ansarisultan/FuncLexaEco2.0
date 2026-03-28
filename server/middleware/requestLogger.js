import morgan from 'morgan';
import { isProd } from '../config/env.js';

export const requestLogger = morgan(isProd ? 'combined' : 'dev');
