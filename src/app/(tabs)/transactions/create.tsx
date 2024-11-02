import { Button, Input, Select, Title } from '@/components';
import { categories } from '@/constants';
import { createTransaction } from '@/functions/api/transactions';
import { toISODate } from '@/functions/utils';
import useAuth from '@/hooks/useAuth';
import { TransactionType } from '@/types/enums';
import { FontAwesome6 } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';

import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { z } from 'zod';

const selectItems = [
  { label: 'Entrada', value: TransactionType.INCOME },
  { label: 'Despesa', value: TransactionType.EXPENSE },
];

const createTransactionFormSchema = z.object({
  type: z.enum(Object.values(TransactionType) as [TransactionType], {
    required_error: 'Campo obrigatório',
  }),
  amount: z.coerce
    .number({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Campo obrigatório',
    })
    .positive({ message: 'Valor inválido' }),
  name: z.string({ required_error: 'Campo obrigatório' }),
  date: z
    .string({ required_error: 'Campo obrigatório' })
    .refine((date) => /^\d{2}\/\d{2}\/\d{4}$/.test(date), {
      message: 'Data inválida',
    }),
  categoryId: z.enum(
    [
      categories[0].value,
      ...categories.slice(1).map((category) => category.value),
    ],
    { required_error: 'Campo obrigatório' }
  ),
});

export default function CreateTransaction() {
  const router = useRouter();
  const { accessToken } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createTransactionFormSchema>>({
    resolver: zodResolver(createTransactionFormSchema),
  });

  const handleCreateTransaction = async (
    data: z.infer<typeof createTransactionFormSchema>
  ) => {
    try {
      await createTransaction({
        accessToken: accessToken!,
        data: {
          ...data,
          date: toISODate(data.date),
        },
      });

      Toast.show({
        visibilityTime: 5000,
        type: 'success',
        text1: 'Sucesso',
        text2: 'Transação criada com sucesso',
      });

      router.replace('/(tabs)/transactions');
    } catch (error) {
      Toast.show({
        visibilityTime: 5000,
        type: 'error',
        text1: 'Erro',
        text2: 'Erro ao criar transação',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior='position'>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome6
              name='arrow-left'
              size={36}
              color='#98979E'
              style={{ marginVertical: 24 }}
            />
          </TouchableOpacity>

          <Title>Criar Transação</Title>

          <View style={styles.inputsContainer}>
            <Controller
              name='categoryId'
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  items={categories}
                  onBlur={onBlur}
                  value={value}
                  onSelect={(selectedItem) => onChange(selectedItem.value)}
                  placeholder='Categoria'
                  error={errors.categoryId?.message}
                />
              )}
            />

            <Controller
              name='type'
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  items={selectItems}
                  onBlur={onBlur}
                  value={value}
                  onSelect={(selectedItem) => onChange(selectedItem.value)}
                  placeholder='Tipo'
                  error={errors.type?.message}
                />
              )}
            />

            <Controller
              name='amount'
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value?.toString()}
                  error={errors.amount?.message}
                  placeholder='Valor'
                  keyboardType='numeric'
                />
              )}
            />

            <Controller
              name='name'
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  error={errors.name?.message}
                  placeholder='Nome'
                />
              )}
            />

            <Controller
              name='date'
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  error={errors.date?.message}
                  placeholder='Data (dd/mm/aaaa)'
                />
              )}
            />
          </View>

          <Button
            title='CRIAR'
            onPress={handleSubmit(handleCreateTransaction)}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  inputsContainer: {
    marginVertical: 24,
    gap: 16,
  },
});
