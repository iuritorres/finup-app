import { StyleSheet, Text, TextProps } from "react-native";

interface IProps extends TextProps {
  children: React.ReactNode;
}

export const Subtitle = ({ children, style, ...props }: IProps) => {
  return (
    <Text style={[styles.subtitle, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#98979E",
  },
});
