import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Button from "../Button";
import useInput from "../../hooks/use-Input";
import { Actions } from "react-native-router-flux";
import Input from "../Input";
import axios from "axios";
import baseURL from "../../constants/url";
import ErrMessage from "../ErrorMessage";
import { Ionicons } from "@expo/vector-icons";

const SignUpForm = () => {
  const [errMessage, setErrMessage] = useState("");
  const [passwordErrorVisible, setPasswordErrorVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordIsInvalid,
    valueChangeHandler: passwordChangeHandler,
    validateValueHandler: validatePasswordHandler,
    focusHandler: passwordFocusHandler,
    isFocused: passwordIsFocused,
    reset: passwordReset,
  } = useInput({
    validateValue: (value) =>
      value.trim().length >= 6 &&
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]+$/.test(
        value
      ),
    // Password-specific validation
  });

  function endMessage() {
    setErrMessage("");
  }

  const authenticationHandler = async (userData) => {
    return axios({
      method: "post",
      url: `${baseURL}/store/customers`,
      data: userData,
      headers: {
        "Content-Type": "application/json",
        // 'Accept':"*/*"
      },
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (
      firstNameIsValid &&
      lastNameIsValid &&
      emailIsValid &&
      passwordIsValid
    ) {
      // Proceed with user registration
      firstNameReset();
      lastNameReset();
      emailReset();
      passwordReset();

      authenticationHandler({
        first_name: enteredFirstName,
        last_name: enteredLastName,
        email: enteredEmail,
        password: enteredPassword,
      })
        .then((response) => {
          setLoading(false);
          if (response.data !== undefined) {
            Actions.SignIn();
          } else {
            setErrMessage("Unexpected response structure");
          }
        })
        .catch((err) => {
          setLoading(false);
          const statusCode = err.response.status;
          console.log("status", statusCode);
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
    <View style={styles.containerScroll}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => Actions.pop()}
          style={{ position: "absolute", top: 50, left: 0 }}
        >
          <Ionicons
            style={styles.icon}
            name="arrow-back-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.text}>Quick Sign-Up</Text>
        <TouchableOpacity style={styles.customButton}>
          <Image
            source={require("../../assets/googl.png")}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Sign up with Google</Text>
        </TouchableOpacity>
        <Text style={styles.text1}>Or use your email address</Text>
        <Input
          style={[firstNameIsFocused && !firstNameIsValid && styles.invalid]}
          placeholder="First Name"
          keyboardType="First-name"
          value={enteredFirstName}
          onChangeText={(text) => firstNameChangeHandler(text)}
          onBlur={validateFirstNameHandler}
          onFocus={firstNameFocusHandler}
          secureTextEntry={false}
        />
        <Input
          style={[lastNameIsFocused && !lastNameIsValid && styles.invalid]}
          placeholder="Last Name"
          keyboardType="last-name"
          value={enteredLastName}
          onChangeText={(text) => lastNameChangeHandler(text)}
          onBlur={validateLastNameHandler}
          onFocus={lastNameFocusHandler}
          secureTextEntry={false}
        />
        <Input
          style={[emailIsFocused && !emailIsValid && styles.invalid]}
          placeholder="Email"
          keyboardType="email-address"
          value={enteredEmail}
          onChangeText={(text) => emailChangeHandler(text)}
          onBlur={validateEmailHandler}
          onFocus={emailFocusHandler}
          secureTextEntry={false}
        />
        <Input
          style={[passwordIsFocused && !passwordIsValid && styles.invalid]}
          placeholder="Password"
          secureTextEntry
          value={enteredPassword}
          onChangeText={(text) => passwordChangeHandler(text)}
          onBlur={() => {
            validatePasswordHandler();
            setPasswordErrorVisible(true);
          }}
          onFocus={() => {
            passwordFocusHandler();
            setPasswordErrorVisible(false);
          }}
        />
        {passwordIsFocused && !passwordIsValid && (
          <Text style={styles.error}>
            Use at least one capital letter, one symbol, one numeric, and ten
            characters
          </Text>
        )}

        {loading && <ActivityIndicator size="small" color="#0000ff" />}
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={handleSubmit}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.signUpText}>
          <Text>Already have an account? </Text>
          <Text style={styles.link} onPress={() => Actions.SignIn()}>
            Sign In
          </Text>
        </View>
        <ErrMessage
          style={styles.signUpText}
          type="authentication"
          text={errMessage}
          onEnd={endMessage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    width: "90%",
    height: "100%",
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  customButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
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
  error: {
    color: "red",
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    // Add any styles needed for the red blinking effect
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 7,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  signUpText: {
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "flex-end",
  },
  link: {
    // marginTop: 20,
    color: "#007bff",
    textDecorationLine: "underline",
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

export default SignUpForm;
