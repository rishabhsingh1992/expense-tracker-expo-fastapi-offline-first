import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { VictoryPie } from 'victory-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { formatCurrency, formatPercent } from '@/src/utils/format';

type CategoryPoint = {
  categoryId: string;
  totalCents: number;
  categoryName: string;
  color: string;
};

type CategoryBreakdownProps = {
  data: CategoryPoint[];
};

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  const textColor = useThemeColor({}, 'text');
  const mutedTextColor = useThemeColor({ light: '#71717A', dark: '#A1A1AA' }, 'icon');
  const totalCents = useMemo(() => data.reduce((sum, item) => sum + item.totalCents, 0), [data]);

  return (
    <View>
      <VictoryPie
        width={240}
        height={240}
        data={data.map((item) => ({ x: item.categoryName, y: item.totalCents / 100 }))}
        labels={() => ''}
        colorScale={data.map((item) => item.color)}
        innerRadius={50}
        padAngle={2}
      />

      <View style={styles.legend}>
        {data.map((item) => (
          <View key={item.categoryId} style={styles.legendRow}>
            <View style={[styles.dot, { backgroundColor: item.color }]} />
            <Text style={[styles.name, { color: textColor }]}>{item.categoryName}</Text>
            <Text style={[styles.amount, { color: textColor }]}>{formatCurrency(item.totalCents)}</Text>
            <Text style={[styles.percent, { color: mutedTextColor }]}>
              {formatPercent(item.totalCents, totalCents)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  legend: { marginTop: 10, gap: 8 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  name: { flex: 1, fontSize: 14, fontWeight: '500' },
  amount: { fontSize: 14, fontWeight: '600' },
  percent: { width: 52, textAlign: 'right', fontSize: 12 },
});
