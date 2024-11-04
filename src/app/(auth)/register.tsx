import { AppStyles } from '@/AppStyles';
import { Button, Input, Subtitle, Title } from '@/components';
import { getRegisterErrorMessage } from '@/functions/api/auth';
import useAuth from '@/hooks/useAuth';
import { FontAwesome6 } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { z } from 'zod';

export const registerFormSchema = z
  .object({
    name: z
      .string({ required_error: 'Campo obrigatório' })
      .min(3, { message: 'Nome muito curto' }),
    email: z
      .string({ required_error: 'Campo obrigatório' })
      .email('E-mail inválido'),
    password: z
      .string({ required_error: 'Campo obrigatório' })
      .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
      .regex(/[A-Z]/, {
        message: 'A senha deve ter pelo menos uma letra maiúscula',
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'A senha deve ter pelo menos um caractere especial',
      }),
    confirmPassword: z
      .string({ required_error: 'Campo obrigatório' })
      .refine((value) => value),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  });

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });

  async function handleRegister({
    name,
    email,
    password,
  }: z.infer<typeof registerFormSchema>) {
    Keyboard.dismiss();

    await register({
      name,
      email,
      password,
      options: {
        onSuccess: () => {
          Toast.show({
            visibilityTime: 5000,
            type: 'success',
            text1: 'Sucesso',
            text2: 'Conta criada com sucesso',
          });
          router.replace('/(auth)/login');
        },
        onError: (error) => {
          Toast.show({
            visibilityTime: 5000,
            type: 'error',
            text1: 'Erro',
            text2: getRegisterErrorMessage(error) ?? 'Erro desconhecido',
          });
        },
      },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior='position'>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome6
            name='arrow-left'
            size={36}
            color={AppStyles.colors.textSecondary}
            style={{ marginVertical: 24 }}
          />
        </TouchableOpacity>

        <Title>Bem Vindo!</Title>
        <Subtitle>Faça login para continuar</Subtitle>

        <View style={styles.inputsContainer}>
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
                fontAwesomeIcon='user'
                placeholder='Digite seu nome completo'
                textContentType='emailAddress'
                autoComplete='email'
              />
            )}
          />

          <Controller
            name='email'
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                error={errors.email?.message}
                fontAwesomeIcon='envelope'
                placeholder='Digite seu e-mail'
                textContentType='emailAddress'
                autoComplete='email'
              />
            )}
          />

          <Controller
            name='password'
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                error={errors.password?.message}
                fontAwesomeIcon='lock'
                placeholder='Digite sua senha'
                textContentType='newPassword'
                autoComplete='new-password'
                secureTextEntry
              />
            )}
          />

          <Controller
            name='confirmPassword'
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                error={errors.confirmPassword?.message}
                fontAwesomeIcon='lock'
                placeholder='Digite sua senha novamente'
                textContentType='newPassword'
                autoComplete='new-password'
                secureTextEntry
              />
            )}
          />
        </View>

        <Button title='CRIAR CONTA' onPress={handleSubmit(handleRegister)} />

        <TouchableOpacity
          style={{ marginTop: 16 }}
          onPress={() => router.back()}
        >
          <Text style={styles.login}>
            Já tem uma conta? <Text style={styles.loginLink}>Entre aqui.</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.backgroundPrimary,
    padding: 24,
  },
  inputsContainer: {
    marginVertical: 24,
    gap: 16,
  },
  login: {
    marginTop: 10,
    color: AppStyles.colors.textPrimary,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
  loginLink: {
    textDecorationLine: 'underline',
    fontFamily: 'Poppins_700Bold',
  },
});
