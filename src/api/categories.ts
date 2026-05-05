import { apiClient } from '@/src/api/client';
import type { Category } from '@/src/types/category';

export async function fetchAll(): Promise<Category[]> {
  const { data } = await apiClient.get<Category[]>('/categories');
  return data;
}
