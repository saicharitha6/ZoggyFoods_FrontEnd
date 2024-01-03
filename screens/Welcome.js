import React, { useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { Path, Svg } from "react-native-svg";
import Swiper from "react-native-swiper";

const WelcomeScreen = () => {
  const swiperRef = useRef(null);

  const handleGetStarted = () => {
    Actions.products();
  };

  const handleNext = () => {
    swiperRef.current.scrollBy(1, true);
  };

  return (
    <Swiper
      style={styles.wrapper}
      loop={false}
      showsButtons={false}
      ref={swiperRef}
    >
      {/* Welcome Screen 1 */}
      <View style={styles.slide}>
        <Image
          source={require("../assets/instantIdly.png")}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Welcome to Instant Idly</Text>
        <Text style={styles.mainDescriptionText}>
          Your one-stop solution for delicious and instant food!
        </Text>
        <TouchableOpacity style={styles.skipButton} onPress={handleGetStarted}>
          <Text style={styles.button}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.button}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Welcome Screen 2 */}
      <View style={styles.slide}>
        {/* <SvgUri source={require("../assets/blob.svg")} style={styles.wave} /> */}
        <Svg style={styles.wave} viewBox="0 0 200 200">
          <Path
            fill="#006400"
            d="M42.6,-60.6C53.2,-50.9,58.4,-35.8,65.8,-19.8C73.2,-3.8,82.8,13.1,78.7,25.5C74.5,37.8,56.7,45.6,41.3,52.5C25.9,59.3,12.9,65.2,-2.6,68.7C-18.1,72.2,-36.1,73.4,-49,65.7C-61.9,58.1,-69.7,41.6,-72.1,25.5C-74.6,9.3,-71.8,-6.5,-64.8,-19C-57.9,-31.4,-46.9,-40.3,-35.4,-49.7C-23.9,-59.1,-11.9,-68.8,2,-71.6C16,-74.4,32,-70.2,42.6,-60.6Z"
            transform="translate(100 100)"
          />
        </Svg>
        <View style={styles.textContainer}>
          <Text style={styles.subHeaderText}>Browse Restaurants</Text>
          <Text style={styles.descriptionText}>
            Explore a variety of restaurants and cuisines in your area.
          </Text>
        </View>
        <Image
          source={require("../assets/restaurant.jpg")}
          style={styles.image}
        />
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.button}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Welcome Screen 3 */}
      <View style={styles.slide}>
        <Svg style={styles.wave} viewBox="0 0 200 200">
          <Path
            fill="#006400"
            d="M42.6,-60.6C53.2,-50.9,58.4,-35.8,65.8,-19.8C73.2,-3.8,82.8,13.1,78.7,25.5C74.5,37.8,56.7,45.6,41.3,52.5C25.9,59.3,12.9,65.2,-2.6,68.7C-18.1,72.2,-36.1,73.4,-49,65.7C-61.9,58.1,-69.7,41.6,-72.1,25.5C-74.6,9.3,-71.8,-6.5,-64.8,-19C-57.9,-31.4,-46.9,-40.3,-35.4,-49.7C-23.9,-59.1,-11.9,-68.8,2,-71.6C16,-74.4,32,-70.2,42.6,-60.6Z"
            transform="translate(100 100)"
          />
        </Svg>
        <View style={styles.textContainer}>
          <Text style={styles.subHeaderText}>Add to Cart</Text>
          <Text style={styles.descriptionText}>
            Easily add your favorite items to the cart and proceed to checkout.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../assets/shopping-cart.jpg")}
          style={styles.image}
        />
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    paddingTop: 200,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mainDescriptionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: "50%",
    zIndex: -1,
    position: "absolute",
    top: 0,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#006400",
    // color: "white",
  },
  buttonText: {
    // color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  skipButton: {
    position: "absolute",
    bottom: 40,
    left: 20,
  },
  nextButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
  },
  wave: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "10%",
    // left: 100,
  },
  textContainer: {
    position: "absolute",
    top: "50%", // 10% of Svg's height
    width: "100%", // Make sure it covers the entire width of the Svg
    alignItems: "center", // Align text in the center horizontally
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#F5F5DC",

    width: 250,
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#F5F5DC",
  },
});

export default WelcomeScreen;
