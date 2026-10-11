import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, accentThemes, type AccentKey } from '@/constants/theme';

interface ThemeSelectorProps {
  value: AccentKey;
  onChange: (key: AccentKey) => void;
}

export default function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <View style={styles.row}>
      {accentThemes.map((theme) => {
        const selected = theme.key === value;
        return (
          <Pressable
            key={theme.key}
            onPress={() => onChange(theme.key)}
            style={[
              styles.option,
              selected
                ? { backgroundColor: theme.background, borderColor: theme.border }
                : styles.optionIdle,
            ]}
          >
            <View style={[styles.swatch, { backgroundColor: theme.swatch }]} />
            <Text style={[styles.label, { color: selected ? theme.text : colors.slate[600] }]}>
              {theme.label}
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    borderRadius: borderRadius['2xl'] - spacing.sm,
    borderWidth: 2,
  },
  optionIdle: {
    backgroundColor: colors.slate[50],
    borderColor: colors.slate[100],
  },
  swatch: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
  },
});
