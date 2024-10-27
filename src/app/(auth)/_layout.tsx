import { CustomStatusBar } from "@/components/CustomStatusBar";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <>
      <CustomStatusBar barStyle="light-content" />

      <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </>
  );
}
