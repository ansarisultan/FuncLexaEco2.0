import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppMode } from '../context/AppModeContext';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';
import { SocketProvider } from '../context/SocketContext';

const ProtectedRoute = () => {
  const { mode, initializing } = useAppMode();
  const { initialized, isAuthenticated } = useAuth();
  const location = useLocation();

  if (initializing || !initialized) {
    return <Loader label="Loading workspace" />;
  }

  if (!mode) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (mode === 'account' && !isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
};

export default ProtectedRoute;
