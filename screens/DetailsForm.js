import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Button from "../components/Button";
import useInput from "../hooks/use-Input";
import { Actions } from "react-native-router-flux";
import Input from "../components/Input";
import axios from "axios";
import baseURL from "../constants/url";
import ErrMessage from "../components/ErrorMessage";

const DetailsForm = () => {
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const {
    value: enteredFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameIsInvalid,
    valueChangeHandler: firstNameChangeHandler,
    validateValueHandler: validateFirstNameHandler,
    focusHandler: firstNameFocusHandler,
    isFocused: firstNameIsFocused,
    reset: firstNameReset,
  } = useInput({
    validateValue: (value) => value.trim().length > 0,
  });

  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameIsInvalid,
    valueChangeHandler: lastNameChangeHandler,
    validateValueHandler: validateLastNameHandler,
    focusHandler: lastNameFocusHandler,
    isFocused: lastNameIsFocused,
    reset: lastNameReset,
  } = useInput({
    validateValue: (value) => value.trim().length > 0,
  });

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailIsInvalid,
    valueChangeHandler: emailChangeHandler,
    validateValueHandler: validateEmailHandler,
    focusHandler: emailFocusHandler,
    isFocused: emailIsFocused,
    reset: emailReset,
  } = useInput({
    validateValue: (value) => value.trim().length >= 1 && value.includes("@"),
  });

  function endMessage() {
    setErrMessage("");
  }

  const generatePassword = (firstName, lastName, email) => {
    const username = email.split("@")[1];
    const dynamicValue = Math.floor(Math.random() * 1000000);
    const uniqueString = `${firstName}${lastName}${username}${dynamicValue}`;
    return uniqueString;
  };

  const authenticationHandler = async (userData) => {
    const generatedPassword = generatePassword(
      userData.first_name,
      userData.last_name,
      userData.email
    );
    userData.password = generatedPassword;

    try {
      const response = await axios({
        method: "post",
        url: `${baseURL}/store/customers`,
        data: userData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      axios({
        method: "post",
        url: `${baseURL}/store/auth/token`,
        data: { email: userData.email, password: userData.password },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        setAccessToken(res.data.access_token);
      });

      return response;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
      firstNameReset();
      lastNameReset();
      emailReset();

      authenticationHandler({
        first_name: enteredFirstName,
        last_name: enteredLastName,
        email: enteredEmail,
      })
        .then((response) => {
          setLoading(false);
          if (response.data !== undefined) {
            Actions.Region();
          } else {
            setErrMessage("Unexpected response structure");
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log("status", err.response.data);
          if (statusCode === 422) {
            setErrMessage("Email Already Exists");
          } else if (statusCode === 400) {
            setErrMessage("Client Error");
          } else if (statusCode === 404) {
            setErrMessage("Not Found error");
          }
        });
    } else {
      setLoading(false);
      setErrMessage("Invalid Data Entered or Fill all Fields");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.ovalShape} />
        <Text style={styles.title}>Please enter below details</Text>
        <View style={{ marginHorizontal: 30 }}>
          <Input
            style={[firstNameIsFocused && !firstNameIsValid && styles.invalid]}
            placeholder="First Name"
            value={enteredFirstName}
            onChangeText={(text) => firstNameChangeHandler(text)}
            onBlur={validateFirstNameHandler}
            onFocus={firstNameFocusHandler}
            secureTextEntry={false}
          />
          <Input
            style={[lastNameIsFocused && !lastNameIsValid && styles.invalid]}
            placeholder="Last Name"
            value={enteredLastName}
            onChangeText={(text) => lastNameChangeHandler(text)}
            onBlur={validateLastNameHandler}
            onFocus={lastNameFocusHandler}
            secureTextEntry={false}
          />
          <Input
            style={[emailIsFocused && !emailIsValid && styles.invalid]}
            placeholder="Email"
            value={enteredEmail}
            onChangeText={(text) => emailChangeHandler(text)}
            onBlur={validateEmailHandler}
            onFocus={emailFocusHandler}
            secureTextEntry={false}
          />
          {loading && <ActivityIndicator size="small" color="#0000ff" />}
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={handleSubmit}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sign up</Text>
            </View>
          </TouchableOpacity>
          <ErrMessage
            type="authentication"
            text={errMessage}
            onEnd={endMessage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "relative",
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  ovalShape: {
    position: "absolute",
    top: 0,
    left: -100,
    right: -100,
    height: 150,
    borderRadius: 65,
    borderBottomEndRadius: 1000,
    borderBottomStartRadius: 1000,
    backgroundColor: "green",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 0,
    marginBottom: 30,
    alignSelf: "center",
    width: "100%",
    color: "white",
    textAlign: "center",
    padding: 10,
    borderRadius: 5,
    marginTop: 100,
  },
  touchableOpacity: {
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    marginBottom: 30,
    marginTop: 50,
    textAlign: "center",
    fontWeight: "bold",
  },
  text1: {
    fontSize: 15,
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "green",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  signUpText: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "center",
  },
  invalid: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "red",
    marginBottom: 10,
  },
});

export default DetailsForm;
