import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated,
  SafeAreaView,
} from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CategoryCard from "../../components/user/exercise/CategoryCard";

export type DifficultyLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "All Levels";

export interface Category {
  id: number;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  reps: number; // Changed from exercises
  duration: number; // Changed from string to number
  difficulty: DifficultyLevel;
  image: string;
}

const categories: Category[] = [
  {
    id: 1,
    title: "Warm Up",
    subtitle: "Active",
    icon: "body",
    reps: 8,
    duration: 15,
    difficulty: "All Levels",
    image:
      "https://plus.unsplash.com/premium_photo-1679938885972-180ed418f466?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Body Strength",
    subtitle: "Strength",
    icon: "fitness",
    reps: 7,
    duration: 6,
    difficulty: "Intermediate",
    image:
      "https://plus.unsplash.com/premium_photo-1679938885972-180ed418f466?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Shoulder Strength",
    subtitle: "Strength",
    icon: "barbell",
    reps: 8,
    duration: 6,
    difficulty: "Advanced",
    image:
      "https://plus.unsplash.com/premium_photo-1679938885972-180ed418f466?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Stretching",
    subtitle: "Flexibility",
    icon: "walk",
    reps: 8,
    duration: 6,
    difficulty: "Beginner",
    image:
      "https://plus.unsplash.com/premium_photo-1679938885972-180ed418f466?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ExerciseScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const animateValue = useRef(new Animated.Value(0)).current;

  return (
    <LinearGradient colors={["#6f6f73", "#fafafc"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.headerSubtitle}>Choose your focus area</Text>
          </View>

          <View style={styles.grid}>
            {categories.map((category: Category) => (
              <CategoryCard
                key={category.id}
                category={category}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                animatedValue={animateValue}
              />
            ))}
          </View>
        </ScrollView>

        {selectedCategory && (
          <Animated.View
            style={[
              styles.bottomContainer,
              {
                transform: [
                  {
                    translateY: animateValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [100, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={["#8A4FFF", "#6C3CEB"]}
              style={styles.continueButton}
            >
              <Text style={styles.continueText}>Start Training Now</Text>
              <Ionicons
                name="arrow-forward-circle"
                size={28}
                color="#FFFFFF"
                style={styles.continueIcon}
              />
            </LinearGradient>
          </Animated.View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 10,
    paddingTop: 24,
    paddingBottom: 16,
  },

  headerSubtitle: {
    color: "white",
    fontSize: 24,
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },

  bottomContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 32,
    shadowColor: "#8A4FFF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
  },
  continueText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
  continueIcon: {
    marginLeft: 4,
  },
});
// Keep the styles object the same as in your original code
// ... rest of the styles remain unchanged

export default ExerciseScreen;
