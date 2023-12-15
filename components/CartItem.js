import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { heightToDp, width, widthToDp } from "rn-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import baseURL from "../constants/url";

export default function CartItem({ item, cartId, onChangeCart }) {
  let [quantity, setQuantity] = useState(item.quantity);
  let [product, setProduct] = useState(item);
  function removeItem(productId) {
    axios
      .delete(`${baseURL}/store/carts/${cartId}/line-items/${productId}`)
      .then(({ data }) => {
        if (data.cart) {
          onChangeCart(data);
        }
      });
  }
  function updateQty(itemId) {
    if (item.quantity !== quantity && quantity <= 3) {
      axios
        .post(`${baseURL}/store/carts/${cartId}/line-items/${itemId}`, {
          quantity,
        })
        .then(({ data }) => {
          if (data.cart) {
            const updatedProduct = data.cart.items.find(
              (itm) => itm.id === itemId
            );
            setProduct(updatedProduct);
            setQuantity(updatedProduct.quantity);
            onChangeCart(data);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
        <View style={styles.info}>
          <View>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>
              {product.description} • ₹{product.unit_price / 100}
            </Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.price}>₹{product.total / 100}</Text>
            <AntDesign
              key={product.id}
              name="minussquareo"
              size={24}
              color="black"
              onPress={() => {
                setQuantity(--quantity);
                updateQty(product.id);
              }}
              disabled={quantity === 1}
            />
            <Text style={styles.quantity}>x{quantity}</Text>
            <AntDesign
              key={product.id}
              name="plussquareo"
              size={24}
              color="black"
              onPress={() => {
                setQuantity(++quantity);
                updateQty(product.id);
              }}
              disabled={quantity === 3}
            />
            <AntDesign
              name="delete"
              size={24}
              color="black"
              onPress={() => removeItem(product.id)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#e6e6e6",
    width: widthToDp("90%"),
  },
  image: {
    width: widthToDp(30),
    height: heightToDp(30),
    borderRadius: 10,
  },
  title: {
    fontSize: widthToDp(4),
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    marginLeft: widthToDp(3),
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: heightToDp(2),
    width: widthToDp(50),
  },
  description: {
    fontSize: widthToDp(3.5),
    color: "#8e8e93",
    marginTop: heightToDp(2),
  },

  price: {
    fontSize: widthToDp(4),
  },
  quantity: {
    fontSize: widthToDp(4),
  },
});
