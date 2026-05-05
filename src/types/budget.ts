export type Budget = {
  id: string;
  categoryId: string;
  limitCents: number;
  period: 'monthly' | 'weekly';
  startsAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
