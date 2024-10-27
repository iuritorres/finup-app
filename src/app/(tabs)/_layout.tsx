import BottomTabBar from "@/components/BottomTabBar";
import { Tabs } from "expo-router";
import { ArrowRightLeftIcon, House } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
      initialRouteName="home"
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
