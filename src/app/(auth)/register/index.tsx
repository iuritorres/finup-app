import { AppStyles } from '@/AppStyles';
import { Button, Input, Subtitle, Title } from '@/components';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Register() {
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
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome6
            name='arrow-left'
            size={36}
            color='#98979E'
            style={{ marginVertical: 24 }}
          />
        </TouchableOpacity>

        <Title>Bem Vindo!</Title>
        <Subtitle>Faça login para continuar</Subtitle>

        <View style={styles.inputsContainer}>
          <Input
            fontAwesomeIcon='user'
            placeholder='Digite seu nome completo'
            textContentType='emailAddress'
            autoComplete='email'
          />
          <Input
            fontAwesomeIcon='mobile-screen-button'
            placeholder='Digite seu número'
            textContentType='telephoneNumber'
            autoComplete='tel-device'
          />
          <Input
            fontAwesomeIcon='envelope'
            placeholder='Digite seu e-mail'
            textContentType='emailAddress'
            autoComplete='email'
          />
          <Input
            fontAwesomeIcon='lock'
            placeholder='Digite sua senha'
            textContentType='newPassword'
            autoComplete='new-password'
          />
          <Input
            fontAwesomeIcon='lock'
            placeholder='Digite sua senha novamente'
            textContentType='newPassword'
            autoComplete='new-password'
          />
        </View>

        <Button title='CRIAR CONTA' onPress={handleSubmit} />

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
  inputsContainer: {
    marginVertical: 24,
    gap: 16,
  },
  login: {
    marginTop: 10,
    color: '#FAFAFA',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
  loginLink: {
    textDecorationLine: 'underline',
    fontFamily: 'Poppins_700Bold',
  },
});
