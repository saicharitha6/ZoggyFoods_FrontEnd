import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
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
  const [itemIdMap, setItemIdMap] = useState({});

  async function removeItem(productId) {
    const cartId = await AsyncStorage.getItem("cart_id");
    axios
      .delete(`${baseURL}/store/carts/${cartId}/line-items/${itemIdMap[productId]}`)
      .then(({ data }) => {
        // if (data.cart) {
        //   onChangeCart(data);
        // }
      });
  }

   // Function to handle increasing the quantity
   const increaseQuantity = () => {
    setQuantity(quantity + 1);
    if (!isInCart) {
      setIsInCart(true); // Product is added to cart when quantity increases from 1
    }
  };

  // Function to handle decreasing the quantity
  const decreaseQuantity = (productId) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
      setIsInCart(false); // Product is removed from cart when quantity decreases to 0 or less
      removeItem(productId);
    }
  };


  const addToCart = async (quantity) => {
    const cartId = await AsyncStorage.getItem("cart_id");
    axios
      .post(baseURL + "/store/carts/" + cartId + "/line-items", {
        variant_id: product.variants[0].id,
        quantity: quantity,
      })
      .then(({ data }) => {
        setIsInCart(true);
        setItemIdMap(oldItemMap =>{
          let idMap = {...oldItemMap}
          data.cart.items.map((item)=>{
            delete idMap[item.variant.product.id];
            idMap[item.variant.product.id] = item.id;
          })
          return {...idMap};
        } )
        // alert(`Item ${product.title} added to cart`);
      })
      .catch((err) => {
        console.log(err);
      });
    // setIsInCart(true);
  };

  return (
    <View style={styles.container} key={key}>
      <Image
        source={{
          uri: product.thumbnail,
        }}
        style={styles.image}
      />
      <View style={styles.productDetails}>
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
              onPress={() => {
                addToCart(1);
              }}
              title="Buy Now"
              style={styles.button}
            />
          ) : (
            <View style={styles.quantityBtnContainer}>
            <View>
                <TouchableOpacity 
                 key={product.id}
                 onPress={() => {
                        increaseQuantity();
                        addToCart(1);
                      }}
                ><Text style={styles.quantityButtonFont}>+   |</Text></TouchableOpacity>
            </View>
            <View>
              <Text style={styles.quantityButtonFont}>{quantity}</Text>
            </View>
            <View>
                <TouchableOpacity        
                 key={product.id}          
                 onPress={() => {
                  decreaseQuantity(product.id);
                  addToCart(-1);
                }}><Text style={styles.quantityButtonFont}>|   -</Text></TouchableOpacity>
            </View>
          </View>
          )}
        </View>       
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
    // padding: 10,
    width: widthToDp(42),
    backgroundColor: "#fff",
  },
  image: {
    height: heightToDp(40),
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    marginBottom: heightToDp(1),
  },
  productDetails: {
    padding: 10,
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

  quantityBtnContainer:{
   flexDirection:"row",
   justifyContent:"space-around",
   alignItems:"center",
   borderRadius:5,
   borderStyle:"solid",
   borderWidth:1,
   borderColor:"darkgreen",
   backgroundColor:"darkgreen",
  height:30,
  width:100,
  margin:6,
  },
  quantityButtonFont:{
    fontSize: 18,
    fontWeight:"bold",
    color:"white"
  }
});
