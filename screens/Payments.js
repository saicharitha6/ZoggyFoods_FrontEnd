import { StyleSheet, View } from "react-native";
import PaymentsOptions from "../components/Payments/PaymentsOption";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payments({selectedAddress}) {
  return (
    <SafeAreaView style={styles.container}>
      <PaymentsOptions selectedAddress={selectedAddress}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
