import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface NoticeModalProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function NoticeModal({ visible, title, message, onClose }: NoticeModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.icon}>
            <Text style={styles.iconText}>✨</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing['3xl'],
  },
  card: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: colors.white,
    borderRadius: borderRadius['3xl'],
    padding: spacing['3xl'] - spacing.xs,
    alignItems: 'center',
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.emerald[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  iconText: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.slate[900],
    marginBottom: spacing.xs,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.slate[500],
    textAlign: 'center',
    marginBottom: spacing['3xl'] - spacing.xs,
  },
  button: {
    width: '100%',
    backgroundColor: colors.emerald[500],
    borderRadius: borderRadius.xl - spacing.xs,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
});
