import { AppStyles } from '@/AppStyles';
import { Button, GoalCard, Subtitle, Title } from '@/components';
import { getGoals } from '@/functions/api/goals';
import useAuth from '@/hooks/useAuth';
import { Goal } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Lightbulb } from 'lucide-react-native';
import { useMemo } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function Goals() {
  const { accessToken } = useAuth();

  const {
    data: goalsData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['goals'],
    queryFn: async () => await getGoals(accessToken!),
  });

  const goals = useMemo(() => goalsData ?? [], [goalsData]);

  const onGoalPress = (goal: Goal) => {
    console.log('Clicked on goal', goal.name);
  };

  const handleCreateGoal = () => {
    console.log('Create new goal');
  };

  if (error) {
    Toast.show({
      visibilityTime: 5000,
      type: 'error',
      text1: 'Erro',
      text2: 'Não foi possível carregar as transações',
    });
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
      contentContainerStyle={styles.container}
    >
      <SafeAreaView>
        <Title style={{ marginVertical: 24 }}>Minhas Metas</Title>

        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.amountCardContainer}
        >
          {goals.map((goal: Goal) => (
            <GoalCard key={goal.id} goal={goal} onPress={onGoalPress} />
          ))}
        </ScrollView>

        <View style={styles.subtitleContainer}>
          <Subtitle>O que são Metas</Subtitle>
          <Lightbulb size={24} color={AppStyles.colors.textSecondary} />
        </View>

        <View style={styles.whatIsGoalsContainer}>
          <Text style={styles.whatIsGoals}>
            Metas são objetivos que você deseja alcançar em um determinado período de tempo. Você
            pode criar metas para economizar dinheiro, comprar um carro, fazer uma viagem ou
            qualquer outro objetivo que você tenha em mente.
          </Text>
        </View>

        <Button title='Nova Meta' onPress={handleCreateGoal} style={styles.button} />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: AppStyles.colors.backgroundPrimary,
    paddingHorizontal: AppStyles.insets.screenPadding,
    paddingBottom: 110,
  },
  amountCardContainer: {
    gap: 16,
    maxHeight: 160,
    alignItems: 'center',
  },
  subtitleContainer: {
    marginVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  whatIsGoalsContainer: {
    padding: AppStyles.insets.screenPadding,
    backgroundColor: AppStyles.colors.backgroundSecondary,
    borderRadius: AppStyles.insets.borderRadius,
  },
  whatIsGoals: {
    fontSize: 14,
    lineHeight: 24,
    color: AppStyles.colors.textPrimary,
  },
  button: {
    marginTop: 24,
  },
});
