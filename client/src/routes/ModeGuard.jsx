import { Navigate, Outlet } from 'react-router-dom';
import { useAppMode } from '../context/AppModeContext';

const ModeGuard = ({ allowedModes }) => {
  const { mode } = useAppMode();

  if (!mode || !allowedModes.includes(mode)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ModeGuard;
