import React from "react";
import { View, StyleSheet, TouchableOpacity, Animated, ImageBackground } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Category, DifficultyLevel } from "../../../screens/user/exercise/ExerciseScreen";
import { window } from "../../../constants/sizes";

const CARD_HEIGHT = 260;

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

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        setSelectedCategory(category.id);
        animateSelection(1);
      }}
      style={styles.cardContainer}
    >
      <ImageBackground
        source={{ uri: category.image }}
        style={styles.cardBackground}
        imageStyle={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.7)']}
          style={[styles.card, isSelected && styles.selectedCard]}
        >
          <View style={styles.cardContent}>
            <View style={styles.mainContent}>
              <Text style={styles.cardTitle}>{category.title}</Text>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Ionicons name="play-circle" size={14} color="#fff" />
                  <Text style={styles.statText}>{category.subtitle}</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Ionicons name="time" size={14} color="#fff" />
                  <Text style={styles.statText}>{category.duration}min</Text>
                </View>
              </View>
            </View>

            <View style={styles.rightContent}>
              <View
                style={[
                  styles.difficultyBadge,
                  {
                    backgroundColor: `${getDifficultyColor(category.difficulty)}`,
                  },
                ]}
              >
                <Text style={styles.difficultyText}>
                  {category.difficulty}
                </Text>
              </View>
              
              <View style={styles.repsContainer}>
                <Ionicons name="barbell" size={14} color="#fff" />
                <Text style={styles.repsText}>{category.reps} Reps</Text>
              </View>
            </View>
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
    // marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 16,
  },
  cardBackground: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  backgroundImage: {
    borderRadius: 16,
    resizeMode: 'cover',
  },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: "#1e3c72",
    
    shadowColor: "#1e3c72",
    shadowOpacity: 0.4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 12,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 4,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    // backdropFilter is not supported in React Native
  },
  statText: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight: "600",
    opacity: 0.95,
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: 12,
  },
  difficultyBadge: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#ffffff",
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  repsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  repsText: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight: "600",
    opacity: 0.95,
  },
});

export default CategoryCard;