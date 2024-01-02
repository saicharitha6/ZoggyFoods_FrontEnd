import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import ModalSelector from "react-native-modal-selector";

const EditProfile = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [familyMembers, setFamilyMembers] = useState(1);
  const [selectedOption, setSelectedOption] = useState("Search Engine");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (event, selected) => {
    setShowDatePicker(false);
  };

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
            <Image
              source={require("../assets/user.png")} /* Use your placeholder image source */
              style={styles.profileImage}
            />
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

      {/* Body Content */}
      <View style={styles.bodyContainer}>
        {/* First Name, Last Name, and Email in a single row */}
        <View style={styles.inputRow}>
          {/* First Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput style={styles.input} placeholder="Enter first name" />
          </View>

          {/* Last Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput style={styles.input} placeholder="Enter last name" />
          </View>
        </View>

        {/* Email Input */}
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email address"
            keyboardType="email-address"
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
            <TouchableOpacity
              style={styles.dateInputContainer}
              onPress={() => {
                // Show the date picker
                DatePicker.show({
                  titleText: "Select Date",
                  selectedDate,
                  onConfirm: (date) => setSelectedDate(date),
                });
              }}
            >
              <TextInput
                style={styles.dateInput}
                placeholder="DD-MM-YYYY"
                value={selectedDate ? selectedDate : ""}
                editable={false}
              />
              <Icon
                name="calendar"
                size={20}
                color="#000"
                style={styles.calendarIcon}
              />
            </TouchableOpacity>

            {/* Date Picker */}
            {selectedDate && (
              <View style={styles.datePickerContainer}>
                <Text style={styles.label}>Selected Date</Text>
                <Text>{selectedDate}</Text>
              </View>
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
          <Text style={styles.buttonText}>SUBMIT</Text>
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

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
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
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginTop: 1,
  },
  genderContainer: {
    marginTop: 20,
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
    marginBottom: 20,
  },
  dateOfBirthContainer: {
    flex: 1,
    marginRight: 10,
    marginTop:10
  },
  familyMembersContainer: {
    flex: 1,
    marginLeft: 10,
    marginTop:10
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
    padding: 10,
  },
  dateInput: {},
  calendarIcon: {
    marginLeft: 10,
  },
  datePickerText: {
    color: "#000",
    fontSize: 16,
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
