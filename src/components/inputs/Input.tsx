import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface IProps extends TextInputProps {
  fontAwesomeIcon?: string | undefined;
  error?: string;
}

export const Input: React.FC<IProps> = ({
  fontAwesomeIcon,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <View
        style={[styles.inputWrapper, isFocused && styles.inputWrapperOnFocus]}
      >
        {fontAwesomeIcon && (
          <FontAwesome6 name={fontAwesomeIcon} size={24} color="#98939E" />
        )}

        <TextInput
          placeholderTextColor="#98939E"
          style={styles.textInput}
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>

      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    paddingHorizontal: 24,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderRadius: 6,
    borderBottomColor: "#808080",
  },
  inputWrapperOnFocus: {
    backgroundColor: "#262626",
    borderBottomWidth: 0,
    borderRadius: 12,
  },
  textInput: {
    fontSize: 16,
    width: "85%",
    height: 54,
    fontFamily: "Poppins_400Regular",
    color: "#98979E",
  },
  errorMessage: {
    color: "#FF7262",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginLeft: 14,
  },
});
