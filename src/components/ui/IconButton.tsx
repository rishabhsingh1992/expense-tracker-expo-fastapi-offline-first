import React, { ComponentProps } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

type IconButtonProps = {
  name: ComponentProps<typeof IconSymbol>['name'];
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export function IconButton({ name, size = 24, color, onPress, style }: IconButtonProps) {
  const themedColor = useThemeColor({}, 'text');

  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <IconSymbol name={name} size={size} color={color ?? themedColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
