import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { heightToDp, width, widthToDp } from "rn-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../Header';
import OrderItem from './OrderItem';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from '../../constants/url';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const orders_cart_ids = await AsyncStorage.getItem("orders_cart_id");
    let orders_cartIds = JSON.parse(orders_cart_ids);
    orders_cartIds.forEach(cartId => {
      axios.get(`${baseURL}/store/orders/cart/${cartId}`).then((res) => {
        // Set the cart state to the products in the cart
        setOrders(oldArray => [...oldArray, ...res.data.order.items]);
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
        <Header title="My Orders" isVisible={false} />
        <Text style={styles.header}>Your Orders!!</Text> 
             {/* Orders List  */}
             {orders.map((item)=>(
                <OrderItem 
                image={item.thumbnail}
                title={item.title}
                status={"Ordered at"}
                date={item.updated_at}/>
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
    containerList: {
        // flex: 1,
        backgroundColor: "#fff",
        marginTop: 20,
        flexDirection: "row",
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderColor: "#e6e6e6",
        width: widthToDp("90%"),
      },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: widthToDp(90),
      marginTop: 10,
    },
    cartTotalText: {
      fontSize: widthToDp(4.5),
      color: "#989899",
    },
    header:{
        color: "#000000", fontSize: 28, textAlign: "left"
    },
    title: {
        fontSize: widthToDp(4),
        fontWeight: "bold",
      },
      status: {
        fontSize: widthToDp(3.5),
        color: "#8e8e93",
        marginTop: heightToDp(2),
        paddingLeft:7
      },
      image: {
        width: widthToDp(30),
        height: heightToDp(30),
        borderRadius: 10,
      },      
  info: {
    marginLeft: widthToDp(3),
    marginVertical: heightToDp(2),
    width: widthToDp(50),
  },
  });

export default Orders;
