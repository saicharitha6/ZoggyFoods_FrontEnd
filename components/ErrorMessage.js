import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import closeIcon from "../assets/close.png";

const ErrMessage = ({ type, text, onEnd }) => {
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    errMsg: {
      padding: 10,
      borderRadius: 50,
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    authentication: {
      backgroundColor: "#ff4d4fcc",
      color: "#fff",
    },
    validation: {
      backgroundColor: "#fcff4dcc",
      color: "#000",
    },
    message: {
      backgroundColor: "#cdcdcdcc",
      justifyItems: "center",
    },
  });
  useEffect(() => {
    if (text.length !== 0) {
      const timeoutId = setTimeout(() => {
        onEnd();
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [text, onEnd]);

  return (
    <View style={styles.container}>
      {text.length !== 0 && (
        <TouchableOpacity style={[styles.errMsg, styles[type]]} onPress={onEnd}>
          <Text>{text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrMessage;
