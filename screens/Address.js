import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { heightToDp, widthToDp } from "rn-responsive-screen";
import Header from "../components/Header";
import Button from "../components/Button";
import AddressForm from "../components/AddressForm";
import RadioButton from "../components/RadioButton";

import baseURL from "../constants/url";

const Address = ({ cart }) => {
  const [shippingAddress, setShippingAddress] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState("");

  const handleAddressInputChange = (address) => {
    setShippingAddress(address);
  };

  const placeOrder = async () => {
    try {
      let cart_id = await AsyncStorage.getItem("cart_id");

      const response = await axios.post(
        `${baseURL}/store/customers/me/addresses`,
        {
          address: {
            ...shippingAddress,
            company: "Wyman LLC", // Add your company value here
            province: "Georgia", // Add your province value here
            country_code: "US", // Add your country code here
          },
        }
      );

      if (response.status === 200) {
        console.log("Address added successfully");
        // Optionally, you can proceed to add shipping methods or other actions
      } else {
        console.error(
          "Failed to add address. Unexpected status code:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error adding address:", error);
      console.error("Detailed error response:", error.response);
    }
  };

  const fetchShippingOptions = async () => {
    try {
      let cartId = await AsyncStorage.getItem("cart_id");
      const response = await axios.get(
        `${baseURL}/store/shipping-options/${cartId}`
      );

      if (response.status === 200) {
        setShippingOptions(response.data.shipping_options);
      } else {
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error fetching shipping options:", error);
    }
  };

  useEffect(() => {
    fetchShippingOptions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header title="Checkout" isVisible={false} />
        <View style={styles.address}>
          <Text style={styles.title}>Shipping Address</Text>
          <AddressForm onChange={handleAddressInputChange} />
        </View>

        <View style={styles.shipping}>
          <Text style={styles.title}>Shipping Options</Text>
          {shippingOptions.map((option) => (
            <View style={styles.shippingOption} key={option.id}>
              <RadioButton
                onPress={() => setSelectedShippingOption(option.id)}
                selected={selectedShippingOption === option.id}
                children={option.name}
              />
            </View>
          ))}
          <Button onPress={placeOrder} large title="Add Address" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  address: {
    marginHorizontal: widthToDp(5),
  },
  shipping: {
    marginHorizontal: widthToDp(5),
  },
  title: {
    fontSize: widthToDp(4.5),
  },
  shippingOption: {
    marginTop: heightToDp(2),
  },
});

export default Address;
