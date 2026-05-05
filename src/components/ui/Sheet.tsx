import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { IconButton } from '@/components/ui/IconButton';
import { useThemeColor } from '@/hooks/use-theme-color';

type SheetProps = {
  isOpen: boolean;
  onClose: () => void;
  snapPoints?: string[];
  children: React.ReactNode;
  title?: string;
};

export function Sheet({
  isOpen,
  onClose,
  snapPoints = ['50%', '90%'],
  children,
  title,
}: SheetProps) {
  const sheetRef = useRef<BottomSheet>(null);
  const bgColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const memoSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.close();
    }
  }, [isOpen]);

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={memoSnapPoints}
      onClose={onClose}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: bgColor }}>
      <View style={styles.handleWrap}>
        <View style={styles.handleBar} />
      </View>

      {(title || onClose) && (
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
            {title ?? ''}
          </Text>
          <IconButton name="xmark" size={20} onPress={onClose} />
        </View>
      )}

      <BottomSheetScrollView contentContainerStyle={styles.content}>{children}</BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  handleWrap: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#A1A1AA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});
