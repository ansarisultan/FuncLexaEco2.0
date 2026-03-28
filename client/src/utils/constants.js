export const APP_MODES = {
  LOCAL: 'local',
  ACCOUNT: 'account',
};

export const STORAGE_KEYS = {
  APP_MODE: 'funclexa-mode',
  ACCESS_TOKEN: 'funclexa-access-token',
  WORKSPACE: 'funclexa-workspace',
};

export const API_ENDPOINTS = {
  AUTH_SESSION: '/auth/session',
  AUTH_LOGIN: '/auth/mock-login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_LOCAL_LOGIN: '/auth/login',
  AUTH_LOCAL_SIGNUP: '/auth/signup',
  AUTH_SEND_OTP: '/auth/send-signup-otp',
  AUTH_VERIFY_OTP: '/auth/verify-signup-otp',
  AUTH_FORGOT_PASSWORD: '/auth/forgot-password',
  AUTH_RESET_PASSWORD: '/auth/reset-password',
  USAGE_SUMMARY: '/usage/summary',
  USAGE_RECENT: '/usage/recent',
  USAGE_LOG: '/usage/log',
  USERS_ME: '/users/me',
  PRODUCTS: '/products',
};
