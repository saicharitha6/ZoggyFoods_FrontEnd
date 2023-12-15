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
import { Feather, Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../constants/url";
import axios from "axios";

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
    console.log("View Orders");
    setIsDropdownVisible(false);
  };
  return (
    <View style={styles.container}>
      {isHome ? (
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://user-images.githubusercontent.com/7554214/153162406-bf8fd16f-aa98-4604-b87b-e13ab4baf604.png",
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>{title}</Text>
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
            <View style={styles.addToCart}>
              <Text style={styles.cart_count}>{count > 0 ? count : ""}</Text>
              <Feather
                name="shopping-cart"
                size={24}
                color="white"
                onPress={() => Actions.cart()}
              />
            </View>
            <View style={styles.topBar}>
              <TouchableWithoutFeedback onPress={toggleDropdown}>
                <Feather name="user" size={24} color="white" />
              </TouchableWithoutFeedback>
              <Modal
                transparent={true}
                visible={isDropdownVisible}
                onRequestClose={() => setIsDropdownVisible(false)}
              >
                <TouchableWithoutFeedback
                  onPress={() => setIsDropdownVisible(false)}
                >
                  <View style={styles.overlay} />
                </TouchableWithoutFeedback>
                <View style={styles.dropdown}>
                  {/* <TouchableOpacity onPress={handleCart}>
                  <Text style={styles.dropdownElements}>View Cart</Text>
                </TouchableOpacity> */}
                  <TouchableOpacity onPress={handleOrders}>
                    <Text style={styles.dropdownElements}>View Orders</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.dropdownElements}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
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
    backgroundColor: "#C37AFF",
    alignItems: "center",
    alignContent: "space-between",
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
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  cart_count: {
    fontSize: 20,
    color: "white",
    fontWeight: "800",
    height: 50,
  },
  logo: {
    width: 50,
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

  topBar: {
    flexDirection: "row",
    // position: "absolute",
    // top: 10,
    // right: 10,
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
});
