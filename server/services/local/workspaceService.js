export const normalizeWorkspacePayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return { apps: {}, settings: {}, updatedAt: new Date().toISOString() };
  }

  return {
    apps: payload.apps || {},
    settings: payload.settings || {},
    updatedAt: new Date().toISOString(),
  };
};
