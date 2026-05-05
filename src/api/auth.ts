import { apiClient } from '@/src/api/client';

type AuthResponse = {
  token: string;
  userId: string;
  email: string;
  name: string;
};

type RefreshResponse = {
  token: string;
};

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', { email, password });
  return data;
}

export async function register(email: string, name: string, password: string): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/register', { email, name, password });
  return data;
}

export async function refresh(): Promise<RefreshResponse> {
  const { data } = await apiClient.post<RefreshResponse>('/auth/refresh');
  return data;
}
