import { and, desc, eq, gte, like, isNull, lte, sql } from 'drizzle-orm';

import type { DB } from '@/src/db/client';
import { expenses, type Expense } from '@/src/db/schema';

type ExpenseFilters = {
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
};

export function getAll(db: DB, filters: ExpenseFilters = {}) {
  const conditions = [isNull(expenses.deletedAt)];

  if (filters.categoryId) conditions.push(eq(expenses.categoryId, filters.categoryId));
  if (filters.startDate) conditions.push(gte(expenses.date, filters.startDate));
  if (filters.endDate) conditions.push(lte(expenses.date, filters.endDate));
  if (filters.search) conditions.push(like(expenses.note, `%${filters.search}%`));

  return db
    .select()
    .from(expenses)
    .where(and(...conditions))
    .orderBy(desc(expenses.date));
}

export async function getById(db: DB, id: string) {
  const [expense] = await db.select().from(expenses).where(eq(expenses.id, id)).limit(1);
  return expense;
}

export function getRecentN(db: DB, n: number) {
  return db
    .select()
    .from(expenses)
    .where(isNull(expenses.deletedAt))
    .orderBy(desc(expenses.date))
    .limit(n);
}

export async function getMonthlyTotal(db: DB, startDate: string, endDate: string) {
  const [row] = await db
    .select({ total: sql<number>`coalesce(sum(${expenses.amountCents}), 0)` })
    .from(expenses)
    .where(
      and(isNull(expenses.deletedAt), gte(expenses.date, startDate), lte(expenses.date, endDate)),
    );

  return row?.total ?? 0;
}

export function getByCategoryTotals(db: DB, startDate: string, endDate: string) {
  return db
    .select({ categoryId: expenses.categoryId, total: sql<number>`coalesce(sum(${expenses.amountCents}), 0)` })
    .from(expenses)
    .where(
      and(isNull(expenses.deletedAt), gte(expenses.date, startDate), lte(expenses.date, endDate)),
    )
    .groupBy(expenses.categoryId);
}

export function upsert(db: DB, expense: Partial<Expense> & { id: string }) {
  return db.insert(expenses).values(expense).onConflictDoUpdate({ target: expenses.id, set: expense });
}

export function softDelete(db: DB, id: string) {
  const now = new Date().toISOString();
  return db
    .update(expenses)
    .set({ deletedAt: now, updatedAt: now })
    .where(and(eq(expenses.id, id), isNull(expenses.deletedAt)));
}
