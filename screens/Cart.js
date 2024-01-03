import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import baseURL from "../constants/url";
import CartItem from "../components/CartItem";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { width, widthToDp } from "rn-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import { Actions } from "react-native-router-flux";
import { useCartContext } from '../components/CartContext';
import emptyShoppingCart from "../assets/emptyShoppingCart.png";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [cart_id, setCartId] = useState(null);
  const { setTotal } = useCartContext();
  const fetchCart = async () => {
    // Get the cart id from the device storage
    const cartId = await AsyncStorage.getItem("cart_id");
    setCartId(cartId);
    // Fetch the products from the cart API using the cart id
    axios.get(`${baseURL}/store/carts/${cartId}`).then(({ data }) => {
      // Set the cart state to the products in the cart
      setCart(data.cart);
    });
  };

  const calculateTotal = () => {
    const itemTotal = cart?.total / 100;
    const discountTotal = cart?.discount_total / 100;
    const total = itemTotal - discountTotal;
    return total.toFixed(2); // Format the total to two decimal places
  };

  const onChangeCart = (data) => {
    setCart(data.cart);
  };

  useEffect(() => {
    // Calling the fetchCart function when the component mounts
    fetchCart();
    //setPaymentSession();
  }, []);
  return (
    // SafeAreaView is used to avoid the notch on the phone
    <SafeAreaView style={[styles.container]}>
      {/* SchrollView is used in order to scroll the content */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Using the reusable header component */}
        <Header title="My Cart" isVisible={false} />

        {/* Mapping the products into the Cart component */}
        {cart?.items?.map((product) => (
          <CartItem
            item={product}
            cartId={cart_id}
            onChangeCart={onChangeCart}
          />
        ))}
      </ScrollView>
    {cart?.items?.length > 0 ?  
     <>{/* Creating a seperate view to show the total amount and checkout button */}
      <View>
        <View style={styles.row}>
          <Text style={styles.cartTotalText}>Items</Text>

          {/* Showing Cart Total */}
          <Text
            style={[
              styles.cartTotalText,
              {
                color: "#4C4C4C",
              },
            ]}
          >
            {/* Dividing the total by 100 because Medusa doesn't store numbers in decimal */}
            ₹{cart?.total / 100}
          </Text>
        </View>
        <View style={styles.row}>
          {/* Showing the discount (if any) */}
          <Text style={styles.cartTotalText}>Discount</Text>
          <Text
            style={[
              styles.cartTotalText,
              {
                color: "#4C4C4C",
              },
            ]}
          >
            - ₹{cart?.discount_total / 100}
          </Text>
        </View>
        <View style={[styles.row, styles.total]}>
          <Text style={styles.cartTotalText}>Total</Text>
          <Text
            style={[
              styles.cartTotalText,
              {
                color: "#4C4C4C",
              },
            ]}
          >
            {/* Calculating the total */}
            ₹{calculateTotal()}
          </Text>
        </View>
        <View>
          {/* A button to navigate to PlaceOrder screen */}
          <Button
            large={true}
            onPress={() => {setTotal(calculateTotal());Actions.address()}}
            title={"Place Order"}
          />
        </View>
      </View>
      </>:
      <View>
        <View style={styles.emptyCartcontainer}>
          <Image source={emptyShoppingCart} style={styles.emptyCartImage} />
        </View>  
        <View style={styles.textContainer}>
              <Text style={styles.textHeading}>You don't have any items in your cart</Text>
              <Text style={styles.textDescription}>Your favourite items are just a click away</Text>
              <Button
              onPress={() => Actions.pop()}
              large={true}
              title="Start Shopping"
            />
        </View>  
    </View>}
    </SafeAreaView>
  );
}

// Styles....
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: widthToDp(90),
    marginTop: 10,
  },
  total: {
    borderTopWidth: 1,
    paddingTop: 10,
    borderTopColor: "#E5E5E5",
    marginBottom: 10,
  },
  cartTotalText: {
    fontSize: widthToDp(4.5),
    color: "#989899",
  },
  emptyCartcontainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    
  },
  emptyCartImage:{
    height:250,
    width:250,
    marginTop:-900,
  },
  textContainer:{
    justifyContent: "center",
    alignItems: "center",
    marginTop: -350,
  },
  textHeading:{
    fontWeight:"bold",
    fontSize:18
  },
  textDescription:{
    color: "#848687",
    padding:10
  }
});
