import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import uniStockIcon from "../../assets/USIcon.png";

export default function WelcomeText() {
  return (
    <View style={styles.container}>
      <Image source={uniStockIcon} style={styles.icon} />
      <Text style={styles.welcomeText}>Welcome to UniStock :)</Text>
      <Text style={styles.line}>line</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  line: {
    width: 200,
    height: 3,
    backgroundColor: "black",
    marginVertical: 10,
    marginBottom: 30,
  },

  welcomeText: {
    fontSize: 20,
    padding: 20,
    paddingBottom: 0,
    // borderBottom: "1px solid black",
  },
  icon: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
});
