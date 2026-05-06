import React, { useMemo } from 'react';
import { View } from 'react-native';
import { VictoryAxis, VictoryChart, VictoryLegend, VictoryLine, VictoryTheme } from 'victory-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type TrendPoint = {
  date: string;
  totalCents: number;
};

type MonthlyTrendProps = {
  currentPeriod: TrendPoint[];
  previousPeriod: TrendPoint[];
};

export function MonthlyTrend({ currentPeriod, previousPeriod }: MonthlyTrendProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  const currentData = useMemo(
    () => currentPeriod.map((entry) => ({ x: new Date(entry.date), y: entry.totalCents / 100 })),
    [currentPeriod]
  );
  const previousData = useMemo(
    () => previousPeriod.map((entry) => ({ x: new Date(entry.date), y: entry.totalCents / 100 })),
    [previousPeriod]
  );

  return (
    <View>
      <VictoryChart height={280} theme={VictoryTheme.material}>
        <VictoryLegend
          x={50}
          y={8}
          orientation="horizontal"
          gutter={20}
          data={[
            { name: 'Current', symbol: { fill: palette.tint } },
            { name: 'Previous', symbol: { fill: '#A1A1AA' } },
          ]}
        />
        <VictoryAxis tickFormat={(value) => new Intl.DateTimeFormat(undefined, { month: 'short' }).format(value)} />
        <VictoryAxis dependentAxis tickFormat={(value) => `$${value.toFixed(0)}`} />
        <VictoryLine data={currentData} style={{ data: { stroke: palette.tint, strokeWidth: 3 } }} />
        <VictoryLine data={previousData} style={{ data: { stroke: '#A1A1AA', strokeWidth: 3 } }} />
      </VictoryChart>
    </View>
  );
}
