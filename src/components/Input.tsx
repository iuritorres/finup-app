import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

interface CustomInputProps {
  fontAwesomeIcon?: string | undefined;
  placeholder: string;
}

export const Input: React.FC<TextInputProps & CustomInputProps> = ({
  fontAwesomeIcon,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[styles.inputWrapper, isFocused && styles.inputWrapperOnFocus]}
    >
      <FontAwesome6 name={fontAwesomeIcon} size={24} color='#98939E' />

      <TextInput
        placeholderTextColor='#98939E'
        style={styles.textInput}
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(217,217,217,0.4)',
  },
  inputWrapperOnFocus: {
    backgroundColor: 'rgba(217,217,217,0.15)',
    borderBottomWidth: 0,
    borderRadius: 16,
  },
  textInput: {
    fontSize: 16,
    width: '100%',
    height: 54,
    fontFamily: 'Poppins_400Regular',
    color: '#98979E',
  },
});
