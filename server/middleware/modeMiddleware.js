import { APP_MODES } from '../utils/constants.js';

export const modeMiddleware = (req, res, next) => {
  const requestedMode = req.header('x-app-mode') || req.query.mode || req.cookies?.funclexa_mode;

  if (requestedMode === APP_MODES.ACCOUNT || requestedMode === APP_MODES.LOCAL) {
    req.appMode = requestedMode;
  } else {
    req.appMode = APP_MODES.LOCAL;
  }

  next();
};
