import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type SpendingPoint = {
  date: string;
  totalCents: number;
};

type SpendingChartProps = {
  data: SpendingPoint[];
  period: 'weekly' | 'monthly';
};

export function SpendingChart({ data, period }: SpendingChartProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  const chartData = useMemo(
    () =>
      data.map((entry) => ({
        x: new Date(entry.date),
        y: entry.totalCents / 100,
      })),
    [data]
  );

  const xTickFormat = (value: Date) => {
    const format: Intl.DateTimeFormatOptions =
      period === 'weekly' ? { weekday: 'short' } : { month: 'short', day: 'numeric' };

    return new Intl.DateTimeFormat(undefined, format).format(value);
  };

  return (
    <View style={styles.container}>
      <VictoryChart height={280} theme={VictoryTheme.material} domainPadding={{ x: 20, y: 12 }}>
        <VictoryAxis
          tickFormat={xTickFormat}
          style={{
            tickLabels: { fill: palette.icon, fontSize: 11, padding: 4 },
            axis: { stroke: '#D4D4D8' },
            ticks: { stroke: '#D4D4D8' },
            grid: { stroke: 'transparent' },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(value) => `$${value.toFixed(0)}`}
          style={{
            tickLabels: { fill: palette.icon, fontSize: 11, padding: 4 },
            axis: { stroke: '#D4D4D8' },
            ticks: { stroke: '#D4D4D8' },
            grid: { stroke: '#E4E4E7' },
          }}
        />
        <VictoryBar data={chartData} style={{ data: { fill: palette.tint } }} cornerRadius={{ top: 4 }} />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
