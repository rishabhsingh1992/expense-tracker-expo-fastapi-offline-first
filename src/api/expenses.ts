import { apiClient } from '@/src/api/client';
import type { Expense } from '@/src/types/expense';

export async function fetchAll(): Promise<Expense[]> {
  const { data } = await apiClient.get<Expense[]>('/expenses');
  return data;
}

export async function fetchSince(since: string): Promise<Expense[]> {
  const { data } = await apiClient.get<Expense[]>('/expenses', {
    params: { since },
  });
  return data;
}
