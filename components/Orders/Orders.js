import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Header";
import OrderItem from "./OrderItem";
import axios from "axios";
import baseURL from "../../constants/url";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  let i = 1;
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    axios.get(`${baseURL}/store/customers/me/orders`).then((res) => {
      res.data.orders.forEach(order => {
        let items = order.items;
        items = items.map(item => {
          item["status"] = "pending" != order.status ? order.status : order.fulfillment_status;
          return item;
        });
        setOrders((oldArray) => [...oldArray, ...items]);
      });
    });
  };

  return (
    // SafeAreaView is used to avoid the notch on the phone
    <SafeAreaView style={[styles.container]}>      
        {/* Using the reusable header component */}
        <Header title="My Orders" isVisible={false} isOrder={true} />
        {/* SchrollView is used in order to scroll the content */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Orders List  */}
        {orders.map((item) => {
          i++;
          return (
            <OrderItem
              key={i}
              image={item.thumbnail}
              title={item.title}
              status={item.status}
              date={item.updated_at}
              quantity={item.quantity}
              price={item.original_total}
            />
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles....
const styles = StyleSheet.create({
  container: {  
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default Orders;
