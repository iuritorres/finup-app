import { Button, Subtitle } from '@/components';
import useAuth from '@/hooks/useAuth';
import useUser from '@/hooks/useUser';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const { signOut } = useAuth();
  const user = useUser();

  return (
    <SafeAreaView style={styles.container}>
      {user && <Subtitle>Olá, {user.name}</Subtitle>}

      <Button title='Sair ' onPress={signOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 18,
    paddingBottom: 110,
    // backgroundColor: AppStyles.colors.primary,
  },
});
