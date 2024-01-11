import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Card } from "react-native-paper";
import WelcomeText from "./WelcomeText";
import { Actions } from "react-native-router-flux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../constants/url";
import { loginSuccess } from "../../store/authActions";
import { useDispatch } from "react-redux";

const OTPVerification = ({ enteredMobileNumber }) => {
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [mobileNumber, setMobileNumber] = useState(enteredMobileNumber); // Initialize with an empty string
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setResendTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const editMobileNumber = () => {
    const newMobileNumber = prompt("Enter new mobile number:");
    if (newMobileNumber) {
      setMobileNumber(newMobileNumber);
    }
  };

  const submitOTP = async () => {
    try {
      setLoading(true);

      if (!/^\d{6}$/.test(otp)) {
        throw new Error("Invalid OTP. Please enter a 6-digit OTP.");
      }

      const verifyResponse = await axios.post(
        `${baseURL}/store/sms/verify-otp`,
        {
          sendTo: mobileNumber.trim(),
          otp: otp.trim(),
        }
      );

      if (verifyResponse.data.status) {
        console.log("verifyResponse", verifyResponse.data);
        const customerResponse = await axios.get(
          `${baseURL}/store/customers/phone/${mobileNumber}`
        );
        if (customerResponse.data.status === false) {
          console.log("customerResponse", customerResponse.data);

          const firstLaunch = await AsyncStorage.getItem("firstLaunch");
          if (firstLaunch === true) {
            Actions.Welcome();
          } else {
            Actions.CompleteYourProfile({ mobileNumber: mobileNumber });
          }
        } else {
          dispatch(loginSuccess(mobileNumber));
          await AsyncStorage.setItem(
            "loginState",
            JSON.stringify({
              isLoggedIn: true,
              mobileNumber: mobileNumber,
            })
          );

          Actions.products();
        }
      } else {
        throw new Error("Wrong OTP. Please enter the correct OTP.");
      }
    } catch (error) {
      console.error("Error submitting OTP:", error.message);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = () => {
    // Implement resend functionality here
    // For simplicity, let's reset the timer
    setResendTimer(30);
    axios({
      method: "post",
      url: `${baseURL}/store/sms/send-otp`,
      data: {
        sendTo: mobileNumber,
      },
    }).then((res) => {
      console.log(res.data);
      setOtp("");
    });
  };

  return (
    <View style={styles.container}>
      <WelcomeText />
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.heading}>OTP Verification</Text>
          <Text style={styles.text}>
            We have sent a 4-digit OTP to {mobileNumber}{" "}
            <TouchableOpacity onPress={editMobileNumber}>
              <Text style={styles.editIcon}>✎</Text>
            </TouchableOpacity>
          </Text>
          <TextInput
            style={styles.otpInput}
            placeholder="Enter OTP"
            keyboardType="numeric"
            value={otp}
            onChangeText={(text) => setOtp(text)}
          />
          <Text style={styles.resendTimer}>
            {resendTimer > 0
              ? `Resend OTP in ${resendTimer} seconds`
              : "Didn't receive OTP? "}
            {resendTimer === 0 && (
              <TouchableOpacity onPress={resendOTP}>
                <Text style={styles.editIcon}>Resend</Text>
              </TouchableOpacity>
            )}
          </Text>

          <Button title="SUBMIT" onPress={submitOTP} style={styles.button} />
          {loading && (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="small"
              color="#006400"
            />
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "#fff",
    paddingTop: 80,
    paddingBottom: "100%",
    width: "100%",
  },
  card: {
    width: 300,
    elevation: 5, // Add shadow
    borderRadius: 10, // Optional: for rounded corners
    backgroundColor: "#fff",
    marginTop: 30,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    color: "#006400",
  },
  text: {
    paddingBottom: 5,
    fontSize: 13,
    color: "gray",
  },
  otpInput: {
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    width: "100%",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  resendTimer: {
    fontSize: 14,
    color: "#006400",
    marginBottom: 10,
  },
  editIcon: {
    color: "blue",
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
  loadingIndicator: {
    marginTop: 10,
  },
});

export default OTPVerification;
