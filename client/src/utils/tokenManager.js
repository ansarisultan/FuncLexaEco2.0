import { STORAGE_KEYS } from './constants';

export const getToken = () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

export const setToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
};

export const clearToken = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
};
