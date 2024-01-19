import React, { useRef } from "react";
import Swiper from "react-native-swiper";
import { StyleSheet } from "react-native";

function AddProfile() {
  const swiperRef = useRef(null);
  const onNextPress = () => {
    // Swipe to the next view
    swiperRef.current.scrollBy(1);
  };
  return (
    <Swiper
      style={styles.wrapper}
      loop={false}
      showsPagination={true}
      ref={swiperRef}
    ></Swiper>
  );
}

export default AddProfile;

const styles = StyleSheet.create({
  wrapper: {
    // Ensure the swiper takes up the entire screen
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
