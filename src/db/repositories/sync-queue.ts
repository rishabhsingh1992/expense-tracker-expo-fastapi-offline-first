import { asc, eq, gt } from 'drizzle-orm';

import { MAX_SYNC_ATTEMPTS } from '@/constants/config';
import type { DB } from '@/src/db/client';
import { syncQueue } from '@/src/db/schema';
import type { SyncOperation } from '@/src/types/sync';

export function enqueue(
  db: DB,
  op: Omit<SyncOperation, 'id' | 'createdAt' | 'attempts' | 'lastError'>,
) {
  return db.insert(syncQueue).values({
    id: crypto.randomUUID(),
    operation: op.operation,
    entityType: op.entityType,
    entityId: op.entityId,
    payload: op.payload,
    createdAt: new Date().toISOString(),
    attempts: 0,
    lastError: null,
  });
}

export function getPending(db: DB) {
  return db.select().from(syncQueue).orderBy(asc(syncQueue.createdAt));
}

export async function markAttempt(db: DB, id: string, error?: string) {
  const [current] = await db.select().from(syncQueue).where(eq(syncQueue.id, id)).limit(1);
  if (!current) return;

  return db
    .update(syncQueue)
    .set({
      attempts: current.attempts + 1,
      lastError: error ?? current.lastError,
    })
    .where(eq(syncQueue.id, id));
}

export function remove(db: DB, id: string) {
  return db.delete(syncQueue).where(eq(syncQueue.id, id));
}

export function clearCompleted(db: DB) {
  return db.delete(syncQueue).where(gt(syncQueue.attempts, MAX_SYNC_ATTEMPTS));
}
