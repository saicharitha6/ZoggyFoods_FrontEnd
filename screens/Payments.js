import { StyleSheet, View } from "react-native";
import PaymentsOptions from "../components/Payments/PaymentsOption";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payments() {
  return (
    <SafeAreaView style={styles.container}>
      <PaymentsOptions />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
