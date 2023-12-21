import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import baseURL from "../constants/url";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightToDp, widthToDp } from "rn-responsive-screen";
import Button from "../components/Button";
import AddressForm from "../components/AddressForm"; // Changed import here
import RadioButton from "../components/RadioButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Actions } from "react-native-router-flux";

export default function Address({ cart }) {
  // Changed component name here
  const [shippingAddress, setShippingAddress] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState("");
  const [paymentSession, setPaymentSession] = useState({});

  const handleAddressInputChange = (address) => {
    setShippingAddress(address);
  };

  const placeOrder = async () => {
    let cart_id = await AsyncStorage.getItem("cart_id");

    axios
      .post(`${baseURL}/store/carts/${cart_id}`, {
        shipping_address: shippingAddress,
      })
      .then(({ data }) => {
        axios
          .post(`${baseURL}/store/carts/${cart_id}/shipping-methods`, {
            option_id: selectedShippingOption,
          })
          .then(({ data }) => {
            console.log("success");
          });
      });
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
          <Button onPress={placeOrder} large title="Place Order" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
