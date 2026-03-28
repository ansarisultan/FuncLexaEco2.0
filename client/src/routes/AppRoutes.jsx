import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import ModeGuard from './ModeGuard';
import Loader from '../components/common/Loader';

const Landing = lazy(() => import('../pages/public/FuncLexaLanding'));
const Portfolio = lazy(() => import('../pages/public/Portfolio'));
const Projects = lazy(() => import('../pages/public/Projects'));
const Pricing = lazy(() => import('../pages/public/Pricing'));
const NotFound = lazy(() => import('../pages/public/NotFound'));

const Login = lazy(() => import('../pages/auth/Login'));
const Signup = lazy(() => import('../pages/auth/Signup'));
const AuthCallback = lazy(() => import('../pages/auth/AuthCallback'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));

const Dashboard = lazy(() => import('../pages/app/Dashboard'));
const Apps = lazy(() => import('../pages/app/Apps'));
const Usage = lazy(() => import('../pages/app/Usage'));
const Profile = lazy(() => import('../pages/app/Profile'));
const Premium = lazy(() => import('../pages/app/Premium'));
const LexaChat = lazy(() => import('../pages/app/LexaChat'));
const AppLoader = lazy(() => import('../components/apps/AppLoader'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader label="Loading page" />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<ModeGuard allowedModes={['local', 'account']} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/apps/lexachat" element={<LexaChat />} />
            <Route path="/apps/:appId" element={<AppLoader />} />
            <Route path="/usage" element={<Usage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/premium" element={<Premium />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
