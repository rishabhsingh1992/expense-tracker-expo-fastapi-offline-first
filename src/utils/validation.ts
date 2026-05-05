import { z } from 'zod';

export const expenseSchema = z.object({
  amount: z.string().min(1),
  categoryId: z.string().uuid(),
  note: z.string().max(500).optional(),
  date: z.string(),
  currency: z.string().default('USD'),
});

export const budgetSchema = z.object({
  categoryId: z.string().uuid(),
  limitCents: z.number().int().positive(),
  period: z.enum(['monthly', 'weekly']),
  startsAt: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = loginSchema
  .extend({
    name: z.string().min(1),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
