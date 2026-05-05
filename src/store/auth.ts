import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

type AuthState = {
  token: string | null;
  userId: string | null;
  email: string | null;
  name: string | null;
  setAuth: (token: string, userId: string, email: string, name: string) => Promise<void>;
  clearAuth: () => Promise<void>;
  loadStoredToken: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userId: null,
  email: null,
  name: null,
  setAuth: async (token, userId, email, name) => {
    await SecureStore.setItemAsync('auth_token', token);
    set({ token, userId, email, name });
  },
  clearAuth: async () => {
    await SecureStore.deleteItemAsync('auth_token');
    set({ token: null, userId: null, email: null, name: null });
  },
  loadStoredToken: async () => {
    const token = await SecureStore.getItemAsync('auth_token');
    set({ token });
  },
}));
