import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Switch,
} from 'react-native';
import { colors, spacing, borderRadius, categories, hours, minutes } from '@/constants/theme';

interface DeclarationFormProps {
  onSubmit?: (data: {
    todo: string;
    category: string;
    hour: string;
    minute: string;
    pushEnabled: boolean;
  }) => void;
}

export default function DeclarationForm({ onSubmit }: DeclarationFormProps) {
  const [todo, setTodo] = useState('散歩');
  const [selectedCategory, setSelectedCategory] = useState('運動');
  const [selectedHour, setSelectedHour] = useState('08');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [pushEnabled, setPushEnabled] = useState(true);

  const handleSubmit = () => {
    if (!todo.trim()) return;
    onSubmit?.({
      todo,
      category: selectedCategory,
      hour: selectedHour,
      minute: selectedMinute,
      pushEnabled,
    });
  };

  const isFormValid = todo.trim().length > 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <View style={styles.dot} />
          <Text style={styles.headerText}>本日の1分宣言</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>未記入</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>今日取り組むこと（一言）</Text>
        <TextInput
          style={styles.textInput}
          placeholder="例：スクワットを20回やる"
          placeholderTextColor={colors.slate[400]}
          value={todo}
          onChangeText={setTodo}
        />
      </View>

      <View style={styles.twoColumnRow}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: spacing.sm }]}>
          <Text style={styles.label}>カテゴリ</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            scrollEnabled={false}
          >
            <View style={styles.categoryContainer}>
              {categories.map((cat) => (
                <Pressable
                  key={cat.value}
                  style={[
                    styles.categoryChip,
                    selectedCategory === cat.value && styles.categoryChipActive,
                  ]}
                  onPress={() => setSelectedCategory(cat.value)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      selectedCategory === cat.value && styles.categoryChipTextActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.label}>タイミング（時刻）</Text>
          <View style={styles.timeInputContainer}>
            <Pressable style={styles.timeDropdown}>
              <Text style={styles.timeDropdownText}>{selectedHour}</Text>
            </Pressable>
            <Text style={styles.timeSeparator}>:</Text>
            <Pressable style={styles.timeDropdown}>
              <Text style={styles.timeDropdownText}>{selectedMinute}</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.notificationToggle}>
        <View style={styles.notificationLabel}>
          <Text style={styles.notificationIcon}>🔔</Text>
          <Text style={styles.notificationText}>時間になったらプッシュ通知する</Text>
        </View>
        <Switch
          value={pushEnabled}
          onValueChange={setPushEnabled}
          trackColor={{ false: colors.slate[300], true: colors.emerald[500] }}
          thumbColor={colors.white}
        />
      </View>

      <Pressable
        style={[
          styles.submitButton,
          !isFormValid && styles.submitButtonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={!isFormValid}
      >
        <Text style={styles.submitButtonText}>本日の1分宣言をする！ →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderColor: colors.slate[100],
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
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.emerald[500],
  },
  headerText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.slate[800],
  },
  statusBadge: {
    backgroundColor: colors.amber[50],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs * 0.5,
    borderRadius: borderRadius.full,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.amber[700],
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.slate[600],
    marginBottom: spacing.xs,
  },
  textInput: {
    width: '100%',
    backgroundColor: colors.slate[50],
    borderColor: colors.slate[200],
    borderWidth: 1,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 13,
    color: colors.slate[800],
  },
  twoColumnRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  categoryScroll: {
    overflow: 'visible',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  categoryChip: {
    backgroundColor: colors.slate[50],
    borderColor: colors.slate[200],
    borderWidth: 1,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    minWidth: 100,
  },
  categoryChipActive: {
    backgroundColor: colors.emerald[500],
    borderColor: colors.emerald[500],
  },
  categoryChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.slate[800],
  },
  categoryChipTextActive: {
    color: colors.white,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.slate[50],
    borderColor: colors.slate[200],
    borderWidth: 1,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  timeDropdown: {
    backgroundColor: colors.white,
    borderColor: colors.slate[200],
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeDropdownText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.slate[800],
  },
  timeSeparator: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.slate[500],
  },
  notificationToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.slate[50],
    borderColor: colors.slate[100],
    borderWidth: 1,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  notificationLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  notificationIcon: {
    fontSize: 16,
  },
  notificationText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.slate[700],
  },
  submitButton: {
    backgroundColor: colors.emerald[500],
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.slate[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
});
