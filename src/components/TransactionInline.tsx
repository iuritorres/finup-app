import { formatDate, formatMoney } from "@/functions/utils";
import { TransactionType } from "@/types/enums";
import { StyleSheet, Text, View } from "react-native";

interface IProps {
  name: string;
  amount: number;
  type: TransactionType;
  date: string;
}

export const TransactionInline = ({ name, amount, type, date }: IProps) => {
  const isExpense = type === TransactionType.EXPENSE;
  const amountColor = isExpense ? "#FF4D4D" : "#0ACF83";

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{formatDate(date)}</Text>
      </View>

      <Text style={[styles.amount, { color: amountColor }]}>
        {isExpense && "-"} {formatMoney(amount)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingVertical: 16,
  },
  name: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
  },
  date: {
    color: "#808080",
    fontFamily: "Poppins_400Regular",
  },
  amount: {
    fontFamily: "Poppins_600SemiBold",
  },
});
