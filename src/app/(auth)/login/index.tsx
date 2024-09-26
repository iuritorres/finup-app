import { AppStyles } from '@/AppStyles';
import { Button, Input, Subtitle, Title } from '@/components';
import { useRouter } from 'expo-router';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native';

export default function Login() {
  const router = useRouter();

  function handleSubmit() {
    // Implementar a lógica de autenticação
    router.push('/');
  }

  return (
    <SafeAreaView
      style={[AppStyles.backgroundDark, AppStyles.screenPadding, { flex: 1 }]}
    >
      <KeyboardAvoidingView behavior='position'>
        <Image
          source={require('@/assets/images/login-page.png')}
          style={styles.image}
        />

        <Title>Bem Vindo!</Title>
        <Subtitle>Faça login para continuar</Subtitle>

        <View style={styles.inputsContainer}>
          <Input
            fontAwesomeIcon='envelope'
            placeholder='Digite seu e-mail'
            textContentType='emailAddress'
            autoComplete='email'
          />
          <Input
            fontAwesomeIcon='lock'
            placeholder='Digite sua senha'
            textContentType='password'
            autoComplete='password'
          />
        </View>

        <Button
          title='ENTRAR'
          style={{ marginTop: 24 }}
          onPress={handleSubmit}
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
    color: '#FAFAFA',
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
    color: '#FAFAFA',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
  registerLink: {
    textDecorationLine: 'underline',
    fontFamily: 'Poppins_700Bold',
  },
});
