import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Wallet() {
  return (
    <TouchableOpacity style={styles.wallet} onPress={() => Actions.Wallet()}>
      <View style={styles.walletHead}>
        <Entypo name="wallet" size={30} color="white" />
        <Text style={styles.buttonText}> My Wallet</Text>
      </View>
      <View>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          ₹ 50
        </Text>
        <Text style={{ color: "white", marginLeft: 10 }}>
          Available balance
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wallet: {
    backgroundColor: "green",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 5,
    paddingVertical: 5,
    gap: 3,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  walletHead: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    marginLeft: 5,
  },
});
