import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  icon: text('icon').notNull(),
  color: text('color').notNull(),
  isDefault: integer('is_default').notNull().default(0),
  deletedAt: text('deleted_at'),
  updatedAt: text('updated_at').notNull(),
});

export const expenses = sqliteTable('expenses', {
  id: text('id').primaryKey(),
  amountCents: integer('amount_cents').notNull(),
  currency: text('currency').notNull().default('USD'),
  categoryId: text('category_id')
    .notNull()
    .references(() => categories.id),
  note: text('note'),
  date: text('date').notNull(),
  receiptUrl: text('receipt_url'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  deletedAt: text('deleted_at'),
  syncedAt: text('synced_at'),
});

export const budgets = sqliteTable('budgets', {
  id: text('id').primaryKey(),
  categoryId: text('category_id')
    .notNull()
    .references(() => categories.id),
  limitCents: integer('limit_cents').notNull(),
  period: text('period').notNull(),
  startsAt: text('starts_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  deletedAt: text('deleted_at'),
});

export const syncQueue = sqliteTable('sync_queue', {
  id: text('id').primaryKey(),
  operation: text('operation').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id').notNull(),
  payload: text('payload').notNull(),
  createdAt: text('created_at').notNull(),
  attempts: integer('attempts').notNull().default(0),
  lastError: text('last_error'),
});

export type User = typeof users.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Expense = typeof expenses.$inferSelect;
export type Budget = typeof budgets.$inferSelect;
export type SyncQueueItem = typeof syncQueue.$inferSelect;
