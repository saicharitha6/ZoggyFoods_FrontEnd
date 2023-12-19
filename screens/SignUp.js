import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import SignUpForm from "../components/SignUp/SignUpForm";

const SignUp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SignUpForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default SignUp;