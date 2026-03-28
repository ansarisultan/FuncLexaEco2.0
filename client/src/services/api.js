import axios from 'axios';

const rawBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  '/api';

const normalizeApiBaseUrl = (baseUrl) => {
  const trimmed = (baseUrl || '/api').trim();
  if (!trimmed) return '/api';

  // Relative URL mode (same-origin proxy)
  if (trimmed.startsWith('/')) {
    if (trimmed === '/') return '/api';
    return trimmed.replace(/\/+$/, '');
  }

  // Absolute URL mode (deployed API host)
  try {
    const parsed = new URL(trimmed);
    const path = parsed.pathname.replace(/\/+$/, '');
    if (!path || path === '/') {
      parsed.pathname = '/api';
    } else if (!path.endsWith('/api')) {
      parsed.pathname = `${path}/api`;
    } else {
      parsed.pathname = path;
    }
    return parsed.toString().replace(/\/+$/, '');
  } catch {
    return trimmed.replace(/\/+$/, '');
  }
};

const normalizedBaseUrl = normalizeApiBaseUrl(rawBaseUrl);

const api = axios.create({
  baseURL: normalizedBaseUrl,
  withCredentials: true,
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || error.message || 'Request failed';
    return Promise.reject(new Error(message));
  }
);

export default api;
