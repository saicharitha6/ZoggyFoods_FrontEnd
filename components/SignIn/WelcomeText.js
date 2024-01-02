import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import zoggy from "../../assets/Z.png";

export default function WelcomeText() {
  return (
    <View style={styles.container}>
      <Image source={zoggy} style={styles.icon} />
      <Text style={styles.welcomeText}>Fresh..Fast..Organic Welcome!</Text>
      <Text style={styles.line}>line</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20
  },
  line: {
    width: 200,
    height: 2,
    backgroundColor: "black",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontStyle: "italic",
    padding: 20,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  icon: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});