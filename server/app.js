import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { corsOptions } from './config/cors.js';
import { requestLogger } from './middleware/requestLogger.js';
import { modeMiddleware } from './middleware/modeMiddleware.js';
import { errorHandler } from './middleware/errorHandler.js';

import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import usageRoutes from './routes/usageRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { mountProxies } from './proxy/index.js';

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(modeMiddleware);

app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'FuncLexa API is running',
    mode: req.appMode,
  });
});

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/usage', usageRoutes);
app.use('/api/products', productRoutes);

mountProxies(app);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(errorHandler);

export default app;
