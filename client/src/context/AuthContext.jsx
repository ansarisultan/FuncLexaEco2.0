import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getSession, logoutRequest, mockLogin, funcLexaLogin, funcLexaSignup, verifyOtpMock, sendOtpAction } from '../services/authService';
import { useAppMode } from './AppModeContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { setMode } = useAppMode();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const result = await getSession();
        const sessionUser = result?.data?.user || null;
        setUser(sessionUser);
        if (sessionUser) {
          setMode('account');
        }
      } catch {
        setUser(null);
      } finally {
        setInitialized(true);
      }
    };

    bootstrap();
  }, [setMode]);

  const continueWithAccount = async (provider) => {
    setLoading(true);
    try {
      const result = await mockLogin(provider);
      setUser(result?.data?.user || null);
      setMode('account');
      return result;
    } finally {
      setLoading(false);
    }
  };

  const loginFuncLexa = async (email, password) => {
    setLoading(true);
    try {
      const result = await funcLexaLogin(email, password);
      setUser(result?.data?.user || null);
      setMode('account');
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signupFuncLexa = async (name, email, password) => {
    setLoading(true);
    try {
      const result = await funcLexaSignup(name, email, password);
      setUser(result?.data?.user || null);
      setMode('account');
      return result;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email, otp) => {
    setLoading(true);
    try {
      const success = await verifyOtpMock(email, otp);
      return success;
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (name, email) => {
    setLoading(true);
    try {
      const result = await sendOtpAction(name, email);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutRequest();
      setUser(null);
      setMode('local');
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      initialized,
      isAuthenticated: Boolean(user),
      continueWithAccount,
      loginFuncLexa,
      signupFuncLexa,
      sendOtp,
      verifyOtp,
      logout,
    }),
    [user, loading, initialized]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
