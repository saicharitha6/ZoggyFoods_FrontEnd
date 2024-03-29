import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Button from "../Button";
import axios from "axios";
import baseURL from "../../constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Actions } from "react-native-router-flux";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightToDp } from "rn-responsive-screen";

export default function MetaInfo({ product }) {
  const [activeSize, setActiveSize] = useState(0);
  const [isCart, setCart] = useState(false);
  const [price, setPrice] = useState(
    product.variants[0]?.prices[1]?.amount / 100
  );
  const [quantity, setQuantity] = useState(1);

  const isVariantOutOfStock = () => {
    return product.variants[activeSize]?.inventory_quantity <= 0;
  };

  const isProductOutOfStock = () => {
    return product.variants.every((variant) => variant.inventory_quantity <= 0);
  };

  const addToCart = async (quantity) => {
    const cartId = await AsyncStorage.getItem("cart_id");
    const variantId = product.variants[activeSize].id;

    axios
      .post(baseURL + "/store/carts/" + cartId + "/line-items", {
        variant_id: product.variants[0].id,
        quantity: quantity,
      })
      .then(({ data }) => {
        setCart(true);

        // Update the local state with the decreased inventory
        const updatedVariants = [...product.variants];
        const currentInventory = updatedVariants[activeSize].inventory_quantity;

        // Check if the inventory is greater than 0 before decrementing
        if (currentInventory > 0) {
          updatedVariants[activeSize].inventory_quantity -= 1;
          // updateProduct({ ...product, variants: updatedVariants });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goToCart = () => {
    Actions.cart();
    setCart(false);
  };

  function setAmount(index) {
    setPrice(product.variants[index]?.prices[1]?.amount / 100);
  }

  // Function to handle increasing the quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Function to handle decreasing the quantity
  const decreaseQuantity = (productId) => {
    // if (quantity > 1) {
    setQuantity(quantity - 1);
    // } else {
    //   setQuantity(1);
    //   setIsInCart(false); // Product is removed from cart when quantity decreases to 0 or less
    //   removeItem(productId);
    // }
  };

  const calculateDeliveryTime = () => {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + 1);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDeliveryTime = deliveryDate.toLocaleDateString(
      "en-US",
      options
    );

    return formattedDeliveryTime;
  };

  return (
    <SafeAreaView style={[styles.safeContainer]}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>{product.title}</Text>
          <View>
            <Text style={styles.price}>₹{price}</Text>
            <Text style={styles.star}>⭐⭐⭐</Text>
          </View>
        </View>
        <View style={styles.row}>
          {product.options[0].values.map((size, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setActiveSize(index);
                setAmount(index);
              }}
            >
              <Text
                style={[
                  styles.sizeTag,
                  {
                    borderWidth: activeSize === index ? 3 : 0,
                  },
                ]}
              >
                {size.value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonAndTimeContainer}>
          <View style={styles.estimatedTime}>
            <Text style={styles.heading}>Estimated Delivery Time</Text>
            <Text style={styles.timeText}>{calculateDeliveryTime()}</Text>
          </View>
          <View style={styles.quantityBtnContainer}>
            <View>
              <TouchableOpacity
                key={product.id}
                onPress={() => {
                  increaseQuantity();
                  addToCart(1);
                }}
              >
                <Text style={styles.quantityButtonFont}>+ |</Text>
              </TouchableOpacity>
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
                }}
              >
                <Text style={styles.quantityButtonFont}>| -</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.heading}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        {isProductOutOfStock() ? (
          <Text style={styles.outOfStock}>OUT OF STOCK</Text>
        ) : isVariantOutOfStock() ? (
          <Button
            onPress={null}
            title="OUT OF STOCK"
            large={true}
            disabled={true}
          />
        ) : isCart ? (
          <Button onPress={goToCart} title="Go to Cart" large={true} />
        ) : (
          <Button onPress={addToCart} title="Add to Cart" large={true} />
        )}
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
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: heightToDp(5),
  },
  title: {
    fontSize: heightToDp(6),
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: heightToDp(5),
    fontWeight: "bold",
    color: "#8B8000",
  },
  heading: {
    fontSize: heightToDp(5),
    marginTop: heightToDp(3),
  },
  star: {
    fontSize: heightToDp(3),
    marginTop: heightToDp(1),
  },
  sizeTag: {
    borderColor: "#8B8000",
    backgroundColor: "#F7F6FB",
    color: "#000",
    paddingHorizontal: heightToDp(7),
    paddingVertical: heightToDp(2),
    borderRadius: heightToDp(2),
    marginTop: heightToDp(2),
    overflow: "hidden",
    fontSize: heightToDp(4),
    marginBottom: heightToDp(2),
  },
  description: {
    fontSize: heightToDp(4),
    color: "#aaa",
    marginTop: heightToDp(2),
  },
  estimatedTime: {
    marginTop: 10,
    marginBottom: 10,
  },
  timeText: {
    color: "green",
    fontWeight: "bold",
    marginTop: 5,
  },
  quantityBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "darkgreen",
    backgroundColor: "darkgreen",
    height: 30,
    width: 60,
    marginTop:20,
   padding:1
  },
  quantityButtonFont: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  buttonAndTimeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  outOfStock: {
    fontSize: heightToDp(5),
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    marginTop: heightToDp(2),
    backgroundColor: "darkred",
    borderRadius: 10,
    padding: 10,
  },
});
