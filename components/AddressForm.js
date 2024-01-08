import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { heightToDp } from "rn-responsive-screen";

export default function AddressForm({ onChange }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  // const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [country_code, setCountry_code] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [province, setProvince] = useState("");

  const handleChange = () => {
    let address = {
      first_name: firstName,
      last_name: lastName,
      address_1: addressLine1,
      // address_2: addressLine2,
      city: city,
      country_code: country_code,
      postal_code: postalCode,
      phone: phone,
      company: company,
      province: province,
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
          setCity(e);
          handleChange();
        }}
        placeholder="City"
        style={styles.input}
      />
      
      <TextInput
        onChangeText={(e) => {
          setCountry_code(e);
          handleChange();
        }}
        placeholder="Country Code"
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
      <TextInput
        onChangeText={(e) => {
          setCompany(e);
          handleChange();
        }}
        placeholder="Company"
        style={styles.input}
      />
      <TextInput
        onChangeText={(e) => {
          setProvince(e);
          handleChange();
        }}
        placeholder="Province"
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