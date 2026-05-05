import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ThemePreference = 'light' | 'dark' | 'system';

type PreferencesState = {
  currency: string;
  theme: ThemePreference;
  defaultCategoryId: string;
  setCurrency: (currency: string) => void;
  setTheme: (theme: ThemePreference) => void;
  setDefaultCategoryId: (id: string) => void;
};

const storage = new MMKV();

const mmkvStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.delete(name);
  },
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      currency: 'USD',
      theme: 'system',
      defaultCategoryId: 'cat-other',
      setCurrency: (currency) => set({ currency }),
      setTheme: (theme) => set({ theme }),
      setDefaultCategoryId: (defaultCategoryId) => set({ defaultCategoryId }),
    }),
    {
      name: 'preferences',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
