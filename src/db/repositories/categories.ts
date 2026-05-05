import { and, asc, eq, isNull } from 'drizzle-orm';

import type { DB } from '@/src/db/client';
import { categories, type Category } from '@/src/db/schema';

export function getAll(db: DB) {
  return db
    .select()
    .from(categories)
    .where(isNull(categories.deletedAt))
    .orderBy(asc(categories.name));
}

export async function getById(db: DB, id: string) {
  const [category] = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  return category;
}

export function upsert(db: DB, category: Partial<Category> & { id: string }) {
  return db
    .insert(categories)
    .values(category)
    .onConflictDoUpdate({
      target: categories.id,
      set: category,
    });
}

export function softDelete(db: DB, id: string) {
  const now = new Date().toISOString();

  return db
    .update(categories)
    .set({ deletedAt: now, updatedAt: now })
    .where(and(eq(categories.id, id), isNull(categories.deletedAt)));
}
