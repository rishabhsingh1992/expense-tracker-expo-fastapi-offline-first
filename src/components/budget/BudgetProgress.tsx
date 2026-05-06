import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { useThemeColor } from '@/hooks/use-theme-color';

type BudgetProgressProps = {
  limitCents: number;
  spentCents: number;
};

export function BudgetProgress({ limitCents, spentCents }: BudgetProgressProps) {
  const progress = limitCents <= 0 ? 0 : Math.min(spentCents / limitCents, 1);
  const progressValue = useSharedValue(progress);
  const trackColor = useThemeColor({ light: '#E4E4E7', dark: '#3F3F46' }, 'icon');

  const fillColor = useMemo(() => {
    if (progress > 0.8) return '#DC2626';
    if (progress >= 0.6) return '#F59E0B';
    return '#16A34A';
  }, [progress]);

  useEffect(() => {
    progressValue.value = withSpring(progress, { damping: 14, stiffness: 120 });
  }, [progress, progressValue]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${progressValue.value * 100}%` }));

  return (
    <View style={styles.container}>
      <View style={[styles.track, { backgroundColor: trackColor }]}>
        <Animated.View style={[styles.fill, { backgroundColor: fillColor }, fillStyle]} />
      </View>
      <Text style={styles.label}>{Math.round(progress * 100)}% of budget used</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  track: { height: 10, width: '100%', borderRadius: 999, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 999 },
  label: { fontSize: 12, color: '#71717A', fontWeight: '500' },
});
