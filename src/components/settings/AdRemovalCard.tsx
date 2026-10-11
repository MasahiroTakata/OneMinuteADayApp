import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface AdRemovalCardProps {
  isRemoved: boolean;
  onPurchase: () => void;
}

export default function AdRemovalCard({ isRemoved, onPurchase }: AdRemovalCardProps) {
  return (
    <LinearGradient
      colors={[colors.slate[900], colors.slate[800]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>プレミアム機能</Text>
          </View>
          <Text style={styles.title}>広告を非表示にする</Text>
        </View>
        <View style={[styles.statusBadge, isRemoved && styles.statusBadgeActive]}>
          <Text style={[styles.statusText, isRemoved && styles.statusTextActive]}>
            {isRemoved ? '適用中 🎉' : '未加入'}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>
        広告を完全に非表示にし、より集中して毎日の1分間習慣に取り組めるノイズゼロの環境を手に入れます。
      </Text>

      <View style={styles.priceBox}>
        <View>
          <Text style={styles.priceLabel}>買い切りプラン（永続）</Text>
          <Text style={styles.price}>
            ¥200 <Text style={styles.priceTax}>（税込）</Text>
          </Text>
        </View>
        <Text style={styles.noExtra}>✨ 追加課金なし</Text>
      </View>

      {isRemoved ? (
        <View style={styles.purchasedButton}>
          <Text style={styles.purchasedText}>✨ 広告なしプラン適用中（購入済み）</Text>
        </View>
      ) : (
        <Pressable onPress={onPurchase}>
          <LinearGradient
            colors={[colors.emerald[400], colors.teal[400]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.purchaseButton}
          >
            <Text style={styles.purchaseText}>200円で広告を非表示にする  →</Text>
          </LinearGradient>
        </Pressable>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius['3xl'],
    padding: spacing['3xl'] - spacing.xs,
    marginBottom: spacing['3xl'] - spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl - spacing.xs,
  },
  headerText: {
    flex: 1,
    marginRight: spacing.md,
  },
  premiumBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  premiumBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.emerald[400],
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    marginTop: spacing.xs,
  },
  statusBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  statusBadgeActive: {
    backgroundColor: colors.emerald[500],
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.emerald[300],
  },
  statusTextActive: {
    color: colors.slate[950],
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.slate[300],
    marginBottom: spacing['2xl'],
  },
  priceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius['2xl'] - spacing.sm,
    padding: spacing.xl - spacing.xs + spacing.xs,
    marginBottom: spacing['2xl'],
  },
  priceLabel: {
    fontSize: 11,
    color: colors.slate[300],
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.white,
  },
  priceTax: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.slate[300],
  },
  noExtra: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.emerald[300],
  },
  purchaseButton: {
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.xl + spacing.xs,
    alignItems: 'center',
  },
  purchaseText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.slate[950],
  },
  purchasedButton: {
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.xl + spacing.xs,
    alignItems: 'center',
    backgroundColor: colors.slate[800],
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  purchasedText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.emerald[400],
  },
});
