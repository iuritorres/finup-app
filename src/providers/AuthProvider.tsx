import { AuthContext } from '@/hooks/useAuth';
import { User } from '@/types';
import { useEffect, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      //   const user = await AsyncStorage.getItem('@plantmanager:user');
      //   if (user) {
      //     setUser(JSON.parse(user));
      //   }
    }

    loadUser();
  }, []);

  async function signIn(user: User) {
    setUser(user);
    // await AsyncStorage.setItem('@plantmanager:user', JSON.stringify(user));
  }

  async function signOut() {
    setUser(null);
    // await AsyncStorage.removeItem('@plantmanager:user');
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
