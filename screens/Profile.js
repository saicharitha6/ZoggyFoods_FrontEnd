import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Button from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../components/footer";
import { Actions } from "react-native-router-flux";
import { Entypo } from "@expo/vector-icons";
import Wallet from "../components/Profile/Wallet";
import ProfileOptions from "../components/Profile/ProfileOptions";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../assets/user.png")}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.username}>John Doe</Text>
            <Text style={styles.number}>982358239</Text>
            <Button
              title="Edit Profile"
              onPress={() => {}}
              style={styles.editBtn}
            ></Button>
          </View>
        </View>
        <Wallet />
      </View>
      <ProfileOptions />
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingVertical: 20,
    // paddingRight: 0,
    // paddingEnd: 0,
    flexDirection: "row",
    justifyContent: "space-between", // Adjusted
    // alignItems: "center",
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
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  number: {
    color: "white",

    fontSize: 15,
  },
  editBtn: {
    borderRadius: 5,
    margin: 0,
    backgroundColor: "green",
  },
});

export default Profile;
