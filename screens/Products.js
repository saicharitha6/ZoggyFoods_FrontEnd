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
import { widthToDp } from "rn-responsive-screen";
import axios from "axios";
import Header from "../components/Header";
import { Actions } from "react-native-router-flux";
import baseURL from "../constants/url";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCategories from "../components/Products/Categories";
import Swiper from "react-native-swiper";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [collections, setCollections] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const autoplayInterval = 3000; // Set the interval in milliseconds
    const autoplayTimer = setInterval(() => {
      if (swiperRef.current && swiperRef.current.scrollBy) {
        swiperRef.current.scrollBy(1);
      }
    }, autoplayInterval);

    return () => clearInterval(autoplayTimer);
  }, []);

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

  function fetchCollections() {
    axios.get(`${baseURL}/store/collections`).then(({ data }) => {
      // console.log("Here", data.collections);
      setCollections(data.collections);
    });
  }

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
    fetchCollections();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
    fetchCart();
    fetchCollections();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={[styles.safeContainer]}>
      <View style={styles.container}>
        <Header isHome={true} count={cart.length} />
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
          <Swiper
            ref={swiperRef}
            autoplay
            loop
            showsButtons={false}
            showsPagination={true} // Enable pagination
            dotStyle={styles.paginationDot} // Customize pagination dot style
            activeDotStyle={styles.activePaginationDot} // Customize active pagination dot style
            containerStyle={styles.swiperContainer}
          >
            <Image
              source={require("../assets/img2.png")}
              style={styles.image}
            />
            <Image
              source={require("../assets/img1.png")}
              style={styles.image}
            />
            <Image
              source={require("../assets/img6.png")}
              style={styles.image}
            />
            <Image
              source={require("../assets/img3.png")}
              style={styles.image}
            />
          </Swiper>

          <ProductCategories
            categories={collections}
            getCategorizedProducts={searchFilterFunction}
          />
          <Text style={styles.line}>line</Text>

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
    alignItems: "center",
    justifyContent: "center",
    borderLeftColor: "yellow", // Set the left border color to yellow
    borderLeftWidth: 2, // Set the left border width
    borderRightColor: "yellow", // Set the right border color to yellow
    borderRightWidth: 2, // Set the right border width
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
  line: {
    width: "90%",
    height: 1,
    backgroundColor: "#d7d5d5",
    marginBottom: 20,
    marginLeft:15,
  },
  swiperContainer: {
    height: 200, // Set a fixed height for the Swiper container
    overflow: "hidden",
    margin: 15,
  },
  paginationDotsContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Customize dot color
    margin: 3,
  },
  activePaginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000", // Customize active dot color
    margin: 3,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    borderRadius: 10,
  },
});
