import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  RefreshControl,
  Text,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "../ProductCard";
import { widthToDp } from "rn-responsive-screen";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import baseURL from "../../constants/url";
import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(null);
  const [cart, setCart] = useState([]);

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
    // fetchProducts();
    fetchCart();
  }, []);

  return (
    <SafeAreaView style={[styles.safeContainer]}>
      <View style={styles.container}>
        <View style={styles.searchHeader}>
          <View style={styles.firstRow}>
            <TouchableOpacity onPress={() => Actions.pop()}>
              <Ionicons
                style={styles.icon}
                name="arrow-back-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <Text style={styles.title}>Search</Text>
          </View>
          <View style={styles.header}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder="Search..."
                placeholderTextColor="#888"
                value={search}
                onChangeText={(text) => setSearch(text)}
              />
              <Feather
                name="search"
                style={styles.searchButton}
                size={24}
                color="#fff"
                onPress={() => {
                  searchFilterFunction(search);
                }}
              />
            </View>
          </View>
        </View>
        <ScrollView>
          {products.length > 0 ? (           
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
          ) : (
            <View>
              <Text style={styles.emptySearchText}>No results to show</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  products: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: widthToDp(100),
    paddingHorizontal: widthToDp(4),
    justifyContent: "space-between",
    marginTop:20,
  },
  searchHeader: {
    width: widthToDp("100%"),
    height: 140,
    backgroundColor: "#00b33c",
    // borderBottomLeftRadius:20,
    // borderBottomRightRadius:20,
  },
  firstRow: {
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    padding: 10,
    backgroundColor: "#2ecc71",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "35%",
    marginTop: 20,
  },
  icon: {
    color:"#ffffff",
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  emptySearchText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "60%",
  },
});
