import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Button from "../components/Button";
import WelcomeText from "../components/SignIn/WelcomeText";
import { Actions } from "react-native-router-flux";
import PasswordGenerator from "../utils/passwordGenerator";
import CryptoService from "../utils/crypto";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../constants/url";

const DummyRegions = ["Region 1", "Region 2", "Region 3"];
const DummyLocations = ["Location 1", "Location 2", "Location 3"];

const SelectLocation = ({ isNumberAvailable, userDetails }) => {
  const { first_name, last_name, email, phone } = userDetails;
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const authenticationHandler = async () => {
    const password = PasswordGenerator.generatePassword(
      `${first_name} ${last_name}`,
      email
    );
    // store password user credential in async storage
    // encrypt userCredentials
    const encryptPassword = await CryptoService.encryptMessage(password, phone);
    // setPassword(encryptPassword);
    await AsyncStorage.setItem(
      "currentUser",
      JSON.stringify({ email, password: encryptPassword })
    );

    try {
      if (!isNumberAvailable) {
        //new user
        const { data } = await axios({
          method: "post",
          url: `${baseURL}/store/customers`,
          data: { ...userDetails, password },
          headers: {
            "Content-Type": "application/json",
          },
        });
        return { data, encryptPassword };
      } else {
        // add number into customer account
      }
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  };
  const handleProceed = async () => {
    console.log("Explore clicked:", selectedRegion, selectedLocation);
    setSelectedLocation("");
    setSelectedRegion("");
    try {
      setLoading(true);
      const {
        data: { customer },
        encryptPassword,
      } = await authenticationHandler();
      if (customer) {
        const decryptPassword = await CryptoService.decryptMessage(
          encryptPassword,
          phone
        );
        dispatch(login(phone, email, decryptPassword));
        await AsyncStorage.setItem(
          "loginState",
          JSON.stringify({
            isLoggedIn: true,
            mobileNumber: phone,
          })
        );
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    // Actions.products();
  };

  const handleLocationNotFound = () => {
    console.log("Location not found");
  };

  return (
    <View style={styles.container}>
      <WelcomeText />
      <Text style={styles.title}>Select your location</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.dropdown}
          selectedValue={selectedRegion}
          onValueChange={(itemValue) => setSelectedRegion(itemValue)}
          dropdownIconColor="green"
        >
          <Picker.Item label="Select Region" value="" color="#888888" />
          {DummyRegions.map((region, index) => (
            <Picker.Item
              key={index}
              label={region}
              value={region}
              color="#000000"
            />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          style={styles.dropdown}
          selectedValue={selectedLocation}
          onValueChange={(itemValue) => setSelectedLocation(itemValue)}
          dropdownIconColor="green"
        >
          <Picker.Item
            label="Select Location"
            value=""
            color="#888888"
            style={{ height: 40 }}
          />
          {DummyLocations.map((location, index) => (
            <Picker.Item
              key={index}
              label={location}
              value={location}
              color="#000000"
              style={{ height: 40 }}
            />
          ))}
        </Picker>
      </View>
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      <Button
        onPress={handleProceed}
        title="Proceed"
        large={true}
        style={styles.proceedButton}
      />

      <TouchableOpacity onPress={handleLocationNotFound}>
        <Text style={styles.link}>Could not find your location?</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.loginText}>
        <Text>Existing user? </Text>
        <Text style={styles.link} onPress={() => Actions.SignIn()}>
          LOGIN
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 40,
    backgroundColor: "white",
  },
  logo: {
    width: 70,
    height: 50,
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#bcbcbc",
    borderRadius: 5,
    marginBottom: 20,
    padding: 1,
    shadowColor: "#bcbcbc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
  },
  dropdown: {
    width: "100%",
    backgroundColor: "white",
    padding: 0,
    borderWidth: 1,
    borderColor: "#bcbcbc",
  },

  proceedButton: {
    borderRadius: 5,
    marginBottom: 30,
  },
  exploreButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  loginText: {
    flexDirection: "row",
    margin: 30,
    justifyContent: "center",
  },
});

export default SelectLocation;
