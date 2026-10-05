import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface DeclaredCardProps {
  todo: string;
  category: string;
  hour: string;
  minute: string;
  onStartChallenge?: () => void;
  onEdit?: () => void;
}

const getCategoryLabel = (category: string) => {
  switch (category) {
    case '運動':
      return '🏃 運動';
    case '学習・読書':
      return '📚 学習・読書';
    case '健康・マインド':
      return '✨ 健康';
    default:
      return category;
  }
};

const getTimeOfDay = (hour: string) => {
  const h = parseInt(hour);
  if (h < 12) return '朝';
  if (h < 18) return '昼';
  return '夜';
};

export default function DeclaredCard({
  todo,
  category,
  hour,
  minute,
  onStartChallenge,
  onEdit,
}: DeclaredCardProps) {
  const timeOfDay = getTimeOfDay(hour);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.statusDot} />
        <Text style={styles.headerText}>本日の1分宣言</Text>
        <View style={styles.completeBadge}>
          <Text style={styles.completeBadgeText}>宣言完了</Text>
        </View>
      </View>

      <View style={styles.contentBox}>
        <Text style={styles.todoTitle}>{todo}</Text>
        <View style={styles.metadataRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>
              {getCategoryLabel(category)}
            </Text>
          </View>
          <Text style={styles.metadataSeparator}>•</Text>
          <Text style={styles.timeBadge}>
            {timeOfDay} {hour}:{minute}
          </Text>
        </View>
      </View>

      <Pressable
        style={styles.startButton}
        onPress={onStartChallenge}
      >
        <Text style={styles.startButtonText}>⏱️ 1分間チャレンジを開始する</Text>
      </Pressable>

      <Pressable onPress={onEdit}>
        <Text style={styles.editLink}>内容を修正する</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    borderColor: colors.emerald[200],
    borderWidth: 1,
    borderRadius: borderRadius['3xl'],
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.emerald[500],
  },
  headerText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.emerald[900],
    flex: 1,
    marginLeft: spacing.sm,
  },
  completeBadge: {
    backgroundColor: colors.emerald[200],
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs * 0.5,
  },
  completeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.emerald[800],
  },
  contentBox: {
    backgroundColor: colors.white,
    borderRadius: borderRadius['2xl'],
    padding: spacing.md,
    borderColor: colors.emerald[100],
    borderWidth: 1,
    marginBottom: spacing.md,
    shadowColor: colors.slate[900],
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.emerald[800],
    marginBottom: spacing.sm,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryBadge: {
    backgroundColor: colors.emerald[100],
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs * 0.5,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.emerald[700],
  },
  metadataSeparator: {
    fontSize: 11,
    color: colors.slate[500],
  },
  timeBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.slate[600],
  },
  startButton: {
    backgroundColor: colors.emerald[500],
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.slate[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  startButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
  editLink: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.emerald[700],
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
