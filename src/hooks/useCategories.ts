import { useMemo } from 'react';

import type { Category } from '@/src/types/category';

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'cat-food',
    name: 'Food',
    icon: 'fork.knife',
    color: '#F97316',
    isDefault: true,
    deletedAt: null,
    updatedAt: new Date(0).toISOString(),
  },
  {
    id: 'cat-transport',
    name: 'Transport',
    icon: 'car.fill',
    color: '#3B82F6',
    isDefault: true,
    deletedAt: null,
    updatedAt: new Date(0).toISOString(),
  },
  {
    id: 'cat-home',
    name: 'Home',
    icon: 'house.fill',
    color: '#10B981',
    isDefault: true,
    deletedAt: null,
    updatedAt: new Date(0).toISOString(),
  },
  {
    id: 'cat-fun',
    name: 'Fun',
    icon: 'gamecontroller.fill',
    color: '#A855F7',
    isDefault: true,
    deletedAt: null,
    updatedAt: new Date(0).toISOString(),
  },
  {
    id: 'cat-health',
    name: 'Health',
    icon: 'heart.fill',
    color: '#EC4899',
    isDefault: true,
    deletedAt: null,
    updatedAt: new Date(0).toISOString(),
  },
  {
    id: 'cat-other',
    name: 'Other',
    icon: 'square.grid.2x2.fill',
    color: '#64748B',
    isDefault: true,
    deletedAt: null,
    updatedAt: new Date(0).toISOString(),
  },
];

export function useCategories() {
  const categories = useMemo(() => DEFAULT_CATEGORIES, []);
  return { categories };
}
