import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import logo from "../../assets/instantIdly.png";

export default function WelcomeText() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.icon} />
      {/* <Text style={styles.welcomeText}>Fresh...Fast...Organic.Welcome!</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  icon: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
});
