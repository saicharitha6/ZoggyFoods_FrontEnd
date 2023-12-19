import React from "react";
import { StyleSheet, TextInput } from "react-native";

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
