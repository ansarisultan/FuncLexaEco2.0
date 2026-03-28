import { STORAGE_KEYS } from '../utils/constants';
import { createEmptyWorkspace, isValidWorkspace, migrateWorkspace } from '../utils/Workspace';

export const readWorkspace = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WORKSPACE);
    if (!raw) return createEmptyWorkspace();
    const parsed = JSON.parse(raw);
    return migrateWorkspace(parsed);
  } catch {
    return createEmptyWorkspace();
  }
};

export const writeWorkspace = (workspace) => {
  const next = isValidWorkspace(workspace) ? migrateWorkspace(workspace) : createEmptyWorkspace();
  localStorage.setItem(STORAGE_KEYS.WORKSPACE, JSON.stringify(next));
  return next;
};

export const clearWorkspaceStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.WORKSPACE);
};
