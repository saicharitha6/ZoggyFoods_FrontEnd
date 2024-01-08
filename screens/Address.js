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

import baseURL from "../constants/url";
import { Actions } from "react-native-router-flux";

const Address = ({ cart }) => {
  const [shippingAddress, setShippingAddress] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);

  const handleAddressInputChange = (address) => {
    setShippingAddress(address);
  };

  const placeOrder = async () => {
    try {
      let cart_id = await AsyncStorage.getItem("cart_id");

      const addressResponse = await axios.post(
        `${baseURL}/store/customers/me/addresses`,
        {
          address: {
            ...shippingAddress,
            company: "Wyman LLC",
            province: "Georgia",
            country_code: "US",
          },
        }
      );

      if (addressResponse.status === 200) {
        const firstShippingOption = shippingOptions[0];

        if (firstShippingOption) {
          const shippingResponse = await axios.post(
            `${baseURL}/store/carts/${cart_id}/shipping-methods`,
            {
              option_id: firstShippingOption.id,
            }
          );

          if (shippingResponse.status === 200) {
            Actions.payments();
          } else {
            console.error(
              "Failed to add shipping method. Unexpected status code:",
              shippingResponse.status
            );
          }
        } else {
          console.error("No shipping options available.");
        }
      } else {
        console.error(
          "Failed to add address. Unexpected status code:",
          addressResponse.status
        );
      }
    } catch (error) {
      console.error("Error placing order:", error);
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
        <Header title="Add Address" isVisible={false} />
        <View style={styles.address}>
          <Text style={styles.title}>Please fill in the details</Text>
          <AddressForm onChange={handleAddressInputChange} />
        </View>

        <View style={styles.shipping}>
          {shippingOptions.map((option) => (
            <View style={styles.shippingOption} key={option.id}></View>
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
    fontSize: widthToDp(4.0),
    paddingTop: 10,
  },
  shippingOption: {
    marginTop: heightToDp(2),
  },
});

export default Address;