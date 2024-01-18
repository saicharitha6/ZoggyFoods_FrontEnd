import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  RefreshControl,
  Text,
} from "react-native";
import React, { useEffect, useRef, useState, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import { widthToDp, heightToDp } from "rn-responsive-screen";
import axios from "axios";
import Header from "../components/Header";
import { Actions } from "react-native-router-flux";
import baseURL from "../constants/url";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../components/footer";

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
    const cartId = await AsyncStorage.getItem("cart_id");
    axios.get(`${baseURL}/store/carts/${cartId}`).then(({ data }) => {
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

  const isProductOutOfStock = (product) => {
    return product.variants.every((variant) => variant.inventory_quantity <= 0);
  };

  return (
    <SafeAreaView style={[styles.safeContainer]}>
      <View style={styles.container}>
        <Header isHome={true} count={cart.length} />
        <View style={styles.searchBar}>
          <Feather
            name="search"
            size={20}
            color="black"
            style={{ marginLeft: 1 }}
          />
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
          <Text style={styles.line}>line</Text>

          <View style={styles.products}>
            {products.map((product) => (
              <TouchableOpacity
                key={product.id}
                onPress={() => Actions.ProductInfo({ productId: product.id })}
                disabled={isProductOutOfStock(product)}
                style={styles.productItem}
              >
                <ProductCard product={product} />
                {isProductOutOfStock(product) && (
                  <View style={styles.outOfStockOverlay}>
                    <Text style={styles.outOfStockText}>OUT OF STOCK</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <Footer />
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
    alignItems: "center",
    justifyContent: "center",
    borderLeftColor: "yellow",
    borderLeftWidth: 2,
    borderRightColor: "yellow",
    borderRightWidth: 2,
  },
  products: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: widthToDp(100),
    paddingHorizontal: widthToDp(4),
    justifyContent: "space-between",
  },
  productItem: {
    width: "48%",
    marginBottom: heightToDp(2),
    position: "relative",
  },
  outOfStockOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust the opacity as needed
  },
  outOfStockText: {
    position: "absolute",
    top: "50%",
    left: "31.5%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: heightToDp(5),
    color: "red",
    backgroundColor: "#fff",
    padding: 4,
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
  line: {
    width: "90%",
    height: 1,
    backgroundColor: "#d7d5d5",
    marginBottom: 20,
    marginLeft: 15,
  },
  input: {
    height: 40,
    marginLeft: 10,
  },
});
