import { useAuth } from '@/hooks/useAuth';
import { AuthProvider } from '@/providers';
import { Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Slot, useFocusEffect, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { user } = useAuth();
  const router = useRouter();

  const [fontsLoaded, fontsError] = useFonts({
    Montserrat_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontsError]);

  useFocusEffect(() => {
    if (fontsLoaded && !user) {
      router.replace('/(auth)/login');
    }
  });

  if (!fontsLoaded && !fontsError) return null;
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
