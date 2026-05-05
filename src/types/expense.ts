export type Expense = {
  id: string;
  amountCents: number;
  currency: string;
  categoryId: string;
  note: string | null;
  date: string;
  receiptUrl: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  syncedAt: string | null;
};
