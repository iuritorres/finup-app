import { StyleSheet, Text } from 'react-native';

interface TitleProps {
  children: React.ReactNode;
}

export function Title({ children }: TitleProps) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontFamily: 'Montserrat_700Bold',
    color: '#FFF',
  },
});
