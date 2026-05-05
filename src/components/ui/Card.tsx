import React from 'react';
import { Platform, Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
};

export function Card({ children, style, onPress }: CardProps) {
  const backgroundColor = useThemeColor({}, 'background');

  const content = <View style={[styles.card, { backgroundColor }, style]}>{children}</View>;

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    ...(Platform.OS === 'android' ? { elevation: 2 } : {}),
  },
});
