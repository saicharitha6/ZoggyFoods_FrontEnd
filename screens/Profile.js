import React from "react";
import { View, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../components/footer";
import ProfileOptions from "../components/Profile/ProfileOptions";
import Head from "../components/Profile/Head";
import { Actions } from "react-native-router-flux";

const mainOptions = [
  {
    title: "My Address",
    image: require("../assets/maps-and-flags.png"),
    action: () => Actions.MyAddresses(),
  },
  {
    title: "Order History",
    image: require("../assets/orders.png"),
    action: () => console.log("Order History pressed"),
  },
  {
    title: "Delivery Preference",
    image: require("../assets/delivery.png"),
    action: () => Actions.DeliveryPreference(),
  },
];

const moreOptions = [
  // {
  //   title: "Vacation mode",
  //   image: require("../assets/vacation.png"),
  //   action: () => console.log("Vacation mode pressed"),
  // },
  {
    title: "Refer & Earn",
    image: require("../assets/refer.png"),
    action: () => console.log("Refer & Earn pressed"),
  },
  {
    title: "Language",
    image: require("../assets/language.png"),
    action: () => console.log("Language pressed"),
  },
  {
    title: "Rate us",
    image: require("../assets/rate-us.png"),
    action: () => console.log("Rate us pressed"),
  },
  {
    title: "Help & Support",
    image: require("../assets/help-support.png"),
    action: () => console.log("Help & Support pressed"),
  },
  {
    title: "Legal and About us",
    image: require("../assets/legal-aboutus.png"),
    action: () => console.log("Legal and About us pressed"),
  },
];

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Head />
      <ProfileOptions moreOptions={moreOptions} mainOptions={mainOptions} />
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
});

export default Profile;
