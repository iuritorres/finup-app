import { AppStyles } from '@/AppStyles';
import {
  ButtonProps,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface CustomButtonProps extends ButtonProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
}

export const Button = ({
  title,
  style,
  icon,
  iconBefore,
  iconAfter,
  ...props
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        style,
        {
          justifyContent: iconBefore ? 'flex-start' : iconAfter ? 'space-between' : 'center',
          paddingHorizontal: icon ? 22 : 32,
          paddingVertical: icon ? 22 : 16,
          width: icon ? 0 : '100%',
          height: icon ? 20 : 62,
        },
      ]}
    >
      {iconBefore}
      {icon ?? <Text style={styles.buttonText}>{title.toUpperCase()}</Text>}
      {iconAfter}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppStyles.colors.purple,
    borderRadius: AppStyles.insets.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  buttonText: {
    color: AppStyles.colors.textPrimary,
    fontSize: 16,
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
  },
});
