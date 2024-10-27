import type {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export const BottomTabBar = (props: BottomTabBarProps) => {
  const getRouterOptions = (
    key: string
  ): BottomTabNavigationOptions | undefined => {
    return props.descriptors[key]?.options;
  };

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#610BD9",
        flexDirection: "row",
        justifyContent: "space-around",
        borderRadius: 16,
        width: "90%",
        height: 74,
        position: "absolute",
        bottom: 24,
        alignSelf: "center",
      }}
    >
      {props.state.routes.map((route, index) => (
        <TouchableOpacity
          key={index}
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
          onPress={() => props.navigation.navigate(route.name)}
        >
          {getRouterOptions(route.key)?.tabBarIcon?.({
            focused: props.state.index === index,
            color: "#fff",
            size: 24,
          })}
        </TouchableOpacity>
      ))}
    </View>
  );
};
