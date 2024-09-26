import { StyleSheet, Text } from 'react-native';

interface SubtitleProps {
  children: React.ReactNode;
}

export function Subtitle({ children }: SubtitleProps) {
  return <Text style={styles.subtitle}>{children}</Text>;
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#98979E',
  },
});
