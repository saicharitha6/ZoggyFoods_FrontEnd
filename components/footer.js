import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log("Subscriptions button pressed")}
      >
        <MaterialCommunityIcons name="calendar-sync" size={30} color="white" />
        <Text style={styles.buttonText}>Subscriptions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => Actions.Wallet()}>
        <Entypo name="wallet" size={30} color="white" />
        <Text style={styles.buttonText}>Wallet</Text>
      </TouchableOpacity>

      {/* Centered Floating Home Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => Actions.products()}
      >
        <FontAwesome5 name="store" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log("Calendar button pressed")}
      >
        <AntDesign name="calendar" size={30} color="white" />
        <Text style={styles.buttonText}>Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => Actions.orders()}>
        <FontAwesome5 name="history" size={30} color="white" />
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    backgroundColor: "darkgreen",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButton: {
    position: "relative",
    backgroundColor: "#000",
    borderRadius: 30,
    width: 60,
    height: 60,
    bottom: 15,
    // zIndex: 1, // Ensure the floating button is above other elements
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default Footer;
