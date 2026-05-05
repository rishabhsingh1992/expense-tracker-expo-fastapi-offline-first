import { apiClient } from '@/src/api/client';
import type { Budget } from '@/src/types/budget';
import type { Category } from '@/src/types/category';
import type { Expense } from '@/src/types/expense';
import type { SyncOperation } from '@/src/types/sync';

type PushResponse = {
  processed: number;
  errors: string[];
};

type PullResponse = {
  expenses: Expense[];
  categories: Category[];
  budgets: Budget[];
};

export async function push(operations: SyncOperation[]): Promise<PushResponse> {
  const { data } = await apiClient.post<PushResponse>('/sync/push', { operations });
  return data;
}

export async function pull(since: string): Promise<PullResponse> {
  const { data } = await apiClient.get<PullResponse>('/sync/pull', {
    params: { since },
  });
  return data;
}
