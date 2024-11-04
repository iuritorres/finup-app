import Constants from 'expo-constants';
import type { StatusBarStyle } from 'react-native';
import { Platform, StatusBar, View } from 'react-native';

interface IProps {
  backgroundColor?: string;
  barStyle?: StatusBarStyle | null;
  position?: 'absolute' | 'relative' | 'static';
}

export const CustomStatusBar = ({
  backgroundColor,
  barStyle,
  position = 'absolute',
}: IProps) => {
  const statusBarColor = backgroundColor ? backgroundColor : undefined;

  return (
    <>
      {Platform.OS === 'ios' && (
        <View
          style={{
            position: position,
            height: Constants.statusBarHeight,
            backgroundColor: statusBarColor,
          }}
        />
      )}

      <StatusBar backgroundColor={statusBarColor} barStyle={barStyle} />
    </>
  );
};
