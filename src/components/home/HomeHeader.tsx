import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface HomeHeaderProps {
  streak: number;
}

export default function HomeHeader({ streak }: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>今日の1分チャレンジ</Text>
        </View>
        <Text style={styles.title}>朝の1分宣言</Text>
      </View>
      <View style={styles.streakBadge}>
        <Text style={styles.streakText}>🔥 {streak}日</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  badge: {
    backgroundColor: colors.emerald[50],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.emerald[600],
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.slate[900],
    marginTop: spacing.xs,
  },
  streakBadge: {
    backgroundColor: colors.emerald[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
    shadowColor: colors.slate[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.emerald[600],
  },
});
