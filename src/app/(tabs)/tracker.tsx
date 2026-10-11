import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '@/constants/theme';
import { trackerStats } from '@/constants/trackerMock';
import StatsSummary from '@/components/tracker/StatsSummary';
import ActivityHeatmap from '@/components/tracker/ActivityHeatmap';
import CategoryBreakdown from '@/components/tracker/CategoryBreakdown';

const formatMonth = (offset: number) => {
  const date = new Date();
  return `${new Date(date.getFullYear(), date.getMonth() + offset, 1).getMonth() + 1}月`;
};

const monthLabels: [string, string, string] = [formatMonth(-2), formatMonth(-1), `現在 (${formatMonth(0)})`];

export default function TrackerScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>習慣の足跡</Text>
            </View>
            <Text style={styles.title}>トラッカー・分析</Text>
          </View>
          <View style={styles.streakCircle}>
            <Text style={styles.streakCircleText}>🔥 {trackerStats.currentStreak}日</Text>
          </View>
        </View>

        <StatsSummary
          currentStreak={trackerStats.currentStreak}
          isNewRecord={trackerStats.isNewRecord}
          monthlyAchieved={trackerStats.monthlyAchieved}
          monthlyTotal={trackerStats.monthlyTotal}
          monthlyPercent={trackerStats.monthlyPercent}
        />

        <ActivityHeatmap cells={trackerStats.heatmap} monthLabels={monthLabels} />

        <CategoryBreakdown categories={trackerStats.categories} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate[50],
  },
  content: {
    paddingHorizontal: spacing['3xl'] - spacing.sm,
    paddingTop: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing['2xl'] + spacing.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.emerald[50],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
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
  streakCircle: {
    backgroundColor: colors.emerald[100],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  streakCircleText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.emerald[600],
  },
});
