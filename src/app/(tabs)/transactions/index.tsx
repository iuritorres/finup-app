import { CustomStatusBar } from "@/components/CustomStatusBar";
import MoneyAmountCard from "@/components/MoneyAmountCard";
import { getTransactions } from "@/functions/api/transactions";
import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppStyles } from "../../../AppStyles";

export default function Transactions() {
  const { data: transactions, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  return (
    <SafeAreaView style={[AppStyles.backgroundDark, AppStyles.container]}>
      <CustomStatusBar barStyle="light-content" />

      <View style={{ flexDirection: "row", gap: 24 }}>
        <MoneyAmountCard title="Receita Total" amount={12239.56} />
        <MoneyAmountCard title="Despesa Total" amount={3692.12} />
      </View>

      <View
        style={{
          marginTop: 16,
          width: "100%",
          borderTopStartRadius: 25,
          borderTopEndRadius: 25,
          padding: 24,
          backgroundColor: "#262626",
          position: "absolute",
          bottom: 0,
          gap: 16,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#fff", fontFamily: "Poppins_600SemiBold" }}>
            Últimas transações
          </Text>
          <Text style={{ color: "#610BD9", fontFamily: "Poppins_600SemiBold" }}>
            Ver todas
          </Text>
        </View>

        <View style={{}}>
          <Text style={{ color: "#fff" }}>test</Text>
          <Text style={{ color: "#fff" }}>test</Text>
          <Text style={{ color: "#fff" }}>test</Text>
          <Text style={{ color: "#fff" }}>test</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
