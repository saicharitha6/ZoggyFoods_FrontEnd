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
import zoggy from "../assets/zoggy.png";

export default function Header({
  title,
  isHome = false,
  isVisible = true,
  isOrder = false,
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

  const handleOrders = () => {
    // Implement your logic to navigate to orders screen
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      {isHome ? (
        <View style={styles.header}>
          <Image source={zoggy} style={styles.logo} />
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => Actions.pop()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
          <Text style={styles.title}>{title}</Text>
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
                  <TouchableOpacity onPress={() => Actions.orders()}>
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
         {isOrder ? (
          <>
            <View style={styles.addToCart}>
              <Text style={styles.myOrder}>My Order</Text>
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
    backgroundColor: "#e67300",
    alignItems: "center",
    height: 60,
    paddingHorizontal: widthToDp(2),
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: widthToDp(50),
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10,
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
    width: widthToDp(12),
    height: widthToDp(12),
    alignItems: "center",
    padding: widthToDp(1),
    justifyContent: "center",
  },
  icon: {
    color: "#ffffff",
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
  },
  overlay: {
    flex: 1,
  },
  dropdown: {
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 5,
  },
  dropdownElements: {
    borderBottomWidth: 1,
    borderBottomColor: "#DCDCDC",
    padding: 10,
    textAlign: "center",
  },
  myOrder: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight:"bold",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: widthToDp(110),
  },
});
