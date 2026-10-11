import { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface SettingsCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function SettingsCard({ title, description, children }: SettingsCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <View style={styles.dot} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {description && <Text style={styles.description}>{description}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate[100],
    borderRadius: borderRadius['3xl'],
    padding: spacing['3xl'] - spacing.xs,
    marginBottom: spacing['3xl'] - spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.emerald[500],
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.slate[800],
  },
  description: {
    fontSize: 12,
    color: colors.slate[500],
    marginBottom: spacing.xl - spacing.xs,
  },
});
