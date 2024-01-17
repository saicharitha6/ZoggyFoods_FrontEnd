import { Image, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import Button from "../Button";
import Wallet from "./Wallet";
import { Actions } from "react-native-router-flux";
import baseURL from "../../constants/url";
import axios from "axios";

export default function Head() {
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [refreshProfile] = useState(false);

  const fetchUserData = async () => {
    try {
      const apiUrl = `${baseURL}/store/customers/me`;

      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        const userData = response.data.customer;
        setFirstName(userData.first_name);
        setPhone(userData.phone);
        // Set other user data as needed
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [refreshProfile]);

  const handleEditProfile = () => {
    Actions.EditProfile({
      firstName, // Pass the current first name
      phone, // Pass the current phone
      onProfileUpdate: fetchUserData, // Pass the fetchUserData function
    });
  };

  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../../assets/user.png")}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{firstName}</Text>
          <Text style={styles.number}>{phone}</Text>
          <Button
            title="Edit Profile"
            onPress={handleEditProfile}
            style={styles.editBtn}
          ></Button>
        </View>
      </View>
      <Wallet />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between", // Adjusted
    backgroundColor: "darkgreen",
    width: "100%",
  },
  profileImage: {
    width: 105,
    height: 85,
    borderRadius: 75,
    marginBottom: 16,
  },
  profileInfo: {
    gap: 4,
  },
  username: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
  },
  number: {
    color: "white",
    fontSize: 13,
    marginRight:10
  },
  editBtn: {
    borderRadius: 5,
    margin: 0,
    backgroundColor: "green",
  },
});
