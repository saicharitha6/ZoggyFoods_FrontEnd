import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { logout } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const ProfileOptions = ({ moreOptions, mainOptions }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const access_token = auth?.access_token;

  const logoutHandler = async () => {
    dispatch(logout(access_token));
    await AsyncStorage.setItem(
      "loginState",
      JSON.stringify({
        isLoggedIn: false,
        mobileNumber: null,
      })
    );
    Actions.SignIn();
  };

  const renderOptions = (options) => {
    return options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.optionContainer,
          index === options.length - 1
            ? styles.lastOption
            : styles.borderBottom,
        ]}
        onPress={option.action}
      >
        <View style={{ flexDirection: "row" }}>
          <Image source={option.image} style={styles.image} />
          <Text style={styles.title}>{option.title}</Text>
        </View>
        <View style={{ alignSelf: "flex-end" }}>
          <Image
            source={require("../../assets/right-arrow.png")}
            style={styles.arrowImage}
          ></Image>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.options}>{renderOptions(mainOptions)}</View>

      <View style={styles.options}>{renderOptions(moreOptions)}</View>
      <View style={styles.options}>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={logoutHandler}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../assets/logout.png")}
              style={styles.image}
            />
            <Text style={styles.title}>Logout</Text>
          </View>
          <View style={{ alignSelf: "flex-end" }}>
            <Image
              source={require("../../assets/right-arrow.png")}
              style={styles.arrowImage}
            ></Image>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
  },

  options: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    gap: 10,
    // shadowColor: "#ccc",
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.5,
    // shadowRadius: 10,
    // elevation: 7,
  },
  optionContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 5,
  },
  borderBottom: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  lastOption: {
    marginBottom: 0,
    borderBottomWidth: 0,
  },
  arrowImage: {
    width: 20,
    height: 20,
  },
});

export default ProfileOptions;
