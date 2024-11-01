import {
  ButtonProps,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type CustomButtonProps = ButtonProps & {
  style?: StyleProp<ViewStyle>;
};

export const Button: React.FC<CustomButtonProps> = ({
  title,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity {...props} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#610BD9",
    height: 62,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
    textAlign: "center",
  },
});
