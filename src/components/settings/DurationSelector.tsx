import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, durationOptions } from '@/constants/theme';

interface DurationSelectorProps {
  value: number;
  onChange: (seconds: number) => void;
}

export default function DurationSelector({ value, onChange }: DurationSelectorProps) {
  return (
    <View style={styles.row}>
      {durationOptions.map((option) => {
        const selected = option.seconds === value;
        return (
          <Pressable
            key={option.seconds}
            onPress={() => onChange(option.seconds)}
            style={[styles.option, selected ? styles.optionSelected : styles.optionIdle]}
          >
            <Text style={[styles.label, selected ? styles.labelSelected : styles.labelIdle]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  option: {
    flex: 1,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius['2xl'] - spacing.sm,
    borderWidth: 2,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: colors.emerald[50],
    borderColor: colors.emerald[500],
  },
  optionIdle: {
    backgroundColor: colors.slate[50],
    borderColor: colors.slate[100],
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
  },
  labelSelected: {
    fontWeight: '700',
    color: colors.emerald[800],
  },
  labelIdle: {
    fontWeight: '600',
    color: colors.slate[600],
  },
});
