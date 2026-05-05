import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { useCategories } from '@/src/hooks/useCategories';
import type { Expense } from '@/src/types/expense';
import { formatCurrency } from '@/src/utils/format';

type ExpenseCardProps = {
  expense: Expense;
  onPress: () => void;
  onDelete?: () => void;
};

export function ExpenseCard({ expense, onPress, onDelete }: ExpenseCardProps) {
  const { categories } = useCategories();
  const translateX = useSharedValue(0);

  const category = useMemo(
    () => categories.find((item) => item.id === expense.categoryId) ?? categories[categories.length - 1],
    [categories, expense.categoryId]
  );

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      if (!onDelete) return;
      translateX.value = Math.max(-88, Math.min(0, event.translationX));
    })
    .onEnd(() => {
      if (!onDelete) return;
      translateX.value = withTiming(translateX.value < -44 ? -88 : 0);
    });

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateX: translateX.value }] }));

  return (
    <View style={styles.wrap}>
      {onDelete ? (
        <Pressable style={styles.deleteBtn} onPress={onDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      ) : null}

      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Pressable style={styles.content} onPress={onPress}>
            <View style={styles.left}>
              <View style={[styles.dot, { backgroundColor: category.color }]}>
                <IconSymbol name={category.icon as never} color="#fff" size={16} />
              </View>
            </View>

            <View style={styles.center}>
              <Text numberOfLines={1} style={styles.title}>
                {expense.note?.trim() ? expense.note : category.name}
              </Text>
              <Text style={styles.date}>{new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(expense.date))}</Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.amount}>{formatCurrency(expense.amountCents, expense.currency)}</Text>
              {expense.syncedAt === null ? <View style={styles.pendingDot} /> : null}
            </View>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { overflow: 'hidden', borderRadius: 14 },
  deleteBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 88,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: { color: '#fff', fontWeight: '700' },
  card: { backgroundColor: '#fff' },
  content: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  left: {},
  dot: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  center: { flex: 1 },
  title: { fontSize: 15, fontWeight: '600' },
  date: { marginTop: 2, fontSize: 12, color: '#71717A' },
  right: { alignItems: 'flex-end', gap: 6 },
  amount: { fontSize: 16, fontWeight: '700' },
  pendingDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#F97316' },
});
