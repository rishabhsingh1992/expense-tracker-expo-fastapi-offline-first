import { and, eq, isNull } from 'drizzle-orm';

import type { DB } from '@/src/db/client';
import { budgets, type Budget } from '@/src/db/schema';

export function getAll(db: DB) {
  return db.select().from(budgets).where(isNull(budgets.deletedAt));
}

export async function getById(db: DB, id: string) {
  const [budget] = await db.select().from(budgets).where(eq(budgets.id, id)).limit(1);
  return budget;
}

export function upsert(db: DB, budget: Partial<Budget> & { id: string }) {
  return db.insert(budgets).values(budget).onConflictDoUpdate({ target: budgets.id, set: budget });
}

export function softDelete(db: DB, id: string) {
  const now = new Date().toISOString();
  return db
    .update(budgets)
    .set({ deletedAt: now, updatedAt: now })
    .where(and(eq(budgets.id, id), isNull(budgets.deletedAt)));
}
