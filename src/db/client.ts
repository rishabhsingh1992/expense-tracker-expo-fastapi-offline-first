import { DEFAULT_CATEGORIES } from '@/constants/categories';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

import * as schema from './schema';

export type DB = ReturnType<typeof drizzle>;

export let db: DB | null = null;

export function initDatabase() {
  const sqlite = openDatabaseSync('expense-tracker.db');
  const drizzleDb = drizzle(sqlite, { schema });

  drizzleDb.run(sql`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      color TEXT NOT NULL,
      is_default INTEGER NOT NULL DEFAULT 0,
      deleted_at TEXT,
      updated_at TEXT NOT NULL
    )
  `);

  drizzleDb.run(sql`
    CREATE TABLE IF NOT EXISTS expenses (
      id TEXT PRIMARY KEY NOT NULL,
      amount_cents INTEGER NOT NULL,
      currency TEXT NOT NULL DEFAULT 'USD',
      category_id TEXT NOT NULL,
      note TEXT,
      date TEXT NOT NULL,
      receipt_url TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      deleted_at TEXT,
      synced_at TEXT,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);

  drizzleDb.run(sql`
    CREATE TABLE IF NOT EXISTS budgets (
      id TEXT PRIMARY KEY NOT NULL,
      category_id TEXT NOT NULL,
      limit_cents INTEGER NOT NULL,
      period TEXT NOT NULL,
      starts_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      deleted_at TEXT,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);

  drizzleDb.run(sql`
    CREATE TABLE IF NOT EXISTS sync_queue (
      id TEXT PRIMARY KEY NOT NULL,
      operation TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      payload TEXT NOT NULL,
      created_at TEXT NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      last_error TEXT
    )
  `);

  drizzleDb.run(sql`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  for (const category of DEFAULT_CATEGORIES) {
    drizzleDb
      .insert(schema.categories)
      .values({
        id: category.id,
        name: category.name,
        icon: category.icon,
        color: category.color,
        isDefault: 1,
        updatedAt: new Date().toISOString(),
      })
      .onConflictDoNothing()
      .run();
  }

  db = drizzleDb;
  return drizzleDb;
}
