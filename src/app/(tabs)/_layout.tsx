import { BottomTabBar } from "@/components";
import { Tabs } from "expo-router";
import { ArrowRightLeftIcon, House } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      initialRouteName="home"
      tabBar={(props) => <BottomTabBar {...props} />}
      sceneContainerStyle={{
        backgroundColor: "#121212",
        paddingBottom: 110,
        paddingHorizontal: 18,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <House color={!focused ? "#FFF" : "#0ACF83"} size={26} />
          ),
        }}
      />

      <Tabs.Screen
        name="transactions"
        options={{
          tabBarIcon: ({ focused }) => (
            <ArrowRightLeftIcon
              color={!focused ? "#FFF" : "#0ACF83"}
              size={26}
            />
          ),
        }}
      />
    </Tabs>
  );
}
