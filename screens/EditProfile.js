import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import ModalSelector from "react-native-modal-selector";
import baseURL from "../constants/url";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import { ScrollView } from "react-native-gesture-handler";

const EditProfile = ({
  firstName: initialFirstName,
  phone: initialPhone,
  onProfileUpdate,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [familyMembers, setFamilyMembers] = useState(1);
  const [selectedOption, setSelectedOption] = useState("Search Engine");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios"); // Close the picker on iOS
    setDate(currentDate);
  };

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  const formattedDate = date.toLocaleDateString(); // You can format the date as needed

  const options = [
    { key: 0, label: "Search Engine" },
    { key: 1, label: "NewsPaper" },
    { key: 2, label: "Social Media" },
    { key: 3, label: "Advertisement" },
    { key: 4, label: "Colleague" },
    { key: 5, label: "Friend" },
    { key: 6, label: "Word of Mouth" },
    { key: 7, label: "Social Activity" },
  ];

  const isValidEmail = (email) => {
    // Use a regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Check if the phone number consists of exactly 10 digits
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  useEffect(() => {
    // Fetch existing user data and set state variables
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseURL}/store/customers/me`);

        if (response.status === 200) {
          const userData = response.data.customer;
          setFirstName(userData.first_name);
          setLastName(userData.last_name);
          setEmail(userData.email);
          setPhone(userData.phone);
          // Set other user data as needed
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchUserData();
  }, []);

  const updateProfile = async () => {
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (!isValidPhoneNumber(phone)) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number");
      return;
    }
    try {
      const apiUrl = `${baseURL}/store/customers/me`; // Correct way to construct the URL

      const response = await axios.post(apiUrl, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        // gender: selectedGender,
        // Include other profile fields as needed
      });

      console.log("API Response:", response); // Log the response

      // Handle the API response
      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully");
        onProfileUpdate();
        Actions.pop();
      } else {
        Alert.alert("Error", "Failed to update profile");
      }
    } catch (error) {
      console.error("API error:", error);
      Alert.alert("Error", "An error occurred while updating profile");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Oval shape with green border radius at the bottom */}
        <View style={styles.ovalShape} />

        {/* Header content */}
        <View style={styles.headerContent}>
          {/* Profile photo in a circle */}
          <View style={styles.profileImageContainer}>
            <View style={styles.emptyCircle}>
              <Image
                source={require("../assets/user.png")}
                style={styles.profileImage}
              />
            </View>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => {
                // Add your logic for changing the profile photo
                console.log("Change profile photo");
              }}
            >
              <Icon name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView>
        {/* Body Content */}
        <View style={styles.bodyContainer}>
          {/* First Name, Last Name, and Email in a single row */}
          <View style={styles.inputRow}>
            {/* First Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter first name"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
              />
            </View>

            {/* Last Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter last name"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              />
            </View>
          </View>

          {/* Email Input */}
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          {/* Phone Input */}
          <View>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile no."
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
          </View>

          {/* Gender Selection */}
          <View style={styles.genderContainer}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderOptions}>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  selectedGender === "Male" && styles.selectedOption,
                ]}
                onPress={() => setSelectedGender("Male")}
              >
                <Image
                  source={require("../assets/male.png")}
                  style={styles.genderIcon}
                />
                <Text>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  selectedGender === "Female" && styles.selectedOption,
                ]}
                onPress={() => setSelectedGender("Female")}
              >
                <Image
                  source={require("../assets/female.png")}
                  style={styles.genderIcon}
                />
                <Text>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  selectedGender === "Others" && styles.selectedOption,
                ]}
                onPress={() => setSelectedGender("Others")}
              >
                <Image
                  source={require("../assets/other.png")}
                  style={styles.genderIcon}
                />
                <Text>Others</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rowContainer}>
            {/* Date of Birth */}
            <View style={styles.dateOfBirthContainer}>
              <Text style={styles.label}>Select Date</Text>
              <View style={styles.dateInputContainer}>
                <TextInput
                  placeholder="DD-MM-YYYY"
                  value={formattedDate}
                  editable={false}
                  style={{ color: "black" }}
                />
                <TouchableOpacity
                  onPress={showDateTimePicker}
                  style={styles.calendarIcon}
                >
                  <Icon name="calendar" size={20} color="#000" />
                </TouchableOpacity>
              </View>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>

            {/* Family Members */}
            <View style={styles.familyMembersContainer}>
              <Text style={styles.label}>Family Members</Text>
              <View style={styles.familyMembersRow}>
                <TouchableOpacity
                  style={styles.roundedButton}
                  onPress={() => setFamilyMembers(familyMembers - 1)}
                >
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.familyMembersText}>{familyMembers}</Text>
                <TouchableOpacity
                  style={styles.roundedButton}
                  onPress={() => setFamilyMembers(familyMembers + 1)}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.container1}>
            <Text style={styles.label1}>How did you find us?</Text>
            <ModalSelector
              data={options}
              initValue="Select an option"
              onChange={(option) => setSelectedOption(option.label)}
              style={styles.pickerContainer}
              optionTextStyle={{ color: "green" }}
            >
              <TextInput
                style={styles.pickerInput}
                editable={false}
                placeholder="Select an option"
                value={selectedOption}
              />
            </ModalSelector>
          </View>

          <View style={styles.button}>
            <TouchableOpacity onPress={updateProfile}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    bottom: 0,
    left: -100,
    right: -100,
    height: 200,
    borderRadius: 100,
    borderBottomEndRadius: 1000,
    borderBottomStartRadius: 1000,
    backgroundColor: "green",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Ensures the header content is above the oval shape
    paddingVertical: 30,
  },

  profileImageContainer: {
    position: "relative",
    alignItems: "center",
  },

  emptyCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },

  profileImage: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 5,
  },
  bodyContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 3,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
    paddingLeft: 3,
  },
  input: {
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
  },
  genderContainer: {
    marginTop: 10,
  },
  genderOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  genderOption: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: "#ccc",
    flexDirection: "row", // Align icon and text side by side
  },
  genderIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
    marginBottom: 5,
  },
  selectedOption: {
    backgroundColor: "green",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dateOfBirthContainer: {
    flex: 1,
    marginRight: 10,
    marginTop: 10,
  },
  familyMembersContainer: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 11,
  },
  calendarIcon: {
    marginLeft: 10,
  },

  familyMembersRow: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  roundedButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  familyMembersText: {
    fontSize: 16,
  },

  container1: {
    paddingTop: 10,
  },

  label1: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 10,
  },

  pickerInput: {
    height: 40,
    color: "#000",
    paddingHorizontal: 10,
  },

  button: {
    backgroundColor: "green",
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

export default EditProfile;
