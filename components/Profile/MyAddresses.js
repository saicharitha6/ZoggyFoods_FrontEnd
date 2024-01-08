import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import baseURL from "../../constants/url";

const MyAddresses = () => {
  const [shippingAddresses, setShippingAddresses] = useState([]);

  useEffect(() => {
    // Make the GET request to your API endpoint
    axios
      .get(`${baseURL}/store/customers/me`)
      .then((response) => {
        // Extract shipping_addresses array from the response
        const addresses = response.data.customer.shipping_addresses;
        setShippingAddresses(addresses);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to run the effect only once

  const renderAddresses = () => {
    return shippingAddresses.map((address, index) => (
      <TouchableOpacity
        key={index}
        style={styles.addressCard}
        onPress={() => console.log(`Address pressed: ${address.address_1}`)}
      >
        <View style={styles.addressInfo}>
          <Text
            style={styles.addressLine}
          >{`Address: ${address.address_1}`}</Text>
          <Text
            style={styles.addressLine}
          >{`Country Code: ${address.country_code}`}</Text>
          <Text style={styles.addressLine}>{`City: ${address.city}`}</Text>
          <Text
            style={styles.addressLine}
          >{`Postal Code: ${address.postal_code}`}</Text>
          <Text
            style={styles.addressLine}
          >{`Province: ${address.province}`}</Text>
        </View>

        {/* Edit icon */}
        <TouchableOpacity
          onPress={() =>
            console.log(`Edit Address pressed: ${address.address_1}`)
          }
          style={styles.editIcon}
        >
          <Icon name="pencil-outline" size={24} color="#333" />
        </TouchableOpacity>
      </TouchableOpacity>
    ));
  };

  const handleAddAddress = async (newAddress) => {
  try {
    // Check if the new address already exists
    const exists = shippingAddresses.some(
      (address) =>
        address.address_1 === newAddress.address_1 &&
        address.phone === newAddress.phone &&
        address.city === newAddress.city &&
        address.postal_code === newAddress.postal_code
    );

    if (exists) {
      console.log("Address already exists");
      // Show an error message or take appropriate action
    } else {
      // Make the POST request to add the new address
      const response = await axios.post(`${baseURL}/store/customers/me/addresses`, {
        address: {
          ...newAddress,
        },
      });

      if (response.status === 200) {
        // Address added successfully
        console.log("Address added successfully:", response.data);
        setShippingAddresses((prevAddresses) => [...prevAddresses, response.data.address]);
      } else {
        // Log unexpected status code
        console.error("Failed to add address. Unexpected status code:", response.status);
        // Log detailed error response
        console.error("Detailed error response:", response.data);
        // Show an error message or take appropriate action
      }
    }
  } catch (error) {
    // Log and handle the error
    console.error("Error adding address:", error);
    // Log detailed error response if available
    if (error.response) {
      console.error("Detailed error response:", error.response.data);
    }
    // Show an error message or take appropriate action
  }
};


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Address</Text>
        </View>
        <View style={styles.addressList}>{renderAddresses()}</View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => Actions.address({ onAddAddress: handleAddAddress })}
        >
          <Text style={styles.addButtonText}>Add Address</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    backgroundColor: "darkgreen",
    paddingTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  addressList: {
    flex: 1,
    marginBottom: 20,
  },
  addressCard: {
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 3,
    marginBottom: 10,
    padding: 15,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Center items vertically
  },
  addressInfo: {
    flex: 1, // Take the available space
  },
  editIcon: {
    alignSelf: "center", // Center the edit icon vertically
  },
  addressLine: {
    fontSize: 16,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: "green",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    margin: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MyAddresses;
