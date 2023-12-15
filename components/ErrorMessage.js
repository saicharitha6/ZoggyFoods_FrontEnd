import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import closeIcon from "../assets/close.png";

const ErrMessage = ({ type, text, onEnd }) => {
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 50,
    },
    errMsg: {
      padding: 10,
      borderRadius: 5,
      opacity: 0.6,
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    authentication: {
      backgroundColor: "red",
      color: "#fff",
    },
    validation: {
      backgroundColor: "yellow",
      color: "#000",
    },
    closeButton: {
      width: 15,
      height: 15,
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
          <Image
            source={closeIcon}
            title="close icons"
            style={styles.closeButton}
          />
          <Text>{text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrMessage;
