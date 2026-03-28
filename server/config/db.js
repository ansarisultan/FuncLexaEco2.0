import mongoose from 'mongoose';
import { env } from './env.js';
import { logInfo, logWarn } from '../utils/logger.js';

export const connectDB = async () => {
  if (env.skipDb) {
    logWarn('SKIP_DB=true, skipping MongoDB connection.');
    return;
  }

  if (!env.mongoUri) {
    logWarn('MONGODB_URI is not set. Starting without database connection.');
    return;
  }

  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    logInfo(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    logWarn(`MongoDB unavailable. Continuing without DB. Reason: ${error.message}`);
  }
};

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
