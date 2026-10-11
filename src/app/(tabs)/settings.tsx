import { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { colors, spacing, borderRadius, type AccentKey, accentThemes } from '@/constants/theme';
import SettingsCard from '@/components/settings/SettingsCard';
import ThemeSelector from '@/components/settings/ThemeSelector';
import DurationSelector from '@/components/settings/DurationSelector';
import AdRemovalCard from '@/components/settings/AdRemovalCard';
import NoticeModal from '@/components/settings/NoticeModal';

interface Notice {
  title: string;
  message: string;
}

const legalItems = [
  {
    label: '利用規約',
    title: '利用規約',
    message: '本アプリの利用規約に関する詳細ページです。',
  },
  {
    label: 'プライバシーポリシー',
    title: 'プライバシーポリシー',
    message: 'ユーザーのデータ保護方針についての詳細です。',
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  const [accent, setAccent] = useState<AccentKey>('emerald');
  const [durationSeconds, setDurationSeconds] = useState(60);
  const [adRemoved, setAdRemoved] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);

  const version = Constants.expoConfig?.version ?? '';

  const handleAccentChange = (key: AccentKey) => {
    setAccent(key);
    const label = accentThemes.find((theme) => theme.key === key)?.label ?? '';
    setNotice({
      title: 'テーマカラー変更',
      message: `テーマカラーを「${label}」に変更しました。`,
    });
  };

  const handleDurationChange = (seconds: number) => {
    setDurationSeconds(seconds);
    const label = seconds === 60 ? '1分 (標準)' : `${seconds / 60}分`;
    setNotice({
      title: '実施時間の設定',
      message: `1回あたりのチャレンジ時間を「${label}」に変更しました。`,
    });
  };

  const handlePurchase = () => {
    if (adRemoved) {
      setNotice({
        title: '購入済みです',
        message: 'すでに広告非表示プランが有効になっています。快適にお楽しみください！',
      });
      return;
    }
    setAdRemoved(true);
    setNotice({
      title: 'ご購入ありがとうございます！',
      message: '¥200の買い切り広告なしプランが正常に適用されました。これよりすべての広告が非表示となります。',
    });
  };

  const handleRestore = () => {
    setAdRemoved(true);
    setNotice({
      title: '購入の復元',
      message: '過去の購入履歴を確認しました。「広告非表示プラン（買い切り）」を復元しました。',
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable style={styles.backButton} onPress={() => router.navigate('/')}>
              <Text style={styles.backText}>‹</Text>
            </Pressable>
            <Text style={styles.title}>設定</Text>
          </View>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>v{version}</Text>
          </View>
        </View>

        <SettingsCard title="テーマカラー選択" description="アプリ全体のアクセントカラーを変更できます。">
          <ThemeSelector value={accent} onChange={handleAccentChange} />
        </SettingsCard>

        <SettingsCard
          title="実施時間の変更（1分間チャレンジ）"
          description="1日に行う習慣チャレンジのタイマー時間を調整します。"
        >
          <DurationSelector value={durationSeconds} onChange={handleDurationChange} />
        </SettingsCard>

        <AdRemovalCard isRemoved={adRemoved} onPurchase={handlePurchase} />

        <View style={styles.linkCard}>
          {legalItems.map((item) => (
            <View key={item.label} style={styles.linkRow}>
              <Text style={styles.linkLabel}>{item.label}</Text>
              <Pressable onPress={() => setNotice({ title: item.title, message: item.message })}>
                <Text style={styles.linkAction}>確認する</Text>
              </Pressable>
            </View>
          ))}
          <View style={[styles.linkRow, styles.linkRowLast]}>
            <Text style={styles.linkLabel}>購入の復元 (Restore)</Text>
            <Pressable onPress={handleRestore}>
              <Text style={styles.linkAction}>復元する</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <NoticeModal
        visible={notice !== null}
        title={notice?.title ?? ''}
        message={notice?.message ?? ''}
        onClose={() => setNotice(null)}
      />
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
    alignItems: 'center',
    marginBottom: spacing['3xl'] - spacing.xs,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl - spacing.xs + spacing.xs,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.slate[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.slate[600],
    marginTop: -2,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.slate[900],
  },
  versionBadge: {
    backgroundColor: colors.slate[100],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  versionText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.slate[500],
  },
  linkCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate[100],
    borderRadius: borderRadius['3xl'],
    paddingHorizontal: spacing['3xl'] - spacing.xs,
    paddingVertical: spacing.xs,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate[50],
  },
  linkRowLast: {
    borderBottomWidth: 0,
  },
  linkLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.slate[500],
  },
  linkAction: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.emerald[600],
  },
});
