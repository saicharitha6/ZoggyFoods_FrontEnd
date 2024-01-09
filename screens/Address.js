import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
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
  const [shippingAddresses, setShippingAddresses] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddressInputChange = (address) => {
    setSelectedAddress(address);
  };

  const placeOrder = async () => {
    try {
      let cart_id = await AsyncStorage.getItem("cart_id");
      if (selectedAddress) {
        // Use the selectedAddress directly for placing the order
        console.log("Selected Address:", selectedAddress);
        Actions.payments(); // Replace this with your actual navigation logic
      } else {
        // If no address is selected, you can show an error or prompt the user to select an address.
        console.error("Please select a shipping address.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      console.error("Detailed error response:", error.response);
    }
  };

  const addAddressAndProceed = async () => {
    try {
      if (!selectedAddress) {
        console.error("Please fill in the address details.");
        Alert.alert("Add Details");
        return;
      }

      const newAddressResponse = await axios.post(
        `${baseURL}/store/customers/me/addresses`,
        {
          address: {
            ...selectedAddress,
          },
        }
      );

      if (newAddressResponse.status === 200) {
        // Set the newly added address as the selected address
        setSelectedAddress(newAddressResponse.data.address);

        // Navigate to the payments screen
        Actions.payments();
      } else {
        console.error(
          "Failed to add address. Unexpected status code:",
          newAddressResponse.status
        );
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const fetchShippingAddresses = async () => {
    try {
      const response = await axios.get(`${baseURL}/store/customers/me`);

      if (response.status === 200) {
        setShippingAddresses(response.data.customer.shipping_addresses);
        // If addresses are found, set the first one as the selectedAddress
        if (response.data.customer.shipping_addresses.length > 0) {
          setSelectedAddress(response.data.customer.shipping_addresses[0]);
        }
      } else {
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error fetching shipping addresses:", error);
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
    fetchShippingAddresses();
    fetchShippingOptions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header title="Add Address" isVisible={true} />
        <View style={styles.address}>
          {shippingAddresses.length === 0 && (
            <AddressForm
              onSubmit={handleAddressInputChange}
              initialAddress={selectedAddress}
            />
          )}
        </View>

        <View style={styles.shipping}>
          {shippingAddresses.length > 0 ? (
            <>
              <Text style={styles.title}>Select Shipping Address:</Text>
              {shippingAddresses.map((address) => (
                <TouchableOpacity
                  key={address.id}
                  style={[
                    styles.shippingOption,
                    selectedAddress && selectedAddress.id === address.id
                      ? styles.selectedOption
                      : null,
                  ]}
                  onPress={() => setSelectedAddress(address)}
                >
                  <Text>Address: {address.address_1}</Text>
                  <Text>City: {address.city}</Text>
                  <Text>
                    postal Code :{" "}
                    {`${address.country_code}, ${address.postal_code}`}
                  </Text>
                </TouchableOpacity>
              ))}
              <Text style={styles.belowText}>
                After Address Added Proceed to Payment!!!
              </Text>
              <Button onPress={placeOrder} large title="Proceed to Payment" />
            </>
          ) : (
            <View>
              <Text style={styles.belowText}>
                After Address Added Proceed to Payment!!!
              </Text>
              <TouchableOpacity
                style={styles.addAddressButton}
                onPress={addAddressAndProceed}
              >
                <Text
                  style={styles.addAddressButtonText}
                  onPress={addAddressAndProceed}
                >
                  Proceed to Payment
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
    paddingTop: 10,
    fontWeight: "bold",
  },
  shippingOption: {
    marginTop: heightToDp(2),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: "lightyellow",
  },
  addAddressButton: {
    marginTop: heightToDp(2),
    backgroundColor: "green",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  addAddressButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  belowText: {
    marginTop: 10,
    fontStyle: "italic",
    fontWeight: "300",
    color: "red",
  },
});

export default Address;
