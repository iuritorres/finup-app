import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

interface IProps {
  error?: string;
  placeholder: string;
  items: { label: string; value: string }[];
  value?: string;
  onSelect: (selectedItem: { label: string; value: string }) => void;
  onBlur?: () => void;
}

export const Select: React.FC<IProps> = ({
  error,
  placeholder,
  items,
  value,
  onSelect,
  onBlur,
}) => {
  const selectedItem = useMemo(
    () => items.find((item) => item.value === value),
    [value]
  );

  return (
    <TouchableWithoutFeedback onPress={onBlur}>
      <>
        <SelectDropdown
          data={items}
          onSelect={(selectedItem) => onSelect(selectedItem)}
          defaultValue={selectedItem}
          renderButton={(selectedItem, isOpened) => {
            const ChevronIcon = isOpened ? ChevronUp : ChevronDown;

            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTextStyle}>
                  {selectedItem?.label ?? placeholder}
                </Text>

                <ChevronIcon size={24} color="#fff" />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => (
            <View
              key={index}
              style={[
                styles.dropdownItemStyle,
                isSelected && { backgroundColor: "#98979E" },
              ]}
            >
              <Text style={styles.dropdownItemTextStyle}>{item.label}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />

        {error && <Text style={styles.errorMessage}>{error}</Text>}
      </>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    height: 62,
    backgroundColor: "#262626",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  dropdownButtonTextStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Poppins_400Regular",
    color: "#98979E",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: "#333",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 62,
  },
  dropdownItemTextStyle: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    color: "#fff",
  },
  errorMessage: {
    color: "#FF7262",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginLeft: 14,
  },
});
