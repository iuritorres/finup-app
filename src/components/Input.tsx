import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface CustomInputProps {
  fontAwesomeIcon?: string | undefined;
  error?: string;
  placeholder: string;
}

export const Input: React.FC<TextInputProps & CustomInputProps> = ({
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
        <FontAwesome6 name={fontAwesomeIcon} size={24} color="#98939E" />

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
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
  },
  inputWrapperOnFocus: {
    backgroundColor: "#262626",
    borderBottomWidth: 0,
    borderRadius: 16,
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
