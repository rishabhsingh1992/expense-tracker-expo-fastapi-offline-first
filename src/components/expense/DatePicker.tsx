import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React, { useMemo, useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

type DatePickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [showIOSInline, setShowIOSInline] = useState(false);
  const date = useMemo(() => new Date(value), [value]);

  const openAndroidPicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      mode: 'date',
      onChange: (_, selectedDate) => {
        if (selectedDate) {
          onChange(selectedDate.toISOString());
        }
      },
    });
  };

  const label = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date);

  return (
    <View>
      <Pressable
        style={styles.input}
        onPress={() => {
          if (Platform.OS === 'ios') {
            setShowIOSInline((current) => !current);
            return;
          }
          openAndroidPicker();
        }}>
        <Text style={styles.label}>{label}</Text>
      </Pressable>

      {Platform.OS === 'ios' && showIOSInline ? (
        <DateTimePicker
          mode="date"
          display="inline"
          value={date}
          onChange={(_, selectedDate) => selectedDate && onChange(selectedDate.toISOString())}
        />
      ) : null}

      {Platform.OS === 'android' ? (
        <Modal visible={false} transparent>
          <View />
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#D4D4D8',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});
