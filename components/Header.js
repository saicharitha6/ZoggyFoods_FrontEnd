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
import { useLocation } from "../components/LocationContext";
import user from "../assets/user.png";
import { useSelector } from "react-redux";

export default function Header({
  title,
  isHome = false,
  isVisible = true,
  isOrder = false,
  count = 0,
}) {
  const auth = useSelector((state) => state?.auth);
  const currentUser = auth?.currentUser ?? null;

  return (
    <View style={styles.container}>
      {isHome ? (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => Actions.profile()}>
            <Image source={user} style={styles.logo} />
          </TouchableOpacity>
          <View style={styles.user}>
            <Text style={styles.title}>Hi {currentUser?.first_name ?? Guest}</Text>
            <View style={styles.location}>
              <EvilIcons
                name="location"
                size={23}
                paddingTop={3}
                color="white"
              />
              <Text style={styles.title}>{selectedLocation}</Text>
            </View>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => Actions.pop()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="white" />
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      )}
      <View style={styles.sideBar}>
        {isVisible ? (
          <>
            {/* <View>
              <EvilIcons
                name="search"
                size={35}
                color="white"
                onPress={() => Actions.search()}
              />
            </View> */}
            <View style={styles.addCart}>
              <Feather
                name="shopping-cart"
                size={24}
                color="white"
                onPress={() => Actions.cart()}
              />
              {count > 0 && (
                <View style={styles.cart_count_container}>
                  <Text style={styles.cart_count}>{count}</Text>
                </View>
              )}
            </View>
            <View style={styles.notify}>
              <Ionicons name="notifications" size={24} color="white" />
            </View>
          </>
        ) : (
          <View></View>
        )}
        {isOrder ? (
          <>
            <View style={styles.addToCart}></View>
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
    backgroundColor: "darkgreen",
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
    width: widthToDp(45),
  },
  title: {
    fontSize: 13,
    fontWeight: "400",
    color: "white",
  },
  addCart: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginRight: 15,
  },
  cart_count_container: {
    position: "absolute",
    top: -16, // Adjust this value to fine-tune the vertical position
    right: -15, // Adjust this value to fine-tune the horizontal position
    backgroundColor: "red",
    borderRadius: 50, // Use a large value to make it circular
    padding: 3,
  },
  cart_count: {
    fontSize: 14,
    color: "white",
    fontWeight: "800",
    textAlign: "center",
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

  notify: {
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
  user: {
    flexDirection: "column"
  },
  location: {
    flexDirection: "row",
  },
  myOrder: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: widthToDp(110),
  },
});
