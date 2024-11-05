import { AppStyles } from '@/AppStyles';
import { Button, Input, Subtitle, Title } from '@/components';
import { getLoginErrorMessage } from '@/functions/api/auth';
import useAuth from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
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

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .email('E-mail inválido'),
  password: z.string({ required_error: 'Campo obrigatório' }),
});

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  async function handleSignIn({
    email,
    password,
  }: z.infer<typeof loginFormSchema>) {
    Keyboard.dismiss();

    await signIn({
      email,
      password,
      options: {
        onSuccess: () => {
          router.replace('/(tabs)/home');
        },
        onError: (error) => {
          Toast.show({
            visibilityTime: 5000,
            type: 'error',
            text1: 'Erro',
            text2: getLoginErrorMessage(error) ?? 'Erro desconhecido',
          });
        },
      },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior='position'>
        <Image
          source={require('@/assets/images/login-page.png')}
          style={styles.image}
        />

        <Title>Bem Vindo!</Title>
        <Subtitle>Faça login para continuar</Subtitle>

        <View style={styles.inputsContainer}>
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
                textContentType='password'
                autoComplete='password'
                secureTextEntry
              />
            )}
          />
        </View>

        <Button
          title='ENTRAR'
          style={{ marginTop: 24 }}
          onPress={handleSubmit(handleSignIn)}
        />

        <View style={styles.registerContainer}>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.forgotPassword}>Esqueci a senha</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.register}>
              Não tem uma conta?{' '}
              <Text style={styles.registerLink}>Crie aqui.</Text>
            </Text>
          </TouchableOpacity>
        </View>
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
  image: {
    width: 274,
    height: 274,
    alignSelf: 'center',
  },
  inputsContainer: {
    marginTop: 12,
    gap: 16,
  },
  forgotPassword: {
    color: AppStyles.colors.textPrimary,
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  registerContainer: {
    marginTop: 30,
    alignItems: 'center',
    gap: 14,
  },
  register: {
    color: AppStyles.colors.textPrimary,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
  registerLink: {
    textDecorationLine: 'underline',
    fontFamily: 'Poppins_700Bold',
  },
  errorMessage: {
    color: AppStyles.colors.red,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
});
