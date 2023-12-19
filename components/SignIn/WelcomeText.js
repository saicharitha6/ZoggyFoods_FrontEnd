import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import zoggy from "../../assets/zoggy.png";

export default function WelcomeText() {
  return (
    <View style={styles.container}>
      <Image source={zoggy} style={styles.icon} />
      {/* <Text style={styles.welcomeText}>Welcome to UniStock :)</Text> */}
      {/* <Text style={styles.line}>line</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  line: {
    width: 200,
    height: 2,
    backgroundColor: "black",
    marginBottom: 15,
  },

  welcomeText: {
    fontSize: 20,
    padding: 20,
    paddingBottom: 0,
    // borderBottom: "1px solid black",
  },
  icon: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});
