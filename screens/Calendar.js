import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../components/footer";

const dummyOrders = [
  { date: "2024-01-01", mode: "orders", title: "Product 1" },
  { date: "2024-01-05", mode: "orders", title: "Product 2" },
  { date: "2024-01-06", mode: "orders", title: "Product 2" },
  { date: "2024-01-06", mode: "orders", title: "Products 3" },
  { date: "2024-01-07", mode: "orders", title: "Products 1" },
];

const SubscriptionCalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onDayPress = (day) => {
    // console.log("selected day", day);
    setSelectedDate(day.dateString);
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) {
      return [];
    }

    return dummyOrders.filter((order) => order.date === selectedDate);
  };

  const theme = {
    calendarBackground: "#ffffff",
    selectedDayBackgroundColor: "green",
    selectedDayTextColor: "black",
    todayTextColor: "red",
    dayTextColor: "black",
    textDisabledColor: "gray",
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Calendar</Text>

      <Calendar
        markedDates={{
          ...dummyOrders.reduce((acc, order) => {
            acc[order.date] = {
              marked: true,
              dotColor: order.mode === "orders" ? "red" : "blue",
            };
            return acc;
          }, {}),
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: "darkgreen",
          },
        }}
        onDayPress={onDayPress}
      />

      {selectedDate && (
        <View style={styles.detailsContainer}>
          {getEventsForSelectedDate().length > 0 ? (
            getEventsForSelectedDate().map((event, index) => (
              <Text key={index} style={styles.detailsText}>
                {event.title} ({event.mode})
              </Text>
            ))
          ) : (
            <Text style={styles.noOrderText}>No orders on selected date.</Text>
          )}
        </View>
      )}

      <View style={styles.footer}>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

export default SubscriptionCalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    width: "100%",
    backgroundColor: "darkgreen",
    padding: 15,
    color: "#ffff",
  },
  detailsContainer: {
    padding: 20,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 5,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  noOrderText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});
