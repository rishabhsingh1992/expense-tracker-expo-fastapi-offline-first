import React from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useSyncStore } from '@/src/store/sync';

export function SyncIndicator() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const { status, pendingCount, lastSyncedAt } = useSyncStore();

  const content = (() => {
    switch (status) {
      case 'offline':
        return { icon: 'icloud.slash', label: 'Offline', color: palette.icon, spinner: false };
      case 'syncing':
        return { icon: null, label: 'Syncing', color: palette.tint, spinner: true };
      case 'error':
        return { icon: 'exclamationmark.triangle.fill', label: 'Sync error', color: '#DC2626', spinner: false };
      case 'idle':
      default:
        if (pendingCount > 0) {
          return {
            icon: 'clock.fill',
            label: `${pendingCount} pending`,
            color: '#D97706',
            spinner: false,
          };
        }
        return { icon: 'checkmark.circle.fill', label: 'Synced', color: '#16A34A', spinner: false };
    }
  })();

  const showLastSynced = () => {
    if (status !== 'idle') {
      return;
    }

    Alert.alert('Last synced', lastSyncedAt ? new Date(lastSyncedAt).toLocaleString() : 'Not synced yet');
  };

  return (
    <Pressable onPress={showLastSynced} style={styles.container}>
      <View style={styles.iconWrap}>
        {content.spinner ? (
          <ActivityIndicator size="small" color={content.color} />
        ) : (
          <IconSymbol name={content.icon as never} size={14} color={content.color} />
        )}
      </View>
      <Text style={[styles.label, { color: content.color }]}>{content.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconWrap: {
    width: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});
