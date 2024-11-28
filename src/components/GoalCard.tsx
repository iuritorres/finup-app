import { AppStyles } from '@/AppStyles';
import { formatMoney, getMonthNameFromDate } from '@/functions/utils';
import { Goal } from '@/types';
import { Goal as GoalIcon } from 'lucide-react-native';
import { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

interface IProps {
  goal: Goal;
  onPress: (goal: Goal) => void;
}

export const GoalCard = ({ goal, onPress }: IProps) => {
  const formattedAmount = useMemo(
    () => (goal.amount !== undefined ? formatMoney(goal.amount) : null),
    [goal.amount]
  );

  const formattedDate = useMemo(() => {
    const monthName = getMonthNameFromDate(new Date(goal.date)).slice(0, 3);
    const year = new Date(goal.date).getFullYear();

    return `${monthName} de ${year}`;
  }, [goal.date]);

  return (
    <TouchableHighlight
      underlayColor={AppStyles.colors.textSecondary}
      style={styles.touchableHighlight}
      onPress={() => onPress(goal)}
    >
      <View style={styles.container}>
        <View style={styles.targetContainer}>
          <GoalIcon color={AppStyles.colors.textPrimary} size={32} />

          <View style={styles.datePercentageContainer}>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={styles.percentage}>
              {(Number(Math.random().toFixed(2)) * 100).toFixed(0)}%
            </Text>
          </View>
        </View>

        {formattedAmount !== null ? (
          <Text style={styles.amount}>{formattedAmount}</Text>
        ) : (
          <ActivityIndicator size='small' color={AppStyles.colors.textPrimary} />
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchableHighlight: {
    borderRadius: AppStyles.insets.borderRadius,
  },
  container: {
    width: 170,
    height: 160,
    padding: 20,
    borderRadius: AppStyles.insets.borderRadius,
    backgroundColor: AppStyles.colors.backgroundSecondary,
    justifyContent: 'space-between',
  },
  targetContainer: {
    gap: 8,
  },
  datePercentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    color: AppStyles.colors.textPrimary,
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  percentage: {
    color: AppStyles.colors.textSecondary,
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  amount: {
    color: AppStyles.colors.textPrimary,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
  },
});
