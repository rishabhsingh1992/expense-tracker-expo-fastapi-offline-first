export type SyncOperation = {
  id: string;
  operation: 'create' | 'update' | 'delete';
  entityType: 'expense' | 'category' | 'budget';
  entityId: string;
  payload: string;
  createdAt: string;
  attempts: number;
  lastError: string | null;
};

export type SyncStatus = 'idle' | 'syncing' | 'error' | 'offline';
