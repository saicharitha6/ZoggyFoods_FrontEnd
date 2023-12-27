import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { widthToDp, heightToDp } from "rn-responsive-screen";
import Button from "./Button";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../constants/url";
import { AntDesign } from "@expo/vector-icons";

export default function ProductCard({ key, product }) {
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  const addToCart = async (quantity) => {
    const cartId = await AsyncStorage.getItem("cart_id");
    axios
      .post(baseURL + "/store/carts/" + cartId + "/line-items", {
        variant_id: product.variants[0].id,
        quantity: quantity,
      })
      .then(({ data }) => {
        // alert(`Item ${product.title} added to cart`);
      })
      .catch((err) => {
        console.log(err);
      });
      setIsInCart(true);
  };

  return (
    <View style={styles.container} key={key}>
      <Image
        source={{
          uri: product.thumbnail,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.category}>{product.handle}</Text>
 
      <View style={styles.priceContainer}>
        <Text style={styles.price}>
          ₹
          {product.variants[0]?.prices[1]?.amount
            ? product.variants[0]?.prices[1]?.amount / 100
            : 50}
        </Text>

        {!isInCart ? (
          <Button
          onPress={()=>{addToCart(1)}}
          title="Add"
          style={styles.button}
        />
        ) : (
          <View style={styles.quantityBtnContainer}>
          <AntDesign
            key={product.id}
            name="minussquareo"
            style={styles.quantityButton}
            size={24}
            color="orange"
            onPress={() => {
              console.log(quantity);
              setQuantity(quantity-1);
              console.log(quantity);
              addToCart(-1);
            }}
            disabled={quantity <= 1}
          />
          <Text style={styles.quantityButton}>x{quantity}</Text>
          <AntDesign
            key={product.id}
            name="plussquareo"
            style={styles.quantityButton}
            size={24}
            color="orange"
            onPress={() => {
              setQuantity(quantity+1);
              addToCart(1);
            }}
            disabled={quantity >= 3}
          />
        </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    borderRadius: 10,
    marginBottom: heightToDp(4),
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 5,
    padding: 10,
    width: widthToDp(42),
    backgroundColor: "#fff",
  },
  image: {
    height: heightToDp(40),
    borderRadius: 7,
    marginBottom: heightToDp(2),
  },
  title: {
    fontSize: widthToDp(3.7),
    fontWeight: "bold",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: heightToDp(1),
  },
  category: {
    fontSize: widthToDp(3.4),
    color: "#828282",
    marginTop: 3,
  },
  price: {
    fontSize: widthToDp(4),
    fontWeight: "bold",
  },
  button: {
    width: 100,
  },
  quantityBtnContainer: {
    flexDirection: "row",
  },
  quantityButton:{
    margin:5
  }
});
