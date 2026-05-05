import axios from 'axios';

import { API_URL } from '@/constants/config';
import { useAuthStore } from '@/src/store/auth';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await useAuthStore.getState().clearAuth();
    }

    throw error;
  },
);
