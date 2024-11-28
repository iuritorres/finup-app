import { AppStyles } from '@/AppStyles';
import { BottomTabBar } from '@/components';
import { Tabs } from 'expo-router';
import { ArrowRightLeftIcon, Goal, House } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      initialRouteName='home'
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen
        name='home'
        options={{
          tabBarIcon: ({ focused }) => (
            <House
              color={!focused ? AppStyles.colors.textPrimary : AppStyles.colors.green}
              size={26}
            />
          ),
        }}
      />

      <Tabs.Screen
        name='transactions'
        options={{
          tabBarIcon: ({ focused }) => (
            <ArrowRightLeftIcon
              color={!focused ? AppStyles.colors.textPrimary : AppStyles.colors.green}
              size={26}
            />
          ),
        }}
      />

      <Tabs.Screen
        name='goals'
        options={{
          tabBarIcon: ({ focused }) => (
            <Goal
              color={!focused ? AppStyles.colors.textPrimary : AppStyles.colors.green}
              size={26}
            />
          ),
        }}
      />
    </Tabs>
  );
}
