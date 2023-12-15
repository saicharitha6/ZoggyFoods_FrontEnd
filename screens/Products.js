import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import { widthToDp } from "rn-responsive-screen";
import axios from "axios";
import Header from "../components/Header";
import { Actions } from "react-native-router-flux";
import baseURL from "../constants/url";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  function fetchProducts() {
    axios.get(`${baseURL}/store/products`).then((res) => {
      if (res.data.products.length > 0) setProducts(res.data.products);
    });
  }

  const fetchCart = async () => {
    // Get the cart id from the device storage
    const cartId = await AsyncStorage.getItem("cart_id");
    // Fetch the products from the cart API using the cart id
    axios.get(`${baseURL}/store/carts/${cartId}`).then(({ data }) => {
      // Set the cart state to the products in the cart
      setCart(data.cart.items);
    });
  };

  function searchFilterFunction(text) {
    let searchQuery = {
      q: text,
    };
    setSearch(text);
    axios({
      method: "post",
      url: `${baseURL}/store/products/search`,
      data: searchQuery,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setProducts(res.data.hits);
    });
  }
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
    fetchCart();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Header title="UniStock" isHome={true} count={cart.length} />
      <View style={styles.searchBar}>
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={search}
          onChangeText={(text) => searchFilterFunction(text)}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.products}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              onPress={() => Actions.ProductInfo({ productId: product.id })}
            >
              <ProductCard product={product} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* <View style={styles.addToCart}>
        <Feather
          name="shopping-cart"
          size={24}
          color="white"
          onPress={() => Actions.cart()}
        />
      </View> */}
    </View>
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
  products: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: widthToDp(100),
    paddingHorizontal: widthToDp(4),
    justifyContent: "space-between",
  },
  addToCart: {
    position: "absolute",
    bottom: 30,
    right: 10,
    backgroundColor: "#C37AFF",
    width: widthToDp(12),
    height: widthToDp(12),
    borderRadius: widthToDp(10),
    alignItems: "center",
    padding: widthToDp(2),
    justifyContent: "center",
  },
  searchBar: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    shadowColor: "#000",
    borderRadius: 10,
    marginBottom: "4px",
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
});
