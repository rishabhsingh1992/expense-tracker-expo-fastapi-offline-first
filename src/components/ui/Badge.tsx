import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

type BadgeProps = {
  label: string;
  color: string;
  textColor?: string;
  style?: ViewStyle;
};

export function Badge({ label, color, textColor = '#FFFFFF', style }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: color }, style]}>
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
