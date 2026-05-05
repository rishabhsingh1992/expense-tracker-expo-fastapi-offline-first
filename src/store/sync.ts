import { create } from 'zustand';

import type { SyncStatus } from '@/src/types/sync';

type SyncState = {
  status: SyncStatus;
  lastSyncedAt: string | null;
  pendingCount: number;
  errorMessage: string | null;
  setStatus: (status: SyncStatus) => void;
  setLastSyncedAt: (ts: string) => void;
  setPendingCount: (count: number) => void;
  setError: (message: string | null) => void;
};

export const useSyncStore = create<SyncState>((set) => ({
  status: 'idle',
  lastSyncedAt: null,
  pendingCount: 0,
  errorMessage: null,
  setStatus: (status) => set({ status }),
  setLastSyncedAt: (lastSyncedAt) => set({ lastSyncedAt }),
  setPendingCount: (pendingCount) => set({ pendingCount }),
  setError: (errorMessage) => set({ errorMessage }),
}));
