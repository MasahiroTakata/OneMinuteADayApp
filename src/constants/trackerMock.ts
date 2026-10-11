import { colors } from '@/constants/theme';

export type HeatLevel = 0 | 1 | 2 | 3 | 4;

export const trackerStats = {
  currentStreak: 12,
  isNewRecord: true,
  monthlyAchieved: 24,
  monthlyTotal: 28,
  monthlyPercent: 86,
  heatmap: [
    { level: 3 }, { level: 2 }, { level: 3 }, { level: 0 }, { level: 4 }, { level: 3 }, { level: 2 },
    { level: 3 }, { level: 3 }, { level: 0 }, { level: 0 }, { level: 2 }, { level: 4 }, { level: 3 },
    { level: 3 }, { level: 4 }, { level: 3 }, { level: 2 }, { level: 3 }, { level: 3 }, { level: 3, isToday: true },
  ] as { level: HeatLevel; isToday?: boolean }[],
  categories: [
    { name: '学習・読書', icon: '📚', percent: 55, count: 13, barColor: colors.emerald[500], textColor: colors.emerald[600] },
    { name: '運動・ストレッチ', icon: '💪', percent: 30, count: 7, barColor: colors.indigo[500], textColor: colors.indigo[600] },
    { name: '健康・マインド', icon: '✨', percent: 15, count: 4, barColor: colors.amber[500], textColor: colors.amber[700] },
  ],
};
