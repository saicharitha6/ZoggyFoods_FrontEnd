import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import Header from "../Header";
import AddressForm from "../AddressForm";
import baseURL from "../../constants/url";
import { Actions } from "react-native-router-flux";

const Addr = ({ isEdit, address }) => {
  const handleAddressInputChange = (updatedAddress) => {
    AddOrEditAddress(updatedAddress);
  };
  const AddOrEditAddress = async (addressData) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (isEdit) {
        const response = await axios.post(
          `${baseURL}/store/customers/me/addresses/${address.id}`,
          addressData,
          { headers }
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
            address: { ...addressData },
          },
          { headers }
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          title={isEdit ? "Edit Address" : "Add Address"}
          isVisible={true}
        />
        <View style={styles.address}>
          <Text style={styles.title}>Please fill in the details</Text>
          <AddressForm
            onSubmit={handleAddressInputChange}
            initialAddress={address}
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
});

export default Addr;
