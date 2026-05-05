import React, { ReactNode } from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { SyncIndicator } from '@/src/components/layout/SyncIndicator';

type HeaderProps = {
  title: string;
  showSync?: boolean;
  rightAction?: ReactNode;
};

export function Header({ title, showSync = true, rightAction }: HeaderProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12, backgroundColor: palette.background }]}>
      <Text style={[styles.title, { color: palette.text }]}>{title}</Text>
      <View style={styles.rightSlot}>
        {showSync ? <SyncIndicator /> : null}
        {rightAction}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
  },
  rightSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
