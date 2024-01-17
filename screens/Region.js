import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Button from "../components/Button";
import WelcomeText from "../components/SignIn/WelcomeText";
import { Actions } from "react-native-router-flux";
import baseURL from "../constants/url";
import { useLocation } from "../components/LocationContext";
import { Alert } from "react-native";
const DummyRegions = ["Chennai"];

const SelectLocation = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [deliverableLocations, setDeliverableLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState([]);
  const { updateLocation } = useLocation(); // Use the context hook

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${baseURL}/store/locations`);
        const data = await response.json();
        const deliverableLocations = data.locations.filter(
          (location) => location.DeliveryLocation_is_deliverable
        );

        setDeliverableLocations(deliverableLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleProceed = () => {
    if (!selectedRegion || !selectedLocation) {
      // Display an alert or some indication that both region and location need to be selected.
      Alert.alert("Please select both region and location");
      return;
    }
    console.log("Explore clicked:", selectedRegion, selectedLocation);
    console.log(selectedRegion);
    console.log(selectedLocation);
    console.log(selectedLocationId);

    // Update the selected location in the context
    updateLocation(selectedLocation);

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
          onValueChange={(itemValue, itemIndex) => {
            setSelectedLocation(itemValue);
            const locationId =
              deliverableLocations[itemIndex]?.DeliveryLocation_id;
            setSelectedLocationId(locationId);
          }}
          dropdownIconColor="green"
        >
          <Picker.Item
            label="Select Location"
            value=""
            color="#888888"
            style={{ height: 40 }}
          />
          {deliverableLocations.map((location, index) => (
            <Picker.Item
              key={location.DeliveryLocation_id}
              label={`${location.DeliveryLocation_area} ${location.DeliveryLocation_pincode}`}
              value={`${location.DeliveryLocation_area} ${location.DeliveryLocation_pincode}`}
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
