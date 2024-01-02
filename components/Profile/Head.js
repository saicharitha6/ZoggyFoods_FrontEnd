import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../Button";
import Wallet from "./Wallet";

export default function Head() {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../../assets/user.png")}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>John Doe</Text>
          <Text style={styles.number}>982358239</Text>
          <Button
            title="Edit Profile"
            onPress={() => {}}
            style={styles.editBtn}
          ></Button>
        </View>
      </View>
      <Wallet />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    // paddingRight: 0,
    // paddingEnd: 0,
    flexDirection: "row",
    justifyContent: "space-between", // Adjusted
    // alignItems: "center",
    backgroundColor: "darkgreen",
    width: "100%",
  },
  profileImage: {
    width: 105,
    height: 85,
    borderRadius: 75,
    marginBottom: 16,
  },
  profileInfo: {
    gap: 4,
  },
  username: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  number: {
    color: "white",

    fontSize: 15,
  },
  editBtn: {
    borderRadius: 5,
    margin: 0,
    backgroundColor: "green",
  },
});
