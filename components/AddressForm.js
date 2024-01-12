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

  // Error state for each field
  const [errors, setErrors] = useState({
    address_1: "",
    city: "",
    country_code: "",
    postalCode: "",
    phone: "",
  });

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

  const isNumeric = (value) => /^\d+$/.test(value);

  const validateFields = () => {

    if (!addressLine1.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address_1: "Address Line 1 is required",
      }));
      return false;
    }

    if (!city.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        city: "City is required",
      }));
      return false;
    }
    // Validate country_code
    const validCountryCodes = ["IN", "US"];
    if (!validCountryCodes.includes(country_code.toUpperCase())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        country_code: "Please enter a valid country code (IN or US)",
      }));
      return false;
    }

    // Validate postalCode (pincode)
    if (!isNumeric(postalCode)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        postalCode: "Please enter a numeric postal code",
      }));
      return false;
    }

     // Validate phone number length
     if (phone.length !== 10 || !isNumeric(phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a 10-digit numeric phone number",
      }));
      return false;
    }

    // Reset error messages
    setErrors({
      address_1: "",
      city: "",
      country_code: "",
      postalCode: "",
      phone: "",
    });

    return true;
  };

  const submitHandler = () => {
    if (!validateFields()) {
      // Stop execution if validation fails
      Alert.alert("Validation Error", "Please check the form for errors.");
      return;
    }

    // All fields are filled and numeric, proceed with form submission
    let address = {
      first_name: firstName,
      last_name: lastName,
      address_1: addressLine1,
      city: city,
      country_code: country_code.toUpperCase(),
      postal_code: postalCode,
      phone: phone,
      company: company,
      province: province,
    };

    onSubmit(address);
    Alert.alert("Added Address");
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
     {errors.address_1 ? (
        <Text style={styles.error}>{errors.address_1}</Text>
      ) : null}
      <TextInput
        value={city}
        onChangeText={(e) => {
          setCity(e);
        }}
        placeholder="City"
        style={styles.input}
      />
      {errors.city ? <Text style={styles.error}>{errors.city}</Text> : null}
      <TextInput
        value={country_code}
        onChangeText={(e) => {
          setCountry_code(e);
        }}
        placeholder="Country Code"
        style={styles.input}
      />
      {errors.country_code ? (
        <Text style={styles.error}>{errors.country_code}</Text>
      ) : null}
      <TextInput
        value={postalCode}
        onChangeText={(e) => {
          setPostalCode(e);
        }}
        placeholder="Postal Code"
        keyboardType="numeric"
        style={styles.input}
      />
      {errors.postalCode ? (
        <Text style={styles.error}>{errors.postalCode}</Text>
      ) : null}
      <TextInput
        value={phone}
        onChangeText={(e) => {
          setPhone(e);
        }}
        placeholder="Phone"
        keyboardType="numeric"
        style={styles.input}
      />
      {errors.phone ? <Text style={styles.error}>{errors.phone}</Text> : null}
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
  error: {
    color: "red",
    marginTop: 5,
  },
});
