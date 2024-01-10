import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
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
        // Use optional chaining to safely access nested property
        const addresses = response?.data?.customer?.shipping_addresses ?? [];
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
        onPress={() => Actions.EditAddress({ address: address })}
      >
        <View style={styles.addressInfo}>
          {/* Update the styles for the specific title and value */}
          <Text style={styles.addressTitle}>{`Address`}</Text>
          <Text style={styles.addressValue}>{`${address.address_1}`}</Text>

          <Text style={styles.addressTitle}>{`Country Code`}</Text>
          <Text style={styles.addressValue}>{`${address.country_code}`}</Text>

          <Text style={styles.addressTitle}>{`City`}</Text>
          <Text style={styles.addressValue}>{`${address.city}`}</Text>

          <Text style={styles.addressTitle}>{`Postal Code`}</Text>
          <Text style={styles.addressValue}>{`${address.postal_code}`}</Text>

          {/* <Text style={styles.addressTitle}>{`Province:`}</Text>
          <Text style={styles.addressValue}>{`${address.province}`}</Text> */}
        </View>

        <TouchableOpacity
          onPress={() => Actions.EditAddress({ address: address })}
          style={styles.editIcon}
        >
          <Icon name="pencil-outline" size={23} color="#333" margin={15} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteAddress(address.id)}
          style={styles.deleteIcon}
        >
          <Icon name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </TouchableOpacity>
    ));
  };

  const handleAddAddress = async (newAddress) => {
    try {
      // Check if the new address already exists
      const exists = shippingAddresses.some(
        (address) =>
          address.country_code === newAddress.country_code &&
          address.address_1 === newAddress.address_1 &&
          address.phone === newAddress.phone &&
          address.city === newAddress.city &&
          address.postal_code === newAddress.postal_code
      );

      if (exists) {
        Alert.alert("Address already exists");
        // Show an error message or take appropriate action
      } else {
        // Make the POST request to add the new address
        const response = await axios.post(
          `${baseURL}/store/customers/me/addresses`,
          {
            address: {
              ...newAddress,
            },
          }
        );

        if (response.status === 200) {
          // Address added successfully
          setShippingAddresses((prevAddresses) => [
            ...prevAddresses,
            response.data.address,
          ]);
        } else {
          // Log unexpected status code
          console.error(
            "Failed to add address. Unexpected status code:",
            response.status
          );
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

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(
        `${baseURL}/store/customers/me/addresses/${addressId}`
      );

      if (response.status === 200) {
        // Successfully deleted the address
        setShippingAddresses((prevAddresses) =>
          prevAddresses.filter((address) => address.id !== addressId)
        );
        // Alert("Deleted Successfully");
      } else {
        console.error(
          "Failed to delete address. Unexpected status code:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error deleting address:", error);
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
          onPress={() =>
            Actions.AddEditAddress({ isEdit: false, onAddAddress: handleAddAddress })
          }
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
    flexDirection: "row", // Set the flexDirection to row
    justifyContent: "space-between",
    alignItems: "center", // Center items vertically
  },

  // Address lines with specific styling
  addressTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    marginRight: 10, // Add margin between title and value
  },
  addressValue: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "normal",
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
    fontWeight: "bold", // Set default font weight to bold
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
