import { formatMoney } from "@/functions/utils";
import { TransactionType } from "@/types/enums";
import { WalletMinimal } from "lucide-react-native";
import { useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type IProps = {
  title: string;
  amount: number;
  type?: TransactionType;
};

const walletColors = {
  [TransactionType.INCOME]: "#0ACF83",
  [TransactionType.EXPENSE]: "#FF4D4D",
  undefined: "white",
};

export const MoneyAmountCard = ({ title, amount, type }: IProps) => {
  const formattedAmount = useMemo(
    () => (amount !== undefined ? formatMoney(amount) : null),
    [amount]
  );

  return (
    <View style={styles.container}>
      <View style={{ gap: 8 }}>
        <WalletMinimal color={walletColors[type!]} size={32} />
        <Text style={styles.title}>{title}</Text>
      </View>

      {formattedAmount !== null ? (
        <Text style={styles.amount}>{formattedAmount}</Text>
      ) : (
        <ActivityIndicator size="small" color="#ffffff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 160,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#262626",
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
  amount: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
  },
});
