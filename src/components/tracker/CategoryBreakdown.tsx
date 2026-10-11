import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface CategoryItem {
  name: string;
  icon: string;
  percent: number;
  count: number;
  barColor: string;
  textColor: string;
}

interface CategoryBreakdownProps {
  categories: CategoryItem[];
}

export default function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <View style={styles.dot} />
        <Text style={styles.title}>カテゴリ別取り組み割合</Text>
      </View>

      <View style={styles.list}>
        {categories.map((category) => (
          <View key={category.name}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemName}>
                {category.icon} {category.name}
              </Text>
              <Text style={[styles.itemValue, { color: category.textColor }]}>
                {category.percent}% ({category.count}回)
              </Text>
            </View>
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  { width: `${category.percent}%`, backgroundColor: category.barColor },
                ]}
              />
            </View>
          </View>
        ))}
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
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
  list: {
    gap: spacing.xl,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.slate[700],
  },
  itemValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  track: {
    width: '100%',
    height: 10,
    backgroundColor: colors.slate[100],
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
});
