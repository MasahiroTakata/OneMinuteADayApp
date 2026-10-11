import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/constants/theme';
import type { HeatLevel } from '@/constants/trackerMock';

interface ActivityHeatmapProps {
  cells: { level: HeatLevel; isToday?: boolean }[];
  monthLabels: [string, string, string];
}

const LEVEL_COLORS: Record<HeatLevel, string> = {
  0: colors.slate[200],
  1: colors.emerald[300],
  2: colors.emerald[400],
  3: colors.emerald[500],
  4: colors.emerald[600],
};

const LEGEND_COLORS = [colors.slate[200], colors.emerald[300], colors.emerald[500], colors.emerald[700]];

const WEEK_SIZE = 7;

export default function ActivityHeatmap({ cells, monthLabels }: ActivityHeatmapProps) {
  const weeks: { level: HeatLevel; isToday?: boolean }[][] = [];
  for (let i = 0; i < cells.length; i += WEEK_SIZE) {
    weeks.push(cells.slice(i, i + WEEK_SIZE));
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.dot} />
          <Text style={styles.title}>アクティビティヒートマップ</Text>
        </View>
        <Text style={styles.period}>直近3ヶ月</Text>
      </View>
      <Text style={styles.description}>毎日の1分間チャレンジの完了状況がドットで可視化されます。</Text>

      <View style={styles.grid}>
        <View style={styles.monthRow}>
          {monthLabels.map((label) => (
            <Text key={label} style={styles.monthLabel}>
              {label}
            </Text>
          ))}
        </View>

        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekRow}>
            {week.map((cell, cellIndex) => (
              <View
                key={cellIndex}
                style={[
                  styles.cell,
                  { backgroundColor: LEVEL_COLORS[cell.level] },
                  cell.isToday && styles.todayCell,
                ]}
              />
            ))}
          </View>
        ))}

        <View style={styles.legend}>
          <Text style={styles.legendText}>少</Text>
          {LEGEND_COLORS.map((color) => (
            <View key={color} style={[styles.legendSwatch, { backgroundColor: color }]} />
          ))}
          <Text style={styles.legendText}>多</Text>
        </View>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
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
  period: {
    fontSize: 11,
    color: colors.slate[400],
  },
  description: {
    fontSize: 12,
    color: colors.slate[500],
    marginBottom: spacing['2xl'],
  },
  grid: {
    backgroundColor: 'rgba(248, 250, 252, 0.8)',
    borderWidth: 1,
    borderColor: colors.slate[100],
    borderRadius: borderRadius['2xl'],
    padding: spacing['2xl'],
    gap: spacing.lg,
  },
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthLabel: {
    fontSize: 10,
    color: colors.slate[400],
  },
  weekRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: borderRadius.md,
  },
  todayCell: {
    borderWidth: 2,
    borderColor: colors.emerald[600],
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl - spacing.xs,
  },
  legendSwatch: {
    width: 10,
    height: 10,
    borderRadius: borderRadius.sm / 2,
  },
  legendText: {
    fontSize: 10,
    color: colors.slate[400],
  },
});
