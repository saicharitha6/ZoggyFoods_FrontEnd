import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../components/ProductInfo/Image";
import baseURL from "../constants/url";
import { Actions } from "react-native-router-flux";
import { Ionicons } from "@expo/vector-icons";
import MetaInfo from "../components/ProductInfo/MetaInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";

export default function ProductInfo({ productId }) {
  const [productInfo, setproductInfo] = useState(null);
  const [cart, setCart] = useState([]);
  const fetchCart = async () => {
    // Get the cart id from the device storage
    const cartId = await AsyncStorage.getItem("cart_id");
    // Fetch the products from the cart API using the cart id
    await axios.get(`${baseURL}/store/carts/${cartId}`).then(({ data }) => {
      // Set the cart state to the products in the cart
      setCart(data.cart.items);
    });
  };

  const fetchProduct = async () => {
    await axios.get(`${baseURL}/store/products/${productId}`).then((res) => {
      setproductInfo(res.data.product);
    });
  };
  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header count={cart.length} />
      <ScrollView>
        {productInfo && (
          <View>
            <Images key={productId} images={productInfo.images} />
            <MetaInfo key={productId} product={productInfo} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginLeft: 10,
  },
});
