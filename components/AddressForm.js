// AddressForm.js
import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { heightToDp } from "rn-responsive-screen";

export default function AddressForm({ onChange }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [AddressLine1, setAddressLine1] = useState("");
  const [AddressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  const handleChange = () => {
    let address = {
      first_name: firstName,
      last_name: lastName,
      address_1: AddressLine1,
      address_2: AddressLine2,
      city,
      postal_code: postalCode,
      phone,
    };
    onChange(address);
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(e) => {
          setFirstName(e);
          handleChange();
        }}
        placeholder="First Name"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setLastName(e);
          handleChange();
        }}
        placeholder="Last Name"
        style={styles.input}
      />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput
        onChangeText={(e) => {
          setAddressLine1(e);
          handleChange();
        }}
        placeholder="Address Line 1"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setAddressLine2(e);
          handleChange();
        }}
        placeholder="Address Line 2"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setCity(e);
          handleChange();
        }}
        placeholder="City"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setCountry(e);
          handleChange();
        }}
        placeholder="Country"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setPostalCode(e);
          handleChange();
        }}
        placeholder="Postal Code"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setPhone(e);
          handleChange();
        }}
        placeholder="Phone"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: heightToDp(2),
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderColor: "#E5E5E5",
    borderRadius: 5,
    marginTop: 10.2,
  },
});
