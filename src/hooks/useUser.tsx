import useAuth from "./useAuth";

export default function useUser() {
  const authContext = useAuth();

  if (!authContext) {
    throw new Error("useUser must be used within an AuthProvider");
  }

  return authContext.user;
}
