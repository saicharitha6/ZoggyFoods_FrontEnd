import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { widthToDp } from "rn-responsive-screen";

const ProductCategories = ({ categories, getCategorizedProducts }) => {
  const [selectedCollection, setSelectedCollections] = useState();

  const selectCategory = (category) => {
    setSelectedCollections((prevSelected) =>
      prevSelected === category ? null : category
    );
  };

  useEffect(() => {
    getCategorizedProducts(selectedCollection);
  }, [selectedCollection]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CATEGORIES</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => selectCategory(category)}
            style={[
              styles.categoryItem,
              selectedCollection === category && styles.selectedCategory,
            ]}
          >
            <Image
              source={{ uri: category.metadata.image }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
    width: widthToDp(100),
    paddingHorizontal: widthToDp(4),
    gap: 10,
  },
  title: {
    fontSize: 15,
  },
  selectedCategory: {
    backgroundColor: "#f3cea9",
  },
  categoryList: {
    flexDirection: "row",
    gap: 10,
  },
  categoryItem: {
    backgroundColor: "#eddfd2",
    borderRadius: 8,
    alignItems: "center",
    width: 100,
    height: 100,
    justifyContent: "space-around",
    borderColor: "yellow",
    borderWidth: 2,
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: widthToDp(100),
  },
  categoryText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default ProductCategories;
