import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Button from "../components/Button";
import WelcomeText from "../components/SignIn/WelcomeText";
import { Actions } from "react-native-router-flux";

const DummyRegions = ["Region 1", "Region 2", "Region 3"];
const DummyLocations = ["Location 1", "Location 2", "Location 3"];

const SelectLocation = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleProceed = () => {
    console.log("Explore clicked:", selectedRegion, selectedLocation);
    setSelectedLocation("");
    setSelectedRegion("");
    Actions.products();
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

      <Button
        onPress={handleProceed}
        title="Proceed"
        large={true}
        style={styles.proceedButton}
      />

      <TouchableOpacity onPress={handleLocationNotFound}>
        <Text style={styles.link}>Could not find your location?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginText}>
        <Text>Existing user? </Text>
        <Text style={styles.link} onPress={() => Actions.SignIn()}>
          LOGIN
        </Text>
      </TouchableOpacity>
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
