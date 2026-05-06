import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import type { Budget } from '@/src/types/budget';
import { formatCurrency } from '@/src/utils/format';

import { BudgetProgress } from './BudgetProgress';

type BudgetCardProps = {
  budget: Budget;
  spentCents: number;
  categoryName: string;
  onPress: () => void;
};

export function BudgetCard({ budget, spentCents, categoryName, onPress }: BudgetCardProps) {
  const remainingCents = budget.limitCents - spentCents;
  const isOver = remainingCents < 0;

  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.categoryName}>{categoryName}</Text>
        <Badge label={budget.period.toUpperCase()} color="#0EA5E9" />
      </View>

      <BudgetProgress limitCents={budget.limitCents} spentCents={spentCents} />

      <Text style={[styles.remaining, isOver && styles.overBudget]}>
        {isOver ? 'Over by ' : 'Remaining '}
        {formatCurrency(Math.abs(remainingCents))}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { gap: 14 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  categoryName: { fontSize: 16, fontWeight: '700' },
  remaining: { fontSize: 14, fontWeight: '600', color: '#3F3F46' },
  overBudget: { color: '#DC2626' },
});
