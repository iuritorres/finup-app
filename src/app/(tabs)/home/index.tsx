import { Button } from "@/components";
import useAuth from "@/hooks/useAuth";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>dasdsadadsadasd</Text>

      <Button title="Deslogar" onPress={signOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 18,
    // backgroundColor: AppStyles.colors.primary,
  },
  text: {
    color: "#ffffff",
  },
});
