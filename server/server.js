import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { logInfo, logError } from './utils/logger.js';
import { verifyToken } from './utils/jwt.js';

const server = http.createServer(app);

// Initialize Socket.IO with CORS settings matching Express
export const io = new Server(server, {
  cors: {
    origin: '*', // Set to your actual origins in production
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const getCookieValue = (cookieHeader = '', key) => {
  const cookies = cookieHeader.split(';').map((c) => c.trim());
  const item = cookies.find((c) => c.startsWith(`${key}=`));
  return item ? decodeURIComponent(item.slice(key.length + 1)) : null;
};

io.use((socket, next) => {
  try {
    const token = getCookieValue(socket.handshake.headers.cookie || '', 'funclexa_token');
    if (!token) {
      socket.data.userId = null;
      return next();
    }
    const payload = verifyToken(token);
    socket.data.userId = payload?.id || null;
    return next();
  } catch {
    socket.data.userId = null;
    return next();
  }
});

io.on('connection', (socket) => {
  const room = socket.data.userId ? `usage:user:${socket.data.userId}` : 'usage:guest';
  socket.join(room);
  console.log(`Socket connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const startServer = async () => {
  await connectDB();

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      logError(`Port ${env.port} is already in use. Stop the other process or change PORT in .env.`);
      return;
    }

    logError('Failed to start server', error);
    process.exit(1);
  });

  server.listen(env.port, () => {
    logInfo(`Server listening on http://localhost:${env.port}`);
  });
};

startServer().catch((error) => {
  logError('Failed to start server', error);
  process.exit(1);
});
