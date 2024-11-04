import { AppStyles } from '@/AppStyles';
import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface IProps extends TextInputProps {
  fontAwesomeIcon?: string | undefined;
  error?: string;
}

export const Input = ({ fontAwesomeIcon, error, ...props }: IProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <View
        style={[styles.inputWrapper, isFocused && styles.inputWrapperOnFocus]}
      >
        {fontAwesomeIcon && (
          <FontAwesome6
            name={fontAwesomeIcon}
            size={24}
            color={AppStyles.colors.textSecondary}
          />
        )}

        <TextInput
          placeholderTextColor={AppStyles.colors.textSecondary}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingHorizontal: 24,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderRadius: 6,
    borderBottomColor: AppStyles.colors.backgroundSecondary,
  },
  inputWrapperOnFocus: {
    backgroundColor: AppStyles.colors.backgroundSecondary,
    borderBottomWidth: 0,
    borderRadius: 12,
  },
  textInput: {
    fontSize: 16,
    width: '85%',
    height: 54,
    fontFamily: 'Poppins_400Regular',
    color: AppStyles.colors.textSecondary,
  },
  errorMessage: {
    color: AppStyles.colors.red,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    marginLeft: 14,
  },
});
