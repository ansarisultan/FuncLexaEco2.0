import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { clearWorkspaceStorage, readWorkspace, writeWorkspace } from '../services/localWorkspace';
import { downloadJSON, uploadJSON } from '../utils/fileHelpers';
import { getAppData, setAppData } from '../utils/Workspace';

const LocalModeContext = createContext(null);

export const LocalModeProvider = ({ children }) => {
  const [workspace, setWorkspace] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setWorkspace(readWorkspace());
    setIsInitialized(true);
  }, []);

  const updateWorkspace = useCallback((nextWorkspace) => {
    const saved = writeWorkspace(nextWorkspace);
    setWorkspace(saved);
  }, []);

  const clearWorkspace = useCallback(() => {
    clearWorkspaceStorage();
    const empty = readWorkspace();
    setWorkspace(empty);
  }, []);

  const exportWorkspace = useCallback(() => {
    if (!workspace) return;
    downloadJSON(workspace, `funclexa-workspace-${new Date().toISOString().slice(0, 10)}.json`);
  }, [workspace]);

  const importWorkspace = useCallback(async (file) => {
    const parsed = await uploadJSON(file);
    const saved = writeWorkspace(parsed);
    setWorkspace(saved);
    return saved;
  }, []);

  const getAppWorkspace = useCallback((slug) => getAppData(workspace, slug), [workspace]);

  const updateAppWorkspace = useCallback(
    (slug, data) => {
      if (!workspace) return;
      const updated = setAppData(workspace, slug, data);
      updateWorkspace(updated);
    },
    [workspace, updateWorkspace]
  );

  const value = useMemo(
    () => ({
      workspace,
      isInitialized,
      updateWorkspace,
      clearWorkspace,
      exportWorkspace,
      importWorkspace,
      getAppWorkspace,
      updateAppWorkspace,
    }),
    [
      workspace,
      isInitialized,
      updateWorkspace,
      clearWorkspace,
      exportWorkspace,
      importWorkspace,
      getAppWorkspace,
      updateAppWorkspace,
    ]
  );

  return <LocalModeContext.Provider value={value}>{children}</LocalModeContext.Provider>;
};

export const useLocalMode = () => {
  const ctx = useContext(LocalModeContext);
  if (!ctx) throw new Error('useLocalMode must be used inside LocalModeProvider');
  return ctx;
};
