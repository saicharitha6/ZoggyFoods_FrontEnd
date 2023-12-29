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
  },

  // welcomeText: {
  //   fontSize: 20,
  //   padding: 20,
  //   paddingBottom: 0,
  //   textDecorationLine: "underline",
  //   marginBottom: 20,
  //   fontWeight: "bold",
  // },
  icon: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
});
