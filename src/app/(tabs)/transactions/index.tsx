import {
  Button,
  CustomStatusBar,
  MoneyAmountCard,
  Subtitle,
  Title,
  TransactionInline,
} from '@/components';
import { getTransactions } from '@/functions/api/transactions';
import { getMonthNameFromDate } from '@/functions/utils';
import useAuth from '@/hooks/useAuth';
import { Transaction } from '@/types';
import { TransactionType } from '@/types/enums';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function Transactions() {
  const router = useRouter();
  const { accessToken } = useAuth();

  const {
    data: transactions,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => await getTransactions(accessToken!),
  });

  const { totalIncomes, totalExpenses } = useMemo(() => {
    if (!Array.isArray(transactions))
      return { totalIncomes: 0, totalExpenses: 0 };

    return transactions.reduce(
      (
        acc: { totalIncomes: number; totalExpenses: number },
        transaction: Transaction
      ) => {
        if (transaction.type === TransactionType.INCOME) {
          acc.totalIncomes += transaction.amount;
        } else {
          acc.totalExpenses += transaction.amount;
        }

        return acc;
      },
      { totalIncomes: 0, totalExpenses: 0 }
    );
  }, [transactions]);

  if (error) {
    Toast.show({
      visibilityTime: 5000,
      type: 'error',
      text1: 'Erro',
      text2: 'Não foi possível carregar as transações',
    });
  }

  useFocusEffect(() => {
    refetch();
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      <SafeAreaView style={styles.container}>
        <CustomStatusBar barStyle='light-content' />

        <Title style={styles.title}>
          {getMonthNameFromDate(new Date(Date.now()))}
        </Title>

        <View style={styles.amountCardContainer}>
          <MoneyAmountCard
            title='Receita Total'
            amount={totalIncomes}
            type={TransactionType.INCOME}
          />
          <MoneyAmountCard
            title='Despesa Total'
            amount={totalExpenses}
            type={TransactionType.EXPENSE}
          />
        </View>

        <Button
          title='Adicionar Transação'
          onPress={() => router.navigate('/(tabs)/transactions/create')}
          style={{ marginTop: 32, width: '100%' }}
        />

        <View style={styles.transactionsContainer}>
          <Subtitle>Últimas transações</Subtitle>

          {transactions &&
            transactions?.map((transaction: Transaction, index: number) => (
              <TransactionInline key={index} transaction={transaction} />
            ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
  },
  title: {
    marginTop: 32,
  },
  amountCardContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
    marginTop: 32,
  },
  transactionsContainer: {
    width: '100%',
    marginTop: 32,
  },
});
