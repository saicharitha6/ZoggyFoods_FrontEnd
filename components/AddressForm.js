import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { heightToDp } from "rn-responsive-screen";
import Button from "./Button";

export default function AddressForm({ onSubmit, initialAddress }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [country_code, setCountry_code] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [province, setProvince] = useState("");
  
  useEffect(() => {
    if (initialAddress) {
      setFirstName(initialAddress.first_name || "");
      setLastName(initialAddress.last_name || "");
      setAddressLine1(initialAddress.address_1 || "");
      setCity(initialAddress.city || "");
      setCountry_code(initialAddress.country_code || "");
      setPostalCode(initialAddress.postal_code || "");
      setPhone(initialAddress.phone || "");
      setCompany(initialAddress.company || "");
      setProvince(initialAddress.province || "");
    }
  }, [initialAddress]);

  const submitHandler = () => {
    let address = {
      first_name: firstName,
      last_name: lastName,
      address_1: addressLine1,
      city: city,
      country_code: country_code,
      postal_code: postalCode,
      phone: phone,
      company: company,
      province: province,
    };
    onSubmit(address);
    // Actions.pop();
    Alert.alert("Added Address")
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={firstName}
        onChangeText={(e) => {
          setFirstName(e);
        }}
        placeholder="First Name"
        style={styles.input}
      />
      <TextInput
        value={lastName}
        onChangeText={(e) => {
          setLastName(e);
        }}
        placeholder="Last Name"
        style={styles.input}
      />
      <TextInput
        value={addressLine1}
        onChangeText={(e) => {
          setAddressLine1(e);
        }}
        placeholder="Address Line 1"
        style={styles.input}
      />
      <TextInput
        value={city}
        onChangeText={(e) => {
          setCity(e);
        }}
        placeholder="City"
        style={styles.input}
      />
      <TextInput
        value={country_code}
        onChangeText={(e) => {
          setCountry_code(e);
        }}
        placeholder="Country Code"
        style={styles.input}
      />
      <TextInput
        value={postalCode}
        onChangeText={(e) => {
          setPostalCode(e);
        }}
        placeholder="Postal Code"
        style={styles.input}
      />
      <TextInput
        value={phone}
        onChangeText={(e) => {
          setPhone(e);
        }}
        placeholder="Phone"
        style={styles.input}
      />
      <TextInput
        value={company}
        onChangeText={(e) => {
          setCompany(e);
        }}
        placeholder="Company"
        style={styles.input}
      />
      <TextInput
        value={province}
        onChangeText={(e) => {
          setProvince(e);
        }}
        placeholder="Province"
        style={styles.input}
      />
      <View style={styles.shipping}>
        <Button
          onPress={submitHandler}
          large
          title={
            initialAddress && initialAddress.id !== undefined
              ? "Edit Address"
              : "Add Address"
          }
        />
      </View>
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
