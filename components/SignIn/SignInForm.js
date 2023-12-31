import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Button from "../Button";
import useInput from "../../hooks/use-Input";
import WelcomeText from "./WelcomeText";
import Input from "../Input";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import baseURL from "../../constants/url";
import ErrMessage from "../ErrorMessage";

const SignInForm = () => {
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    value: enteredPhoneNumber,
    isValid: PhoneNumberIsValid,
    hasError: PhoneNumberIsInvalid,
    valueChangeHandler: PhoneNumberChangeHandler,
    validateValueHandler: validatePhoneNumberHandler,
    focusHandler: PhoneNumberFocusHandler,
    isFocused: PhoneNumberIsFocused,
    reset: PhoneNumberReset,
  } = useInput({
    validateValue: (value) => value.trim().length === 10 && /^\d+$/.test(value),
  });

  const handleSubmit = async () => {
    // Validate the phone number
    validatePhoneNumberHandler();

    if (!PhoneNumberIsValid) {
      setErrMessage(
        "Invalid phone number. Please enter a valid 10-digit number."
      );
      return;
    }
    Actions.OTPVerification();
    try {
      setLoading(true);
      const response = await axios.post(`${baseURL}/send-otp`, {
        phoneNumber: enteredPhoneNumber,
      });
      console.log(response.data);
    } catch (error) {
      setErrMessage("Error sending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  function endMessage() {
    setErrMessage("");
  }

  return (
    <View style={styles.container}>
      <WelcomeText />
      <View style={styles.card}>
        <View style={{ alignSelf: "flex-start" }}>
          <Text style={styles.title}>Log in or Sign Up</Text>
        </View>

        <Input
          style={[
            PhoneNumberIsFocused && !PhoneNumberIsValid && styles.invalid,
          ]}
          placeholder="Mobile Number"
          keyboardType="numeric"
          value={enteredPhoneNumber}
          onChangeText={(text) => PhoneNumberChangeHandler(text)}
          onBlur={validatePhoneNumberHandler}
          onFocus={PhoneNumberFocusHandler}
          secureTextEntry={false}
        />

        <View style={styles.buttonContainer}>
          {loading && <ActivityIndicator size="small" color="#0000ff" />}

          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={handleSubmit}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Get OTP</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.skip}>Skip </Text>

        <View>
          <Text style={styles.text}>
            By signing in, you indicate that you have read and agree to our{" "}
            <TouchableOpacity
              onPress={() => Linking.openURL("https://your-terms-url")}
            >
              <Text style={styles.linkText}>Terms of Services</Text>
            </TouchableOpacity>{" "}
            and{" "}
            <TouchableOpacity
              onPress={() => Linking.openURL("https://your-privacy-url")}
            >
              <Text style={styles.linkText}>Privacy Policy</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
      <ErrMessage type="authentication" text={errMessage} onEnd={endMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  card: {
    width: "90%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "green",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  touchableOpacity: {
    flex: 1,
  },
  skip: {
    marginVertical: 20,
    textAlign: "center",
    color: "green",
  },
  invalid: {
    borderColor: "red",
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  linkText: {
    color: "green",
    textDecorationLine: "none",
  },
  text: {
    color: "#000",
    textAlign: "center",
  },
});

export default SignInForm;
