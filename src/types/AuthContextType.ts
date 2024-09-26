import { User } from './User';

export type AuthContextType = {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
};
