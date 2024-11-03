import { formatDate, formatMoney } from '@/functions/utils';
import { Transaction } from '@/types';
import { TransactionType } from '@/types/enums';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { CategoryIcon } from './CategoryIcon';

interface IProps {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
}

export const TransactionInline = ({ transaction, onPress }: IProps) => {
  const isExpense = transaction.type === TransactionType.EXPENSE;
  const amountColor = isExpense ? '#FF4D4D' : '#0ACF83';

  return (
    <TouchableHighlight
      underlayColor='#333'
      onPress={() => onPress(transaction)}
    >
      <View style={styles.container}>
        <View style={styles.categoryAndLabelContainer}>
          <CategoryIcon category={transaction.category.name} />

          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>
              {transaction.name}
            </Text>
            <Text style={styles.date}>{formatDate(transaction.date)}</Text>
          </View>
        </View>

        <Text style={[styles.amount, { color: amountColor }]}>
          {isExpense && '-'} {formatMoney(transaction.amount)}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingVertical: 16,
    gap: 16,
  },
  categoryAndLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexShrink: 1,
  },
  nameContainer: {
    flexShrink: 1,
  },
  name: {
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
  },
  date: {
    color: '#808080',
    fontFamily: 'Poppins_400Regular',
  },
  amount: {
    fontFamily: 'Poppins_600SemiBold',
  },
});
