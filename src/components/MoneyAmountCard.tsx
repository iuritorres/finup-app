import { formatMoney } from "@/functions/utils";
import { WalletMinimal } from "lucide-react-native";
import { useMemo } from "react";
import { Text, View } from "react-native";

type IProps = {
  title: string;
  amount: number;
};

export default function MoneyAmountCard({ title, amount }: IProps) {
  const formattedAmount = useMemo(() => formatMoney(amount), [amount]);

  return (
    <View
      style={{
        width: 160,
        height: 160,
        padding: 20,
        borderRadius: 20,
        backgroundColor: "#262626",
        justifyContent: "space-between",
      }}
    >
      <View style={{ gap: 8 }}>
        <WalletMinimal color="white" size={32} />
        <Text
          style={{
            color: "white",
            fontFamily: "Poppins_400Regular",
            fontSize: 12,
          }}
        >
          {title}
        </Text>
      </View>

      <Text
        style={{
          color: "white",
          fontFamily: "Poppins_600SemiBold",
          fontSize: 18,
        }}
      >
        {formattedAmount}
      </Text>
    </View>
  );
}
