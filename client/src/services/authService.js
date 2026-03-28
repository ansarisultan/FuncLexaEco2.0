import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { clearToken, setToken } from '../utils/tokenManager';

export const getSession = async () => {
  const response = await api.get(API_ENDPOINTS.AUTH_SESSION);
  return response.data;
};

// LexaChat SSO Mock
export const mockLogin = async (provider, payload = {}) => {
  const response = await api.post(API_ENDPOINTS.AUTH_LOGIN, {
    provider,
    ...payload,
  });

  if (response.data?.data?.token) {
    setToken(response.data.data.token);
  }

  return response.data;
};

// FuncLexa Local Authentication
export const funcLexaLogin = async (email, password) => {
  const response = await api.post(API_ENDPOINTS.AUTH_LOCAL_LOGIN, { email, password });
  return response.data;
};

export const funcLexaSignup = async (name, email, password) => {
  const response = await api.post(API_ENDPOINTS.AUTH_LOCAL_SIGNUP, { name, email, password });
  return response.data;
};

export const sendOtpAction = async (name, email) => {
  const response = await api.post(API_ENDPOINTS.AUTH_SEND_OTP, { name, email });
  return response.data;
};

export const verifyOtpMock = async (email, otp) => {
  const response = await api.post(API_ENDPOINTS.AUTH_VERIFY_OTP, { email, otp });
  return response.data;
};

export const forgotPasswordAction = async (email) => {
  const response = await api.post(API_ENDPOINTS.AUTH_FORGOT_PASSWORD, { email });
  return response.data;
};

export const resetPasswordAction = async (token, password) => {
  const response = await api.patch(`${API_ENDPOINTS.AUTH_RESET_PASSWORD}/${token}`, { password });
  return response.data;
};

export const logoutRequest = async () => {
  try {
    await api.post(API_ENDPOINTS.AUTH_LOGOUT);
  } finally {
    clearToken();
  }
};
