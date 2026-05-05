import React, { ReactNode, useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function Input({ label, error, leftIcon, rightIcon, onFocus, onBlur, style, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColorDefault = useThemeColor({}, 'icon');
  const primaryColor = useThemeColor({}, 'tint');

  const hasError = Boolean(error);
  const borderColor = hasError ? '#DC2626' : isFocused ? primaryColor : borderColorDefault;

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={[styles.label, { color: textColor }]}>{label}</Text> : null}

      <View style={[styles.inputRow, { backgroundColor, borderColor }]}>
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}

        <TextInput
          style={[styles.input, { color: textColor }, style]}
          placeholderTextColor={useThemeColor({}, 'icon')}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          {...props}
        />

        {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  inputRow: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 10,
  },
  error: {
    marginTop: 6,
    fontSize: 12,
    color: '#DC2626',
  },
});
