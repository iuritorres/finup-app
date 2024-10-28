import { StyleSheet, Text, TextProps } from "react-native";

interface IProps extends TextProps {
  children: React.ReactNode;
}

export function Title({ children, style, ...props }: IProps) {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontFamily: "Montserrat_700Bold",
    color: "#FFF",
  },
});
