import { AppStyles } from '@/AppStyles';
import { Subtitle, Title } from '@/components';
import { getTransactions } from '@/functions/api/transactions';
import useAuth from '@/hooks/useAuth';
import useUser from '@/hooks/useUser';
import { Transaction } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const chartConfig = {
  backgroundGradientFrom: AppStyles.colors.backgroundSecondary,
  backgroundGradientFromOpacity: 0.7,
  backgroundGradientTo: AppStyles.colors.backgroundSecondary,
  backgroundGradientToOpacity: 0.7,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 1,
  useShadowColorFromDataset: false,
};

const barChartData = {
  labels: ['January', 'February', 'March'],
  datasets: [
    {
      data: [80, 99, 43],
    },
  ],
};

enum Categories {
  Alimentação = '#FFCD56',
  Moradia = '#36A2EB',
  Educação = '#FF6384',
  Salário = '#4BC0C0',
  Freelancer = '#9966FF',
  Lazer = '#FF9F40',
  Saúde = '#00C87B',
  Transporte = '#FFCD56',
}

export default function Home() {
  const { width: screenWidth } = useWindowDimensions();

  const { accessToken } = useAuth();
  const user = useUser();

  const {
    data: transactions,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => await getTransactions(accessToken!),
  });

  const pieChartData = useMemo(
    () =>
      Object.values(
        transactions.reduce(
          (acc: { [key: string]: any }, transaction: Transaction) => {
            if (!Array.isArray(transactions)) return acc;
            if (transaction.type === 'INCOME') return acc;

            const category = transaction.category.name;

            if (acc[category]) {
              acc[category].amount += transaction.amount;
            } else {
              acc[category] = {
                name: category,
                amount: transaction.amount,
                color: Categories[category as keyof typeof Categories],
                legendFontColor: AppStyles.colors.textSecondary,
                legendFontSize: 15,
              };
            }

            return acc;
          },
          {}
        )
      ),
    [transactions]
  );

  if (error) {
    Toast.show({
      visibilityTime: 5000,
      type: 'error',
      text1: 'Erro',
      text2: 'Não foi possível carregar as transações',
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      {user && <Title style={{ marginVertical: 24 }}>Olá, {user.name}</Title>}

      {/* <BarChart
        data={barChartData}
        width={screenWidth - AppStyles.insets.screenPadding}
        height={220}
        chartConfig={chartConfig}
        yAxisLabel='$'
        yAxisSuffix=''
        style={{
          alignSelf: 'center',
          marginTop: 32,
          borderRadius: AppStyles.insets.borderRadius,
        }}
      /> */}

      <Subtitle>Despesas por Categoria</Subtitle>
      <PieChart
        data={pieChartData}
        width={screenWidth - AppStyles.insets.screenPadding}
        height={220}
        chartConfig={chartConfig}
        accessor='amount'
        paddingLeft='8'
        backgroundColor={AppStyles.colors.backgroundSecondary}
        style={{
          opacity: 0.7,
          alignSelf: 'center',
          marginTop: 12,
          borderRadius: AppStyles.insets.borderRadius,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.backgroundPrimary,
    paddingHorizontal: AppStyles.insets.screenPadding,
    paddingBottom: 110,
  },
});
