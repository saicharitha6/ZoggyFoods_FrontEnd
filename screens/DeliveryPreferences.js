import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const DeliveryPreferences = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOptionChange = async (option) => {
    setSelectedOption(option);
    setErrorMessage(""); // Clear error message when an option is chosen
    // Store the selected option in AsyncStorage
    await AsyncStorage.setItem("selectedDeliveryOption", option);
  };

  const handleSubmit = async () => {
    // Check if a delivery option is chosen
    if (selectedOption === "") {
      setErrorMessage("Please choose a delivery option.");
      return;
    }

    // Show the success message for 3 seconds
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      setShowMessage(false);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => Actions.pop()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Preferences</Text>
      </View>

      <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryTitle}>Delivery Instructions</Text>

        <View style={styles.deliveryOptions}>
          <View style={styles.deliveryOption}>
            <View style={styles.optionContent}>
              <Icon name="ios-home" size={24} color="black" />
              <Text>Ring Door Bell</Text>
            </View>
            <RadioButton
              value="Ring Door Bell"
              status={
                selectedOption === "Ring Door Bell" ? "checked" : "unchecked"
              }
              onPress={() => handleOptionChange("Ring Door Bell")}
              color="green"
            />
          </View>

          <View style={styles.borderLine} />

          <View style={styles.deliveryOption}>
            <View style={styles.optionContent}>
              <Icon name="ios-archive" size={24} color="black" />
              <Text>Drop at the Door</Text>
            </View>
            <RadioButton
              value="Drop At Door"
              status={
                selectedOption === "Drop At Door" ? "checked" : "unchecked"
              }
              onPress={() => handleOptionChange("Drop At Door")}
              color="green"
            />
          </View>

          <View style={styles.borderLine} />

          <View style={styles.deliveryOption}>
            <View style={styles.optionContent}>
              <MaterialCommunityIcons
                name="hand-back-right"
                size={24}
                color="black"
              />
              <Text>In Hand Delivery</Text>
            </View>
            <RadioButton
              value="In Hand Delivery"
              status={
                selectedOption === "In Hand Delivery" ? "checked" : "unchecked"
              }
              onPress={() => handleOptionChange("In Hand Delivery")}
              color="green"
            />
          </View>

          <View style={styles.borderLine} />

          <View style={styles.deliveryOption}>
            <View style={styles.optionContent}>
              <MaterialCommunityIcons
                name="bag-personal"
                size={24}
                color="black"
              />
              <Text>Keep in Bag</Text>
            </View>
            <RadioButton
              value="keep In Bag"
              status={
                selectedOption === "keep In Bag" ? "checked" : "unchecked"
              }
              onPress={() => handleOptionChange("keep In Bag")}
              color="green"
            />
          </View>

          <View style={styles.borderLine} />

          <View style={styles.deliveryOption}>
            <View style={styles.optionContent}>
              <MaterialCommunityIcons name="help" size={24} color="black" />
              <Text>No Preference</Text>
            </View>
            <RadioButton
              value="No Preference"
              status={
                selectedOption === "No Preference" ? "checked" : "unchecked"
              }
              onPress={() => handleOptionChange("No Preference")}
              color="green"
            />
          </View>
        </View>
        <View style={styles.additional}>
          <Text>Additional Instructions(optional)</Text>
        </View>
        <Text style={styles.text}>
          Disclaimer - This is help us to deliver faster.
        </Text>
      </View>

      {/* Display error message */}
      {errorMessage !== "" && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessageText}>{errorMessage}</Text>
        </View>
      )}
      <TouchableOpacity onPress={handleSubmit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </View>
      </TouchableOpacity>

      {/* Conditional rendering of the message */}
      {showMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Delivery Preference Saved</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "darkgreen",
    paddingTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  deliveryContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  deliveryTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "left",
  },
  deliveryOptions: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  deliveryOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 10,
  },
  additional: {
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
  },
  text: {
    paddingTop: 10,
  },
  button: {
    backgroundColor: "darkgreen",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    width: "90%",
    margin: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  messageContainer: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10, // Adjust the spacing from the top if needed
  },
  messageText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMessageContainer: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  errorMessageText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DeliveryPreferences;
