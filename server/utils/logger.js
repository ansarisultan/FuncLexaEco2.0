const now = () => new Date().toISOString();

export const logInfo = (message) => {
  console.log(`[${now()}] INFO: ${message}`);
};

export const logWarn = (message) => {
  console.warn(`[${now()}] WARN: ${message}`);
};

export const logError = (message, error) => {
  console.error(`[${now()}] ERROR: ${message}`);
  if (error) {
    console.error(error);
  }
};
