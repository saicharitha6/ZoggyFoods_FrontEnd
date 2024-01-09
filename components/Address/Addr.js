import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import Header from "../Header";
import Button from "../Button";
import AddressForm from "../AddressForm";
import baseURL from "../../constants/url";
import { Actions } from "react-native-router-flux";

const Addr = ({ isEdit, addressId }) => {
  const [shippingAddress, setShippingAddress] = useState({});
  const [loading, setLoading] = useState(true);

  const handleAddressInputChange = (address) => {
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      ...address,
    }));
  };

  const AddOrEditAddress = async () => {
    try {
      if (isEdit) {
        const response = await axios.post(
          `${baseURL}/store/customers/me/addresses/${addressId}`,
          {
            address: {
              ...shippingAddress,
            },
          }
        );

        if (response.status === 200) {
          Actions.MyAddresses();
        } else {
          console.error(
            "Failed to update address. Unexpected status code:",
            response.status
          );
        }
      } else {
        const addressResponse = await axios.post(
          `${baseURL}/store/customers/me/addresses`,
          {
            address: {
              ...shippingAddress,
            },
          }
        );

        if (addressResponse.status === 200) {
          Actions.MyAddresses();
        } else {
          console.error(
            "Failed to add address. Unexpected status code:",
            addressResponse.status
          );
        }
      }
    } catch (error) {
      console.error("Error placing order:", error);
      console.error("Detailed error response:", error.response);
    }
  };

  const fetchAddress = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseURL}/store/customers/me/addresses/${addressId}`
      );

      if (response.status === 200) {
        setShippingAddress(response.data.address);
      } else {
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      if (error.response && error.response.status === 404) {
        console.error("Address not found. Handle this case appropriately.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEdit && addressId) {
      fetchAddress();
    } else {
      setLoading(false);
    }
  }, [isEdit, addressId]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          title={isEdit ? "Edit Address" : "Add Address"}
          isVisible={true}
        />
        <View style={styles.address}>
          <Text style={styles.title}>Please fill in the details</Text>
          {Object.keys(shippingAddress).length >= 0 && (
            <AddressForm
              onChange={handleAddressInputChange}
              initialAddress={shippingAddress}
            />
          )}
        </View>

        <View style={styles.shipping}>
          <Button
            onPress={AddOrEditAddress}
            large
            title={isEdit ? "Edit Address" : "Add Address"}
          />
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
    marginHorizontal: 20,
  },
  shipping: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    paddingTop: 10,
  },
  shippingOption: {
    marginTop: 10,
  },
});

export default Addr;
