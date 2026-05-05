import { apiClient } from '@/src/api/client';
import type { Budget } from '@/src/types/budget';

export async function fetchAll(): Promise<Budget[]> {
  const { data } = await apiClient.get<Budget[]>('/budgets');
  return data;
}
