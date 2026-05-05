import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

type AmountInputProps = {
  value: string;
  onChange: (value: string) => void;
  currency?: string;
  error?: string;
};

function getCurrencySymbol(currency: string): string {
  return (
    new Intl.NumberFormat(undefined, { style: 'currency', currency })
      .formatToParts(0)
      .find((part) => part.type === 'currency')?.value ?? currency
  );
}

export function AmountInput({ value, onChange, currency = 'USD', error }: AmountInputProps) {
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'icon');
  const errorColor = '#EF4444';

  return (
    <View>
      <View style={[styles.container, { borderColor: error ? errorColor : borderColor }]}>
        <Text style={[styles.currency, { color: textColor }]}>{getCurrencySymbol(currency)}</Text>
        <TextInput
          value={value}
          onChangeText={onChange}
          style={[styles.input, { color: textColor }]}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor="#9CA3AF"
        />
      </View>
      {error ? <Text style={[styles.error, { color: errorColor }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  currency: {
    fontSize: 32,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    minWidth: 140,
  },
  error: {
    marginTop: 8,
    fontSize: 12,
  },
});
