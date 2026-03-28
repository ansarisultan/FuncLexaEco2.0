import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getUsageSummary = async () => {
  const response = await api.get(API_ENDPOINTS.USAGE_SUMMARY);
  return response.data;
};

export const getRecentUsage = async () => {
  const response = await api.get(API_ENDPOINTS.USAGE_RECENT);
  return response.data;
};

export const logUsageEvent = async ({ product = 'core', action = 'unknown' }) => {
  const response = await api.post(API_ENDPOINTS.USAGE_LOG, { product, action });
  return response.data;
};
