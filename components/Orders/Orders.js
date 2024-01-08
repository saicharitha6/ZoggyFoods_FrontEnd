import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { heightToDp, width, widthToDp } from "rn-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Header";
import OrderItem from "./OrderItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../constants/url";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const orders_cart_ids = await AsyncStorage.getItem("orders_cart_id");
    let orders_cartIds = JSON.parse(orders_cart_ids);
    orders_cartIds.forEach((cartId) => {
      axios.get(`${baseURL}/store/orders/cart/${cartId}`).then((res) => {
        // Set the cart state to the products in the cart
        setOrders((oldArray) => [...oldArray, ...res.data.order.items]);
      });
    });

    // ... Fetch orders logic here (previous example)
  };

  return (
    // SafeAreaView is used to avoid the notch on the phone
    <SafeAreaView style={[styles.container]}>
      {/* SchrollView is used in order to scroll the content */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Using the reusable header component */}
        <Header title="My Orders" isVisible={false} isOrder={true} />
        {/* Orders List  */}
        {orders.map((item) => (
          <OrderItem
            key={item.id}
            image={item.thumbnail}
            title={item.title}
            status={"Pending"}
            date={item.updated_at}
            quantity={item.quantity}
            price={item.original_total}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles....
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default Orders;
