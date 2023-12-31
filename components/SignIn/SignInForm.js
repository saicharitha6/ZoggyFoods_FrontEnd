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
    validateValue: (value) => {
      const trimmedValue = value.trim();
      return (
        trimmedValue.length === 10 &&
        /^\d+$/.test(trimmedValue) &&
        /^[6789]/.test(trimmedValue)
      );
    },
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
    Actions.OTPVerification({ enteredMobileNumber: enteredPhoneNumber });
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
            PhoneNumberIsFocused &&
              (!PhoneNumberIsValid || PhoneNumberIsInvalid) &&
              styles.invalid,
          ]}
          placeholder="Mobile Number"
          keyboardType="numeric"
          value={enteredPhoneNumber}
          onChangeText={(text) => PhoneNumberChangeHandler(text)}
          onBlur={validatePhoneNumberHandler}
          onFocus={PhoneNumberFocusHandler}
          secureTextEntry={false}
        />

        {PhoneNumberIsInvalid && (
          <Text style={styles.errorText}>
            10 digit Mobile Number start with 6, 7, 8, or 9.
          </Text>
        )}

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

        <View style={styles.termsPrivacyContainer}>
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
      <ErrMessage style={styles.error} type="authentication" text={errMessage} onEnd={endMessage} />
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
    color: "#006400",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "gray",
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
    color: "#006400",
  },
  invalid: {
    borderColor: "red",
  },
  linkText: {
    color: "#006400",
    textDecorationLine: "none",
  },
  text: {
    color: "#000",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  termsPrivacyContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row', // or 'column' for vertical alignment
},
error: {
  alignItems: "flex-end",
  alignContent: "flex-end",
  paddingBottom: 0,
  alignSelf: "flex-end", // Align the error component itself to the end
  marginTop: "auto",
}
});

export default SignInForm;
