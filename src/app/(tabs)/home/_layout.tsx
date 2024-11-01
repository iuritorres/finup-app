import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#121212",
          paddingBottom: 110,
          paddingHorizontal: 18,
        },
      }}
    />
  );
}
