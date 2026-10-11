import { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/theme';
import HomeHeader from '@/components/home/HomeHeader';
import CalendarCard from '@/components/home/CalendarCard';
import DeclarationForm from '@/components/home/DeclarationForm';
import DeclaredCard from '@/components/home/DeclaredCard';
import PeerBanner from '@/components/home/PeerBanner';
import StopwatchModal from '@/components/home/StopwatchModal';

interface Declaration {
  todo: string;
  category: string;
  hour: string;
  minute: string;
  pushEnabled: boolean;
}

const mockLogs: Record<string, { text: string; status: string }> = {
  '2026-9-19': { text: '散歩 (運動)', status: '達成 🎉' },
  '2026-9-18': { text: '英語単語帳1ページ (学習・読書)', status: '達成 🎉' },
  '2026-9-15': { text: 'ストレッチ＆深呼吸 (健康)', status: '達成 🎉' },
  '2026-9-10': { text: '腹筋20回 (運動)', status: '達成 🎉' },
};

export default function HomeScreen() {
  const [declaration, setDeclaration] = useState<Declaration | null>(null);
  const [showStopwatchModal, setShowStopwatchModal] = useState(false);

  const handleDeclarationSubmit = (data: Declaration) => {
    setDeclaration(data);
  };

  const handleEditDeclaration = () => {
    setDeclaration(null);
  };

  const handleStartChallenge = () => {
    setShowStopwatchModal(true);
  };

  const handleCloseStopwatchModal = () => {
    setShowStopwatchModal(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <HomeHeader streak={12} />

          <CalendarCard mockLogs={mockLogs} />

          {declaration ? (
            <DeclaredCard
              todo={declaration.todo}
              category={declaration.category}
              hour={declaration.hour}
              minute={declaration.minute}
              onStartChallenge={handleStartChallenge}
              onEdit={handleEditDeclaration}
            />
          ) : (
            <DeclarationForm onSubmit={handleDeclarationSubmit} />
          )}

          <PeerBanner category={declaration?.category || '運動'} count={1248} />
        </ScrollView>
      </KeyboardAvoidingView>

      <StopwatchModal
        visible={showStopwatchModal}
        onClose={handleCloseStopwatchModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate[50],
  },
  flex: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing['2xl'] * 2,
  },
});
