import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const getSocketBaseUrl = () => {
  const explicit = import.meta.env.VITE_SOCKET_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, '');

  const apiBase =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    '/api';

  // In same-origin mode, keep relative socket URL.
  if (apiBase.startsWith('/')) return '/';

  // If API is absolute (e.g., https://host/api), use its origin/path without trailing /api.
  try {
    const parsed = new URL(apiBase);
    parsed.pathname = parsed.pathname.replace(/\/api\/?$/, '') || '/';
    return parsed.toString().replace(/\/+$/, '');
  } catch {
    return '/';
  }
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketBaseUrl = getSocketBaseUrl();

    // Use polling first in dev; it can upgrade to websocket when proxy/network allows.
    const newSocket = io(socketBaseUrl, {
      withCredentials: true,
      path: '/socket.io',
      transports: ['polling', 'websocket'],
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
