import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { Actions } from "react-native-router-flux";
  import baseURL from "../constants/url";
  import { Ionicons, Feather } from "@expo/vector-icons";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  export default function CartBanner({reloadCartBanner}) {
    const [cart, setCart] = useState([]);
    const [quantity,setQuantity] = useState(0);
    const [reload, setReload] = useState(reloadCartBanner);
    if(reload != reloadCartBanner){
      setReload(reloadCartBanner);
    }
    const fetchCart = async () => {
        // Get the cart id from the device storage
        const cartId = await AsyncStorage.getItem("cart_id");  
        // Fetch the products from the cart API using the cart id
        axios.get(`${baseURL}/store/carts/${cartId}`).then(({ data }) => {
          // Set the cart state to the products in the cart
          setCart(data.cart);       
          })
    };

  const calculateTotal = () => {
  const itemTotal = cart?.total / 100;
  const discountTotal = cart?.discount_total / 100;
  const total = itemTotal - discountTotal;
  return total.toFixed(2);
};
    
 const totalItemQuantity = () =>{
    let totalQuantity = 0;
    cart?.items?.map((item)=>{   
      let productQuantity = item.quantity;
      totalQuantity = totalQuantity+productQuantity;            
    });
    setQuantity(totalQuantity);
 };
      useEffect(() => {
        // Calling the fetchCart function when the component mounts
        fetchCart();       
      }, [reload]);

      useEffect(()=>{
        totalItemQuantity();
      }, [cart]);
  
    return (
        <View style={styles.cartBannerContainer}>
            <View style={styles.cartIconContainer}>
                <View>
                <Feather
                name="shopping-cart"
                size={32}
                color="white"
              />
                </View>
                <View>
                <Text style={styles.cartDescription}>₹  {calculateTotal()}+ Other Charges</Text>
                <Text style={styles.cartDescription}>{quantity} item(s) in bag</Text>
                </View>
            </View>
            <View style={styles.viewCartContainer}>
            <Text style={styles.viewCart}>View </Text>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => Actions.cart()}
                >
                <Ionicons name="arrow-forward-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: "#fff",
    },
   
  cartBannerContainer:{
    backgroundColor: "darkgreen",
    margin:15,
    padding:10,
    borderRadius:5,
    flexDirection:"row",
    justifyContent: "space-between",
    alignContent:"center",
    alignItems:"center",
  },
  cartDescription:{
    fontSize:16,
    color:"white",
    paddingLeft:10
  },
  viewCartContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewCart:{
    fontSize:20,
    color:"white",
  },
  cartIconContainer:{
    flexDirection:"row",
    alignItems:"center",
  }
  });
  