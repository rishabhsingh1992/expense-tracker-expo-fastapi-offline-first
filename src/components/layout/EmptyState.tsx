import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { Button } from '@/src/components/ui/Button';
import { IconSymbol } from '@/components/ui/icon-symbol';

type EmptyStateProps = {
  icon: string;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ icon, title, subtitle, actionLabel, onAction }: EmptyStateProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <IconSymbol name={icon as never} size={48} color={palette.icon} />
      <Text style={[styles.title, { color: palette.text }]}>{title}</Text>
      {subtitle ? <Text style={[styles.subtitle, { color: palette.icon }]}>{subtitle}</Text> : null}
      {actionLabel ? (
        <Button size="sm" onPress={onAction} style={styles.button}>
          {actionLabel}
        </Button>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    marginTop: 6,
  },
});
