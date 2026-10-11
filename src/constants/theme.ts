export const colors = {
  emerald: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  teal: {
    400: '#2dd4bf',
    600: '#0d9488',
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  sky: {
    500: '#0ea5e9',
    600: '#0284c7',
  },
  blue: {
    600: '#2563eb',
  },
  indigo: {
    50: '#eef2ff',
    500: '#6366f1',
    600: '#4f46e5',
    800: '#3730a3',
  },
  rose: {
    50: '#fff1f2',
    500: '#f43f5e',
    600: '#e11d48',
    800: '#9f1239',
  },
  amber: {
    50: '#fffbeb',
    200: '#fcd34d',
    500: '#f59e0b',
    700: '#b45309',
    800: '#92400e',
  },
  white: '#ffffff',
};

export const spacing = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

export const categories = [
  { label: '🏃 運動', value: '運動', color: colors.emerald[600] },
  { label: '📚 学習・読書', value: '学習・読書', color: colors.emerald[600] },
  { label: '✨ 健康・マインド', value: '健康・マインド', color: colors.emerald[600] },
];

export const accentThemes = [
  { key: 'emerald', label: 'エメラルド', swatch: colors.emerald[500], background: colors.emerald[50], border: colors.emerald[500], text: colors.emerald[800] },
  { key: 'indigo', label: 'インディゴ', swatch: colors.indigo[600], background: colors.indigo[50], border: colors.indigo[500], text: colors.indigo[800] },
  { key: 'amber', label: 'サンセット', swatch: colors.amber[500], background: colors.amber[50], border: colors.amber[500], text: colors.amber[800] },
  { key: 'rose', label: 'ローズ', swatch: colors.rose[500], background: colors.rose[50], border: colors.rose[500], text: colors.rose[800] },
] as const;

export type AccentKey = (typeof accentThemes)[number]['key'];

export const durationOptions = [
  { seconds: 60, label: '1分 (標準)' },
  { seconds: 180, label: '3分' },
  { seconds: 300, label: '5分' },
] as const;

export const hours = ['06', '07', '08', '12', '18', '21'];
export const minutes = ['00', '30'];
