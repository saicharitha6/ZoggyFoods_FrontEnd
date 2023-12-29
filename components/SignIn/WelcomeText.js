import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import zoggy from "../../assets/zoggy.png";

export default function WelcomeText() {
  return (
    <View style={styles.container}>
      <Image source={zoggy} style={styles.icon} />
      <Text style={styles.welcomeText}>Fresh...Fast...Organic.Welcome!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  welcomeText: {
    fontSize: 20,
    padding: 20,
    paddingBottom: 0,
    textDecorationLine: "underline",
    marginBottom: 35,
    fontWeight: "bold",
  },
  icon: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});
