import useAuth from '@/hooks/useAuth';
import { Redirect } from 'expo-router';

export default function AuthGuard() {
  const { signed } = useAuth();
  const url = signed ? '/(tabs)/home' : '/(auth)/login';

  return <Redirect href={url} />;
}
