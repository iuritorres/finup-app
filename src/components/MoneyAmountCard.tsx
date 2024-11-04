import { AppStyles } from '@/AppStyles';
import { formatMoney } from '@/functions/utils';
import { TransactionType } from '@/types/enums';
import { WalletMinimal } from 'lucide-react-native';
import { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface IProps {
  title: string;
  amount: number;
  type?: TransactionType;
}

const amountColors = {
  [TransactionType.INCOME]: AppStyles.colors.green,
  [TransactionType.EXPENSE]: AppStyles.colors.red,
  undefined: AppStyles.colors.textPrimary,
};

export const MoneyAmountCard = ({ title, amount, type }: IProps) => {
  const formattedAmount = useMemo(
    () => (amount !== undefined ? formatMoney(amount) : null),
    [amount]
  );

  return (
    <View style={styles.container}>
      <View style={styles.walletContainer}>
        <WalletMinimal color='white' size={32} />
        <Text style={styles.title}>{title}</Text>
      </View>

      {formattedAmount !== null ? (
        <Text style={[styles.amount, { color: amountColors[type!] }]}>
          {formattedAmount}
        </Text>
      ) : (
        <ActivityIndicator size='small' color={AppStyles.colors.textPrimary} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexBasis: 0,
    height: 160,
    padding: 20,
    borderRadius: 12,
    backgroundColor: AppStyles.colors.backgroundSecondary,
    justifyContent: 'space-between',
  },
  walletContainer: {
    gap: 8,
  },
  title: {
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  amount: {
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
  },
});
