import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { heightToDp, width, widthToDp } from "rn-responsive-screen";

const OrderItem = ({image,title,status,date}) => {
  
  return (
    <View style={styles.containerList}>
    <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
    <View style={styles.info}>
      <View>
        <Text style={styles.title}>  {title}</Text>
      </View>
      <View>
        <Text style={styles.status}>{status} - {date}</Text>
      </View>
    </View>
  </View>
    
  );
};


// Styles....
const styles = StyleSheet.create({
    containerList: {
        backgroundColor: "#fff",
        marginTop: 20,
        flexDirection: "row",
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderColor: "#e6e6e6",
        width: widthToDp("90%"),
      },
    title: {
        fontSize: widthToDp(4),
        fontWeight: "bold",
      },
      status: {
        fontSize: widthToDp(3.5),
        color: "#8e8e93",
        marginTop: heightToDp(2),
        paddingLeft:7
      },
      image: {
        width: widthToDp(30),
        height: heightToDp(30),
        borderRadius: 10,
      },      
  info: {
    marginLeft: widthToDp(3),
    marginVertical: heightToDp(2),
    width: widthToDp(50),
  },
  });

export default OrderItem;
