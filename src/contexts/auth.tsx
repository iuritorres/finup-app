import * as auth from '@/functions/api/auth';
import { User } from '@/types';
import { AuthErrors } from '@/types/enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen, useRouter } from 'expo-router';
import { createContext, useEffect, useState } from 'react';

interface SignInParams {
  email: string;
  password: string;
  options?: {
    onSuccess?: () => void;
    onError?: (error: string) => void;
  };
}

interface RegisterParams {
  name: string;
  email: string;
  password: string;
  options?: {
    onSuccess?: () => void;
    onError?: (error: string) => void;
  };
}

interface AuthContextData {
  signed: boolean;
  user?: User;
  accessToken?: string;
  signIn: ({ email, password }: SignInParams) => Promise<void>;
  signOut: () => Promise<void>;
  register: ({ name, email, password }: RegisterParams) => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function loadStorageData() {
      const [[, storagedUser], [, storagedToken]] = await AsyncStorage.multiGet(
        ['@finup:user', '@finup:access_token']
      );

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        setAccessToken(storagedToken);
      }

      SplashScreen.hideAsync();
    }

    loadStorageData();
  }, []);

  async function signIn({ email, password, options }: SignInParams) {
    const { onSuccess, onError } = options || {};

    const response = await auth.signIn({ email, password });

    if (response.statusCode?.toString().startsWith('4')) {
      onError?.(AuthErrors.CredentialsSignin);
      return;
    }

    setUser(response.user as User);
    onSuccess?.();

    await AsyncStorage.setItem('@finup:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@finup:access_token', response.access_token!);
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser(undefined);
      router.push('/');
    });
  }

  async function register({ name, email, password, options }: RegisterParams) {
    const { onSuccess, onError } = options || {};

    const response = await auth.register({ name, email, password });

    if (response.message) {
      onError?.(AuthErrors.CONFLICT);
      return;
    }

    setUser(response.user as User);
    onSuccess?.();
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, accessToken, signIn, signOut, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}
