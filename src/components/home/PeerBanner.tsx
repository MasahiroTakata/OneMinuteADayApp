import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface PeerBannerProps {
  category: string;
  count: number;
}

export default function PeerBanner({ category, count }: PeerBannerProps) {
  return (
    <LinearGradient
      colors={[colors.sky[500], colors.blue[600]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      <View style={styles.content}>
        <View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>本日の仲間たち</Text>
          </View>
          <Text style={styles.title}>
            本日は <Text style={styles.boldCount}>{count.toLocaleString()}名</Text> が「{category}」に取り組み中！
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>👥</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: borderRadius['3xl'],
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.slate[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs * 0.5,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.white,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 0,
  },
  boldCount: {
    fontWeight: '800',
    color: colors.amber[200],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  icon: {
    fontSize: 20,
  },
});
