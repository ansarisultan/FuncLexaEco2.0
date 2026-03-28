const WORKSPACE_VERSION = '1.0.0';

export const createEmptyWorkspace = () => ({
  version: WORKSPACE_VERSION,
  settings: {
    theme: 'light',
  },
  apps: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const isValidWorkspace = (value) => {
  return Boolean(
    value &&
      typeof value === 'object' &&
      value.version &&
      typeof value.settings === 'object' &&
      typeof value.apps === 'object'
  );
};

export const migrateWorkspace = (workspace) => {
  const safeWorkspace = isValidWorkspace(workspace) ? workspace : createEmptyWorkspace();
  return {
    ...safeWorkspace,
    version: WORKSPACE_VERSION,
    updatedAt: new Date().toISOString(),
  };
};

export const getAppData = (workspace, appSlug) => workspace?.apps?.[appSlug] ?? null;

export const setAppData = (workspace, appSlug, data) => ({
  ...workspace,
  apps: {
    ...workspace.apps,
    [appSlug]: data,
  },
  updatedAt: new Date().toISOString(),
});
