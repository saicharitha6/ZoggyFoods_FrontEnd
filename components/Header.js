import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { widthToDp } from "rn-responsive-screen";
import { Feather, Ionicons, EvilIcons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../constants/url";
import axios from "axios";
import user from "../assets/user.png";

export default function Header({
  title,
  isHome = false,
  isVisible = true,
  count = 0,
}) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    axios.delete(`${baseURL}/store/auth`).then((res) => {
      Actions.SignIn();
    });
    setIsDropdownVisible(false);
  };

  // const handleCart = () => {
  //   Actions.cart();
  //   setIsDropdownVisible(false);
  // };

  const handleOrders = () => {
    // Implement your logic to navigate to orders screen
    setIsDropdownVisible(false);
  };
  return (
    <View style={styles.container}>
      {isHome ? (
        <View style={styles.header}>
          <Image source={user} style={styles.logo} />
          <View style={styles.user}>
            <Text style={styles.title}>Hi Guest</Text>
            <View style={styles.location}>
              <EvilIcons name="location" size={24} color="white" />
              <Text style={styles.title}>Malda, West Bengal</Text>
            </View>
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={() => Actions.pop()}>
          <Ionicons
            style={styles.icon}
            name="arrow-back-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      )}
      <View style={styles.sideBar}>
        {isVisible ? (
          <>
            <View>
              <EvilIcons name="search" size={35} color="white" />
            </View>
            <View style={styles.addToCart}>
              <Text style={styles.cart_count}>{count > 0 ? count : ""}</Text>
              <Feather
                name="shopping-cart"
                size={24}
                color="white"
                onPress={() => Actions.cart()}
              />
            </View>
            <View style={styles.notify}>
              <Ionicons name="notifications" size={24} color="white" />
            </View>
          </>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: widthToDp(100),
    height: widthToDp(20),
    backgroundColor: "#00b33c",
    alignItems: "center",
    // paddingHorizontal: widthToDp(2),
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: widthToDp(50),
    // marginBottom: 3,
  },
  title: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
  },
  cart_count: {
    fontSize: 20,
    color: "white",
    fontWeight: "800",
    height: 50,
  },
  logo: {
    width: 70,
    height: 50,
  },

  addToCart: {
    flexDirection: "row-reverse",
    // position: "absolute",
    // bottom: 10,
    // right: 100,
    width: widthToDp(12),
    height: widthToDp(12),
    alignItems: "center",
    padding: widthToDp(1),
    justifyContent: "center",
  },
  icon: {
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  sideBar: {
    width: widthToDp(50),
    position: "absolute",
    right: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 5,
  },

  notify: {
    flexDirection: "row",
  },
  overlay: {
    flex: 1,
    // backgroundColor: "rgba(0,0,0,0.5)",
  },
  dropdown: {
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: "#fff",
    // padding: 10,
    // paddingLeft: 0,
    borderRadius: 5,
    elevation: 5,
  },
  dropdownElements: {
    borderBottomWidth: 1, // Add a bottom border
    borderBottomColor: "#DCDCDC",
    padding: 10,
    // paddingLeft: 5,
    textAlign: "center",
  },
  user: {
    flexDirection: "column",
  },
  location: {
    flexDirection: "row",
  },
});
