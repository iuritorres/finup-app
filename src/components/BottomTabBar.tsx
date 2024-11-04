import { AppStyles } from '@/AppStyles';
import type {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { Href, usePathname } from 'expo-router';
import { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';

const visibleInRoutes: Href[] = ['/(tabs)/home', '/(tabs)/transactions'];

export const BottomTabBar = (props: BottomTabBarProps) => {
  const pathname = usePathname();

  const isVisible = useMemo(
    () => visibleInRoutes.includes('/(tabs)'.concat(pathname) as Href),
    [pathname]
  );

  const getRouterOptions = (
    key: string
  ): BottomTabNavigationOptions | undefined => {
    return props.descriptors[key]?.options;
  };

  if (!isVisible) return null;

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: AppStyles.colors.purple,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 12,
        width: '90%',
        height: 74,
        position: 'absolute',
        bottom: 24,
        alignSelf: 'center',
      }}
    >
      {props.state.routes.map((route, index) => (
        <TouchableOpacity
          key={index}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
          onPress={() => props.navigation.navigate(route.name)}
        >
          {getRouterOptions(route.key)?.tabBarIcon?.({
            focused: props.state.index === index,
            color: AppStyles.colors.textPrimary,
            size: 24,
          })}
        </TouchableOpacity>
      ))}
    </View>
  );
};
