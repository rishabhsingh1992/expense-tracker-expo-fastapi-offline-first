import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Colors } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
};

const SIZE_STYLES: Record<ButtonSize, { height: number; fontSize: number; paddingHorizontal: number }> = {
  sm: { height: 32, fontSize: 12, paddingHorizontal: 12 },
  md: { height: 44, fontSize: 15, paddingHorizontal: 16 },
  lg: { height: 52, fontSize: 17, paddingHorizontal: 20 },
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onPress,
  children,
  style,
}: ButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const themedColor = palette.tint;
  const isDisabled = disabled || loading;

  const pressOpacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(pressOpacity.value, { duration: 120 }),
  }));

  const sizeStyle = SIZE_STYLES[size];

  const variantStyle = (() => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          borderColor: themedColor,
          borderWidth: 1,
          textColor: themedColor,
          indicatorColor: themedColor,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0,
          textColor: themedColor,
          indicatorColor: themedColor,
        };
      case 'destructive':
        return {
          backgroundColor: '#DC2626',
          borderColor: '#DC2626',
          borderWidth: 0,
          textColor: '#FFFFFF',
          indicatorColor: '#FFFFFF',
        };
      case 'primary':
      default:
        return {
          backgroundColor: themedColor,
          borderColor: themedColor,
          borderWidth: 0,
          textColor: '#FFFFFF',
          indicatorColor: '#FFFFFF',
        };
    }
  })();

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      onPressIn={() => {
        if (!isDisabled) {
          pressOpacity.value = 0.85;
        }
      }}
      onPressOut={() => {
        pressOpacity.value = 1;
      }}>
      <Animated.View
        style={[
          styles.base,
          {
            height: sizeStyle.height,
            paddingHorizontal: sizeStyle.paddingHorizontal,
            backgroundColor: variantStyle.backgroundColor,
            borderColor: variantStyle.borderColor,
            borderWidth: variantStyle.borderWidth,
            opacity: isDisabled ? 0.55 : 1,
          },
          animatedStyle,
          style,
        ]}>
        {loading ? (
          <ActivityIndicator color={variantStyle.indicatorColor} size="small" />
        ) : (
          <Text style={[styles.text, { fontSize: sizeStyle.fontSize, color: variantStyle.textColor }]}>
            {children}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
  },
});
