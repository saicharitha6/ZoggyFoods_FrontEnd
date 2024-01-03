// Import necessary React Native components
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";

const WelcomeScreen = () => {
  // Function to handle the button press and navigate to the next screen
  const handleGetStarted = () => {
    // Navigate to the next screen (replace 'Home' with the actual screen name)
    Actions.OTPVerification();
  };

  return (
    <View style={styles.container}>
      {/* App logo or welcome image */}
      <Image source={require("../assets/Z.png")} style={styles.logo} />

      {/* Welcome message */}
      <Text style={styles.welcomeText}>Welcome to Instant Idly</Text>

      {/* Description or tagline */}
      <Text style={styles.descriptionText}>
        Your one-stop solution for delicious and instant food!
      </Text>

      {/* Get Started button */}
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Customize the background color
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    color: "#666666", // Customize the text color
  },
  button: {
    backgroundColor: "#42a5f5", // Customize the button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff", // Customize the button text color
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
