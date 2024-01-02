import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Card } from "react-native-paper";
import WelcomeText from "./WelcomeText";

const OTPVerification = ({ enteredMobileNumber }) => {
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [mobileNumber, setMobileNumber] = useState(enteredMobileNumber); // Initialize with an empty string

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

  const submitOTP = () => {
    // Perform validation (in a real scenario, send to server for validation)
    if (/^\d{4}$/.test(otp)) {
      alert("OTP Verified Successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const resendOTP = () => {
    // Implement resend functionality here
    // For simplicity, let's reset the timer
    setResendTimer(30);
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
          <View style={styles.button}>
              <Text onPress={submitOTP} style={styles.buttonText}>SUBMIT</Text>
            </View>
          {/* <Button title="Submit" onPress={submitOTP} /> */}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    position:"absolute",
    backgroundColor: "#fff",
    paddingTop:50,
    paddingBottom:"100%",
    width:"100%",
  },
  card: {
    width: 300,
    elevation: 5, // Add shadow
    borderRadius: 10, // Optional: for rounded corners
    backgroundColor: "#fff",
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
});

export default OTPVerification;
