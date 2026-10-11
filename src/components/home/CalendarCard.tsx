import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface CalendarCardProps {
  mockLogs: Record<string, { text: string; status: string }>;
  onDaySelect?: (day: number, month: number, year: number) => void;
}

const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

export default function CalendarCard({
  mockLogs,
  onDaySelect,
}: CalendarCardProps) {
  const today = new Date();
  const [displayMonth, setDisplayMonth] = useState(today.getMonth());
  const [displayYear, setDisplayYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handleMonthChange = (direction: number) => {
    let newMonth = displayMonth + direction;
    let newYear = displayYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setDisplayMonth(newMonth);
    setDisplayYear(newYear);
  };

  const handleDayPress = (day: number) => {
    setSelectedDay(day);
    onDaySelect?.(day, displayMonth + 1, displayYear);
  };

  const logKey = `${displayYear}-${displayMonth + 1}-${selectedDay}`;
  const selectedLog = mockLogs[logKey];

  const isToday =
    selectedDay === today.getDate() &&
    displayMonth === today.getMonth() &&
    displayYear === today.getFullYear();

  const getDayContainerStyle = (day: number | null) => {
    if (day === null) return styles.dayCell;
    if (day === selectedDay) return [styles.dayCell, styles.selectedDayCell];
    if (day === today.getDate() && displayMonth === today.getMonth() && displayYear === today.getFullYear()) {
      return [styles.dayCell, styles.todayCell];
    }
    if (mockLogs[`${displayYear}-${displayMonth + 1}-${day}`]) {
      return [styles.dayCell, styles.loggedDayCell];
    }
    return [styles.dayCell, styles.regularDayCell];
  };

  const getDayTextStyle = (day: number | null) => {
    if (day === null) return styles.emptyCellText;
    if (day === selectedDay) return styles.selectedDayText;
    if (mockLogs[`${displayYear}-${displayMonth + 1}-${day}`]) {
      return styles.loggedDayText;
    }
    return styles.regularDayText;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>カレンダー・過去の記録</Text>
        <View style={styles.monthSwitcher}>
          <Pressable
            style={styles.monthButton}
            onPress={() => handleMonthChange(-1)}
          >
            <Text style={styles.monthButtonText}>‹</Text>
          </Pressable>
          <Text style={styles.monthLabel}>
            {displayYear}年 {months[displayMonth]}
          </Text>
          <Pressable
            style={styles.monthButton}
            onPress={() => handleMonthChange(1)}
          >
            <Text style={styles.monthButtonText}>›</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.calendarGrid}>
        <View style={styles.dayLabelsRow}>
          {['日', '月', '火', '水', '木', '金', '土'].map((label) => (
            <Text key={label} style={styles.dayLabel}>
              {label}
            </Text>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {days.map((day, index) => (
            <Pressable
              key={index}
              style={getDayContainerStyle(day)}
              onPress={() => day !== null && handleDayPress(day)}
              disabled={day === null}
            >
              {day !== null && (
                <Text style={getDayTextStyle(day)}>{day}</Text>
              )}
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.logBox}>
        <View style={styles.logHeader}>
          <Text style={styles.logDate}>
            {displayMonth + 1}月{selectedDay}日の記録
          </Text>
          {selectedLog && (
            <Text style={styles.logStatus}>{selectedLog.status}</Text>
          )}
        </View>
        <Text style={styles.logContent}>
          {selectedLog?.text || 'この日の記録はありません（または未実施）'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderColor: colors.slate[100],
    borderWidth: 1,
    borderRadius: borderRadius['3xl'],
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.slate[800],
  },
  monthSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.slate[100],
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
  },
  monthButton: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.slate[900],
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  monthButtonText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.slate[600],
  },
  monthLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.slate[700],
    paddingHorizontal: spacing.xs,
  },
  calendarGrid: {
    backgroundColor: 'rgba(248, 250, 252, 0.8)',
    borderRadius: borderRadius['2xl'],
    padding: spacing.md,
    borderColor: colors.slate[100],
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  dayLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  dayLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate[400],
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  dayCell: {
    width: '13.5%',
    aspectRatio: 1,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCellText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.slate[700],
  },
  regularDayCell: {
    backgroundColor: colors.white,
    borderColor: colors.slate[100],
    borderWidth: 1,
  },
  regularDayText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.slate[600],
  },
  todayCell: {
    backgroundColor: colors.emerald[200],
    borderColor: colors.emerald[500],
    borderWidth: 1.5,
  },
  selectedDayCell: {
    backgroundColor: colors.emerald[200],
    borderColor: colors.emerald[500],
    borderWidth: 1.5,
  },
  selectedDayText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.emerald[900],
  },
  loggedDayCell: {
    backgroundColor: colors.emerald[500],
    shadowColor: colors.slate[900],
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  loggedDayText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.white,
  },
  logBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
    borderColor: colors.emerald[100],
    borderWidth: 1,
    borderRadius: borderRadius['2xl'],
    padding: spacing.md,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  logDate: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.emerald[900],
  },
  logStatus: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.emerald[800],
    backgroundColor: colors.emerald[200],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs * 0.5,
    borderRadius: borderRadius.full,
  },
  logContent: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.slate[700],
  },
});
