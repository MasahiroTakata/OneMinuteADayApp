import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import { colors, spacing, borderRadius } from '@/constants/theme';

interface StopwatchModalProps {
  visible: boolean;
  onClose?: () => void;
}

type TimerState = 'idle' | 'running' | 'paused' | 'done';

export default function StopwatchModal({ visible, onClose }: StopwatchModalProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!visible) {
      resetTimer();
    }
  }, [visible]);

  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  const resetTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setTimeLeft(60);
    setTimerState('idle');
  };

  const toggleTimer = () => {
    if (timerState === 'idle') {
      setTimerState('running');
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimerState('done');
            clearInterval(interval);
            setTimerInterval(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setTimerInterval(interval);
    } else if (timerState === 'running') {
      setTimerState('paused');
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    } else if (timerState === 'paused') {
      setTimerState('running');
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimerState('done');
            clearInterval(interval);
            setTimerInterval(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setTimerInterval(interval);
    }
  };

  const handleClose = () => {
    resetTimer();
    onClose?.();
  };

  const getButtonLabel = () => {
    switch (timerState) {
      case 'idle':
        return '開始';
      case 'running':
        return '停止';
      case 'paused':
        return '再開';
      case 'done':
        return '完了して閉じる';
    }
  };

  const getStatusLabel = () => {
    switch (timerState) {
      case 'idle':
        return '「開始」ボタンを押してください';
      case 'running':
        return '集中タイム中...';
      case 'paused':
        return '一時停止中';
      case 'done':
        return 'お疲れ様でした！1分間達成です 🎉';
    }
  };

  const getButtonStyle = () => {
    switch (timerState) {
      case 'idle':
        return [styles.toggleButton, { backgroundColor: colors.emerald[500] }];
      case 'running':
        return [styles.toggleButton, { backgroundColor: colors.rose[500] }];
      case 'paused':
        return [styles.toggleButton, { backgroundColor: colors.amber[500] }];
      case 'done':
        return [styles.toggleButton, { backgroundColor: colors.emerald[500] }];
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const displayTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Pressable
            style={styles.closeButton}
            onPress={handleClose}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>1分集中タイマー</Text>
          </View>

          <View style={styles.timerDisplay}>
            <Text style={styles.timerText}>{displayTime}</Text>
            <Text style={styles.statusLabel}>{getStatusLabel()}</Text>
          </View>

          <Pressable
            style={getButtonStyle()}
            onPress={timerState === 'done' ? handleClose : toggleTimer}
          >
            <Text style={styles.toggleButtonText}>{getButtonLabel()}</Text>
          </Pressable>

          <Pressable
            style={styles.closeModalButton}
            onPress={handleClose}
          >
            <Text style={styles.closeModalButtonText}>閉じる</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxWidth: 320,
    backgroundColor: colors.white,
    borderRadius: borderRadius['3xl'],
    padding: spacing.lg,
    shadowColor: colors.slate[900],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.slate[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.slate[400],
  },
  badge: {
    backgroundColor: colors.emerald[50],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.emerald[600],
  },
  timerDisplay: {
    alignItems: 'center',
    marginVertical: spacing['2xl'],
  },
  timerText: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.slate[800],
    fontFamily: 'Courier New',
    letterSpacing: 2,
  },
  statusLabel: {
    fontSize: 12,
    color: colors.slate[400],
    marginTop: spacing.sm,
  },
  toggleButton: {
    width: '100%',
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.slate[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  toggleButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  closeModalButton: {
    width: '100%',
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.slate[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModalButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.slate[600],
  },
});
