import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AmountInput } from '@/src/components/expense/AmountInput';
import { CategoryPicker } from '@/src/components/expense/CategoryPicker';
import { DatePicker } from '@/src/components/expense/DatePicker';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { usePreferencesStore } from '@/src/store/preferences';
import type { Expense } from '@/src/types/expense';
import { expenseSchema } from '@/src/utils/validation';

type ExpenseFormValues = {
  amount: string;
  categoryId: string;
  date: string;
  note: string;
  currency: string;
};

type ExpenseFormProps = {
  initialValues?: Partial<Expense>;
  onSubmit: (data: ExpenseFormValues) => Promise<void>;
  isLoading: boolean;
};

export function ExpenseForm({ initialValues, onSubmit, isLoading }: ExpenseFormProps) {
  const preferredCurrency = usePreferencesStore((state) => state.currency);
  const defaultCategoryId = usePreferencesStore((state) => state.defaultCategoryId);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: initialValues?.amountCents ? String(initialValues.amountCents / 100) : '',
      categoryId: initialValues?.categoryId ?? defaultCategoryId,
      date: initialValues?.date ?? new Date().toISOString(),
      note: initialValues?.note ?? '',
      currency: initialValues?.currency ?? preferredCurrency,
    },
  });

  useEffect(() => {
    if (!initialValues?.currency) {
      setValue('currency', preferredCurrency);
    }
  }, [initialValues?.currency, preferredCurrency, setValue]);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="amount"
        render={({ field: { value, onChange } }) => (
          <View>
            <AmountInput value={value} onChange={onChange} currency={preferredCurrency} />
            {errors.amount ? <Text style={styles.error}>{errors.amount.message}</Text> : null}
          </View>
        )}
      />

      <Controller
        control={control}
        name="categoryId"
        render={({ field: { value, onChange } }) => (
          <View>
            <CategoryPicker selectedId={value} onSelect={onChange} />
            {errors.categoryId ? <Text style={styles.error}>{errors.categoryId.message}</Text> : null}
          </View>
        )}
      />

      <Controller
        control={control}
        name="date"
        render={({ field: { value, onChange } }) => (
          <View>
            <DatePicker value={value} onChange={onChange} />
            {errors.date ? <Text style={styles.error}>{errors.date.message}</Text> : null}
          </View>
        )}
      />

      <Controller
        control={control}
        name="note"
        render={({ field: { value, onChange } }) => (
          <Input
            label="Note"
            value={value}
            onChangeText={onChange}
            placeholder="Add a note"
            multiline
            style={styles.noteInput}
            error={errors.note?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="currency"
        render={({ field: { value, onChange } }) => (
          <Input
            label="Currency"
            value={value}
            onChangeText={onChange}
            placeholder="USD"
            autoCapitalize="characters"
            maxLength={3}
            error={errors.currency?.message}
          />
        )}
      />

      <Button loading={isLoading} onPress={handleSubmit(onSubmit)}>
        Save Expense
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  noteInput: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  error: {
    marginTop: 6,
    fontSize: 12,
    color: '#DC2626',
  },
});
