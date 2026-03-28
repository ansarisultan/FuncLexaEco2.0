import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { APP_MODES, STORAGE_KEYS } from '../utils/constants';
import { getToken } from '../utils/tokenManager';

const AppModeContext = createContext(null);

export const AppModeProvider = ({ children }) => {
  const [mode, setModeState] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const persistedMode = localStorage.getItem(STORAGE_KEYS.APP_MODE);
    const hasToken = Boolean(getToken());
    const hasWorkspace = Boolean(localStorage.getItem(STORAGE_KEYS.WORKSPACE));

    if (persistedMode === APP_MODES.LOCAL || persistedMode === APP_MODES.ACCOUNT) {
      setModeState(persistedMode);
    } else if (hasToken) {
      setModeState(APP_MODES.ACCOUNT);
    } else if (hasWorkspace) {
      setModeState(APP_MODES.LOCAL);
    } else {
      localStorage.setItem(STORAGE_KEYS.APP_MODE, APP_MODES.LOCAL);
      setModeState(APP_MODES.LOCAL);
    }

    setInitializing(false);
  }, []);

  const setMode = useCallback((nextMode) => {
    if (nextMode !== APP_MODES.LOCAL && nextMode !== APP_MODES.ACCOUNT) {
      localStorage.removeItem(STORAGE_KEYS.APP_MODE);
      setModeState(null);
      return;
    }

    localStorage.setItem(STORAGE_KEYS.APP_MODE, nextMode);
    setModeState(nextMode);
  }, []);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      initializing,
      isLocal: mode === APP_MODES.LOCAL,
      isAccount: mode === APP_MODES.ACCOUNT,
    }),
    [mode, setMode, initializing]
  );

  return <AppModeContext.Provider value={value}>{children}</AppModeContext.Provider>;
};

export const useAppMode = () => {
  const ctx = useContext(AppModeContext);
  if (!ctx) throw new Error('useAppMode must be used inside AppModeProvider');
  return ctx;
};
