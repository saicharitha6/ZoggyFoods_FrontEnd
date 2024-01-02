import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const mainOptions = [
  {
    title: "My Address",
    image: require("../../assets/maps-and-flags.png"),
    action: () => console.log("My Address pressed"),
  },
  {
    title: "Order History",
    image: require("../../assets/orders.png"),
    action: () => console.log("Order History pressed"),
  },
  {
    title: "Delivery Preference",
    image: require("../../assets/delivery.png"),
    action: () => console.log("Delivery Preference pressed"),
  },
];

const moreOptions = [
  {
    title: "Vacation mode",
    image: require("../../assets/vacation.png"),
    action: () => console.log("Vacation mode pressed"),
  },
  {
    title: "Refer & Earn",
    image: require("../../assets/refer.png"),
    action: () => console.log("Refer & Earn pressed"),
  },
  {
    title: "Language",
    image: require("../../assets/language.png"),
    action: () => console.log("Language pressed"),
  },
  {
    title: "Rate us",
    image: require("../../assets/rate-us.png"),
    action: () => console.log("Rate us pressed"),
  },
  {
    title: "Help & Support",
    image: require("../../assets/help-support.png"),
    action: () => console.log("Help & Support pressed"),
  },
  {
    title: "Legal and About us",
    image: require("../../assets/legal-aboutus.png"),
    action: () => console.log("Legal and About us pressed"),
  },
];

const ProfileOptions = () => {
  const renderOptions = (options, isLastList) => {
    return options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.optionContainer,
          isLastList && index === options.length - 1
            ? styles.lastOption
            : styles.borderBottom,
        ]}
        onPress={option.action}
      >
        <Image source={option.image} style={styles.image} />
        <Text style={styles.title}>{option.title}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.options}>{renderOptions(mainOptions)}</View>

      <View style={styles.options}>{renderOptions(moreOptions)}</View>
      <View style={styles.options}>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => console.log("Logout")}
        >
          <Image
            source={require("../../assets/logout.png")}
            style={styles.image}
          />
          <Text style={styles.title}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
  },

  options: {
    margin: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 7,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5, // Add marginBottom to create space between options
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: "#ccc", // Adjust the color of the border as needed
  },
  lastOption: {
    marginBottom: 0, // Remove marginBottom for the last option to eliminate extra space
    borderBottomWidth: 0, // Remove borderBottom for the last option
  },
});

export default ProfileOptions;
