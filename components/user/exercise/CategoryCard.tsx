import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Category } from "../../../types/both/exercise/Category";
import { API_URL } from "../../../constants/apiUrl";

const CARD_HEIGHT = 260;

const CategoryCard: React.FC<{
  category: Category;
  selectedCategory: string | null;
  setSelectedCategory: (id: string) => void;
  animatedValue: Animated.Value;
}> = ({ category, selectedCategory, setSelectedCategory, animatedValue }) => {
  const isSelected = selectedCategory === category._id;

  const animateSelection = (toValue: number) => {
    Animated.spring(animatedValue, {
      toValue,
      useNativeDriver: true,
      speed: 18,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        setSelectedCategory(category._id);
        animateSelection(1);
      }}
      style={styles.cardContainer}
    >
      <ImageBackground
        source={{ uri: `${API_URL}/uploads/${category.image}` }}
        style={styles.cardBackground}
        imageStyle={styles.backgroundImage}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
          style={[styles.card, isSelected && styles.selectedCard]}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{category.name}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: CARD_HEIGHT,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  cardBackground: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  backgroundImage: {
    borderRadius: 16,
    resizeMode: "cover",
  },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 24,
    justifyContent: "flex-end",
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: "#06407a",
    shadowColor: "#06407a",
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
  },

  cardTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    backgroundColor: "transparent",
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "white",
    paddingHorizontal: 10,
    borderRadius: 5,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    textTransform: "uppercase",
  },
});

export default CategoryCard;
