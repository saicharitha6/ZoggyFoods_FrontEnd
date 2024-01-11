import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import Header from "../Header";
import { Actions } from "react-native-router-flux";
import { heightToDp, width, widthToDp } from "rn-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";

const PaymentsOptions = ({ selectedAddress }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleProceed = () => {
    Actions.PlaceOrder({selectedAddress});
    // Add your logic to proceed with the selected payment option
  };

  return (
    <View style={styles.container}>
      <Header title="Choose payment Method" isHome={false} isVisible={false} />
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
    backgroundColor: "#C37AFF",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 7,
    margin: 10,
  },
  message: {
    fontSize: widthToDp(5),
    fontWeight: "bold",
  },
  messageContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: heightToDp(3),
  },
  button: {
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: heightToDp(3),
  },
});

export default PaymentsOptions;
