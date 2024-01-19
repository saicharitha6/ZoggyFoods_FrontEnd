import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import useInput from "../hooks/use-Input";
import { Actions } from "react-native-router-flux";
import Input from "../components/Input";
import ErrMessage from "../components/ErrorMessage";
import { MaterialIcons } from "@expo/vector-icons";

const CompleteYourProfile = ({ mobileNumber, isNumberAvailable }) => {
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const [accessToken, setAccessToken] = useState("");
  // const [password, setPassword] = useState("");
  // const dispatch = useDispatch();

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
  const handleNext = async () => {
    setLoading(true);
    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
      firstNameReset();
      lastNameReset();
      emailReset();
      const userDetails = {
        first_name: enteredFirstName,
        last_name: enteredLastName,
        email: enteredEmail,
        phone: mobileNumber,
      };
      Actions.Region({ isNumberAvailable, userDetails });
    } else {
      setLoading(false);
      setErrMessage("Invalid Data Entered or Fill all Fields");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.ovalShape} />
        <Text style={styles.title}>Please Complete your profile</Text>
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
            onPress={handleNext}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
              <MaterialIcons name="navigate-next" size={24} color="black" />
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
    marginRight: 0.5,
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
    flexDirection: "row",
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

export default CompleteYourProfile;
