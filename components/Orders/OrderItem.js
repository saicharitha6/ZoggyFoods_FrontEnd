import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { heightToDp, width, widthToDp } from "rn-responsive-screen";

const OrderItem = ({image,title,status,date,quantity,price}) => {
  
  return (
    <View style={styles.containerList}>
      <View style={styles.item}>
    <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
      <View style={styles.itemDetails}>
      <View style={styles.info}>
        <View>
          <Text style={styles.title}>  {title}</Text>
        </View>
        <View>
          <Text style={styles.status}>{status}</Text>
        </View>
      </View> 
      <View  style={styles.priceContainer}>
        <Text style={styles.quantity}>Quantity: {quantity}</Text>
        <Text style={styles.price}>₹ {price/100}</Text>
      </View>
    </View>
    </View>
    <View style={styles.dateContainer}>
        <Text style={styles.itemDate}>Order at: {date}</Text>
    </View>   
  </View>
    
  );
};


// Styles....
const styles = StyleSheet.create({
    containerList: {
        backgroundColor: "#fff",
        marginTop: 20,
        flexDirection: "column",
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderColor: "#e6e6e6",
        width: widthToDp("90%"),
        shadowColor: "#000",
        borderRadius: 10,
        marginBottom: heightToDp(2),
        shadowOffset: {
          width: 2,
          height: 5,
        },
        shadowOpacity:2,
        shadowRadius: 6.84,
        elevation: 5,
        padding: 10,
        backgroundColor: "#fff",
      },
    item: {
      flexDirection: "row",
      paddingBottom: 5,
      padding: 10,
    },
    title: {
        fontSize: widthToDp(4),
        fontWeight: "bold",
      },
      status: {
        color:"#e67300",
        backgroundColor: "#f5c389",
        flexDirection: "row",
        textAlign:"center",
        borderWidth: 1,
        paddingBottom: 10,
        borderColor: "#e67300",
        width: widthToDp(25),
        height:heightToDp(8),
        borderRadius: 5,
        padding: 5,
        margin:5,
        marginLeft:widthToDp(5),
        marginTop:heightToDp(-1),
      },
      image: {
        width: widthToDp(25),
        height: heightToDp(25),
        borderRadius: 10,
      },      
      info: {
        marginLeft: widthToDp(3),
        marginVertical: heightToDp(2),
        width: widthToDp(50),
        flexDirection:"row",
      },
      lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
        margin:10,
    },
    itemDate:{
      fontSize: widthToDp(4),
      color:"#aaa",
    },
    dateContainer:{
      marginLeft:widthToDp(4),
    },
    itemDetails:{
      flexDirection: "column",
    },
    quantity:{
      fontSize: widthToDp(4),
      color:"#aaa",
    },
    price:{
      fontSize: widthToDp(5),
      color:"#aaa",
    },
    priceContainer:{
      marginLeft: widthToDp(4),
      marginTop:heightToDp(-3),
    },
  });

export default OrderItem;
