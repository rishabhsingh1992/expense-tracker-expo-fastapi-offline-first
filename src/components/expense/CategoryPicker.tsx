import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Sheet } from '@/src/components/ui/Sheet';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useCategories } from '@/src/hooks/useCategories';

type CategoryPickerProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function CategoryPicker({ selectedId, onSelect }: CategoryPickerProps) {
  const { categories } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const textColor = useThemeColor({}, 'text');

  const selected = useMemo(
    () => categories.find((item) => item.id === selectedId) ?? categories[0],
    [categories, selectedId]
  );

  return (
    <>
      <Pressable style={styles.pill} onPress={() => setIsOpen(true)}>
        <View style={[styles.dot, { backgroundColor: selected.color }]}>
          <IconSymbol name={selected.icon as never} size={16} color="#fff" />
        </View>
        <Text style={[styles.pillText, { color: textColor }]}>{selected.name}</Text>
      </Pressable>

      <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="Choose category">
        <View style={styles.grid}>
          {categories.map((category) => {
            const isSelected = category.id === selectedId;

            return (
              <Pressable
                key={category.id}
                style={[styles.tile, isSelected && styles.tileSelected]}
                onPress={() => {
                  onSelect(category.id);
                  setIsOpen(false);
                }}>
                <View style={[styles.iconCircle, { backgroundColor: category.color }]}>
                  <IconSymbol name={category.icon as never} size={20} color="#fff" />
                </View>
                <Text style={[styles.tileText, { color: textColor }]}>{category.name}</Text>
              </Pressable>
            );
          })}
        </View>
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D4D4D8',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    fontSize: 15,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingTop: 8,
  },
  tile: {
    width: '30%',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    paddingVertical: 12,
  },
  tileSelected: {
    borderColor: '#2563EB',
    borderWidth: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  tileText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
