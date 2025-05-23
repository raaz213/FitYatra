import React from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Text, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Category, DifficultyLevel } from "../../../screens/user/ExerciseScreen";
import { window } from "../../../constants/sizes";

const CARD_WIDTH = (window.width - 48) / 2;

const CategoryCard: React.FC<{
  category: Category;
  selectedCategory: number | null;
  setSelectedCategory: (id: number) => void;
  animatedValue: Animated.Value;
}> = ({ category, selectedCategory, setSelectedCategory, animatedValue }) => {
  const isSelected = selectedCategory === category.id;

  const animateSelection = (toValue: number) => {
    Animated.spring(animatedValue, {
      toValue,
      useNativeDriver: true,
      speed: 18,
    }).start();
  };

  const getDifficultyColor = (difficulty: DifficultyLevel): string => {
    switch (difficulty) {
      case "Beginner":
        return "#4CAF50";
      case "Intermediate":
        return "#FF9800";
      case "Advanced":
        return "#F44336";
      case "All Levels":
        return "#2196F3";
    }
  };

  const LeftContent = () => (
    <LinearGradient colors={["#8A4FFF", "#6C3CEB"]} style={styles.iconGradient}>
      <Ionicons name={category.icon as any} size={24} color="white" />
    </LinearGradient>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        setSelectedCategory(category.id);
        animateSelection(1);
      }}
      style={styles.cardContainer}
    >
      <LinearGradient
        colors={["#f0efed", "#f0efed"]}
        style={[styles.card, isSelected && styles.selectedCard]}
      >
        <View style={styles.cardHeader}>
          <LeftContent />
          <View style={styles.cardHeaderText}>
            <Text style={styles.cardTitle}>{category.title}</Text>
            <Text style={styles.cardSubtitle}>{category.subtitle}</Text>
          </View>
        </View>

        <Card.Cover source={{ uri: category.image }} style={styles.cardImage} />

        <View style={styles.cardContent}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="time" size={16} color="#666" />
              <Text style={styles.statText}>{category.duration}min</Text>
            </View>
            <Text style={styles.pipe}>|</Text>
            <View style={styles.statItem}>
              <Ionicons name="barbell" size={16} color="#666" />
              <Text style={styles.statText}>{category.reps}Reps</Text>
            </View>
          </View>

          <View
            style={[
              styles.difficultyBadge,
              {
                backgroundColor: `${getDifficultyColor(category.difficulty)}22`,
                borderColor: getDifficultyColor(category.difficulty),
              },
            ]}
          >
            <Text
              style={[
                styles.difficultyText,
                { color: getDifficultyColor(category.difficulty) },
              ]}
            >
              {category.difficulty}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    overflow: "hidden",
    backgroundColor: "#c7c7c7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    minHeight: 300,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#8A4FFF",
    shadowColor: "#8A4FFF",
    shadowOpacity: 0.3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconGradient: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2A1454",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  cardImage: {
    height: CARD_WIDTH * 0.6,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardContent: {
    alignItems: "flex-start",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  pipe: {
    color: "#666",
    fontSize: 12,
    fontWeight: "500",
  },
  difficultyBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "600",
  },
});

export default CategoryCard;