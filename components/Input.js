import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TextInputProps,
} from "react-native";
import React from "react";

// interface InputProps extends TextInputProps {
//   onFocus?: () => void;
//   onBlur?: () => void;
//   secureTextEntry?: boolean;
//   keyboardType?: KeyboardTypeOptions;
// }
export default function Input({
  onFocus,
  style,
  placeholder,
  keyboardType,
  value,
  onBlur,
  onChangeText,
  secureTextEntry,
}) {
  return (
    <TextInput
      onFocus={onFocus}
      style={[styles.container, style]}
      onBlur={onBlur}
      placeholder={placeholder}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
});
