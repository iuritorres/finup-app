import useAuth from "@/hooks/useAuth";
import { Redirect } from "expo-router";

interface IProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: IProps) {
  const { signed } = useAuth();

  const url = signed ? "/(tabs)/home" : "/(auth)/login";

  return <Redirect href={url} />;
}
