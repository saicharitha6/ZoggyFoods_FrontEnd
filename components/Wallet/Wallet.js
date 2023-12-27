import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Button from "../Button";
import { Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";

const Wallet = () => {
  const [originalWalletAmount, setOriginalWalletAmount] = useState(2000);
  const [walletAmount, setWalletAmount] = useState(originalWalletAmount);
  const [selectedAmount, setSelectedAmount] = useState("");

  const handleSelectAmount = (amount) => {
    const amountToDeduct = parseInt(amount, 10);
    setWalletAmount(originalWalletAmount - amountToDeduct);
    setSelectedAmount(amount.toString());
  };

  const handleAddMoney = () => {
    // Confirm the addition and update the original wallet amount
    setOriginalWalletAmount(walletAmount);
    // Add any additional logic here if needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Wallet</Text>
      <TouchableOpacity
        onPress={() => Actions.pop()}
        style={{ position: "absolute", top: 50, left: 0 }}
      >
        <Ionicons
          style={styles.icon}
          name="arrow-back-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.card1}>
          <Text style={styles.walletText}> Wallet Amount</Text>
          <Text style={styles.amountText}>{`₹${walletAmount}`}</Text>
        </View>
        <Text style={styles.addMoney}>Add Money</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount in Rupees"
          value={selectedAmount}
          onChangeText={(text) => setSelectedAmount(text)}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSelectAmount(500)}
          >
            <Text style={styles.buttonText}>500</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSelectAmount(1000)}
          >
            <Text style={styles.buttonText}>1000</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSelectAmount(1500)}
          >
            <Text style={styles.buttonText}>1500</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centeredButtonContainer}>
          <Button
            style={styles.button1}
            title={"ADD"}
            onPress={handleAddMoney}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
    padding: 20,
    width: "100%",
  },
  card: {
    backgroundColor: "darkgreen",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  card1: {
    backgroundColor: "yellow",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  walletText: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    marginTop:20,
  },
  addMoney: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  amountText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  centeredButtonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  button1: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "green",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 20,
    backgroundColor:"#fff"
  },
  icon: {
    marginLeft: 10,
  },
});

export default Wallet;
