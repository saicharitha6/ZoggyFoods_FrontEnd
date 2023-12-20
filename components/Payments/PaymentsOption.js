import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Header from "../Header";

const PaymentsOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleProceed = () => {
    console.log("Proceeding with payment:", selectedOption);
    // Add your logic to proceed with the selected payment option
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Select your Payments Method</Text>

      <TouchableOpacity
        style={[
          styles.paymentOption,
          selectedOption === "CashOnDelivery" && styles.selectedOption,
        ]}
        onPress={() => setSelectedOption("CashOnDelivery")}
        disabled={selectedOption === "CashOnDelivery"}
      >
        <Text
          style={[
            styles.optionText,
            selectedOption === "CashOnDelivery" && styles.selectedOptionsText,
          ]}
        >
          Cash on Delivery
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.proceedButton}
        onPress={handleProceed}
        disabled={!selectedOption}
      >
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paymentOption: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  selectedOption: {
    backgroundColor: "grey",
  },
  optionText: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  selectedOptionsText: {
    color: "white",
  },
  proceedButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PaymentsOptions;
