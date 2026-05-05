import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

type DividerProps = {
  label?: string;
  style?: ViewStyle;
};

export function Divider({ label, style }: DividerProps) {
  const borderColor = useThemeColor({}, 'icon');
  const textColor = useThemeColor({}, 'text');

  if (label) {
    return (
      <View style={[styles.row, style]}>
        <View style={[styles.line, { backgroundColor: borderColor }]} />
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
        <View style={[styles.line, { backgroundColor: borderColor }]} />
      </View>
    );
  }

  return <View style={[styles.singleLine, { backgroundColor: borderColor }, style]} />;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
  },
  label: {
    marginHorizontal: 10,
    fontSize: 12,
  },
  singleLine: {
    width: '100%',
    height: 1,
  },
});
