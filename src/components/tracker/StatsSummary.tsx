import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface StatsSummaryProps {
  currentStreak: number;
  isNewRecord: boolean;
  monthlyAchieved: number;
  monthlyTotal: number;
  monthlyPercent: number;
}

export default function StatsSummary({
  currentStreak,
  isNewRecord,
  monthlyAchieved,
  monthlyTotal,
  monthlyPercent,
}: StatsSummaryProps) {
  return (
    <View style={styles.row}>
      <LinearGradient
        colors={[colors.emerald[500], colors.teal[600]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Text style={styles.streakLabel}>現在の連続日数</Text>
        <Text style={styles.streakValue}>
          {currentStreak} <Text style={styles.streakUnit}>日連続</Text>
        </Text>
        {isNewRecord && (
          <View style={styles.recordBadge}>
            <Text style={styles.recordText}>自己ベスト更新中！</Text>
          </View>
        )}
      </LinearGradient>

      <View style={[styles.card, styles.rateCard]}>
        <Text style={styles.rateLabel}>今月の達成率</Text>
        <Text style={styles.rateValue}>
          {monthlyPercent} <Text style={styles.rateUnit}>%</Text>
        </Text>
        <Text style={styles.rateDetail}>
          {monthlyAchieved}日 / {monthlyTotal}日間達成
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginBottom: spacing['3xl'] - spacing.sm,
  },
  card: {
    flex: 1,
    borderRadius: borderRadius['2xl'],
    padding: spacing['2xl'],
    justifyContent: 'space-between',
    minHeight: 120,
  },
  rateCard: {
    backgroundColor: colors.slate[50],
    borderWidth: 1,
    borderColor: colors.slate[100],
  },
  streakLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.emerald[100],
  },
  streakValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.white,
    marginTop: spacing.xs,
  },
  streakUnit: {
    fontSize: 12,
    fontWeight: '400',
  },
  recordBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginTop: spacing.sm,
  },
  recordText: {
    fontSize: 10,
    color: colors.white,
  },
  rateLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.slate[500],
  },
  rateValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.slate[800],
    marginTop: spacing.xs,
  },
  rateUnit: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.slate[500],
  },
  rateDetail: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.emerald[600],
    marginTop: spacing.sm,
  },
});
