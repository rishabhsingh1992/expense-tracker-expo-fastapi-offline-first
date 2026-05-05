import React, { useMemo } from 'react';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { isToday, isYesterday } from 'date-fns';

import { ExpenseCard } from '@/src/components/expense/ExpenseCard';
import { EmptyState } from '@/src/components/layout/EmptyState';
import type { Expense } from '@/src/types/expense';
import { formatDate } from '@/src/utils/date';

type ExpenseListProps = {
  expenses: Expense[];
  onExpensePress: (id: string) => void;
  onRefresh?: () => Promise<void>;
  isRefreshing?: boolean;
};

type ListRow =
  | { type: 'header'; key: string; title: string }
  | { type: 'expense'; key: string; expense: Expense };

function toHeaderTitle(date: Date): string {
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  return formatDate(date.toISOString());
}

export function ExpenseList({ expenses, onExpensePress, onRefresh, isRefreshing = false }: ExpenseListProps) {
  const { items, stickyHeaderIndices } = useMemo(() => {
    const sorted = [...expenses].sort((a, b) => +new Date(b.date) - +new Date(a.date));
    const rows: ListRow[] = [];
    const sticky: number[] = [];
    let currentGroup = '';

    sorted.forEach((expense) => {
      const date = new Date(expense.date);
      const groupKey = expense.date.slice(0, 10);

      if (groupKey !== currentGroup) {
        currentGroup = groupKey;
        sticky.push(rows.length);
        rows.push({ type: 'header', key: `header-${groupKey}`, title: toHeaderTitle(date) });
      }

      rows.push({ type: 'expense', key: expense.id, expense });
    });

    return { items: rows, stickyHeaderIndices: sticky };
  }, [expenses]);

  if (expenses.length === 0) {
    return <EmptyState icon="piggy.bank.fill" title="No expenses yet" />;
  }

  return (
    <FlashList
      data={items}
      keyExtractor={(item) => item.key}
      stickyHeaderIndices={stickyHeaderIndices}
      estimatedItemSize={88}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      refreshControl={
        onRefresh ? <RefreshControl refreshing={isRefreshing} onRefresh={() => void onRefresh()} /> : undefined
      }
      renderItem={({ item }) => {
        if (item.type === 'header') {
          return (
            <View style={styles.headerWrap}>
              <Text style={styles.headerText}>{item.title}</Text>
            </View>
          );
        }

        return <ExpenseCard expense={item.expense} onPress={() => onExpensePress(item.expense.id)} />;
      }}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 32,
  },
  separator: {
    height: 10,
  },
  headerWrap: {
    backgroundColor: '#F4F4F5',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#52525B',
  },
});
