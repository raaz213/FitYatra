import React, { useState, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CategoryCard from "../../../components/user/exercise/CategoryCard";
import StartTrainingButton from "../../../components/user/exercise/StartTrainingButton";

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
  reps: number;
  duration: number;
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

const ExerciseScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const animateValue = useRef(new Animated.Value(0)).current;

  return (
    <LinearGradient colors={["#d3e1ed", "#d3e1ed"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {categories.map((category: Category) => (
            <CategoryCard
              key={category.id}
              category={category}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              animatedValue={animateValue}
            />
          ))}
        </ScrollView>

        {selectedCategory && (
          <StartTrainingButton
            selectedCategory={selectedCategory}
            animateValue={animateValue}
            navigation={navigation}
          />
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

  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
});

export default ExerciseScreen;
