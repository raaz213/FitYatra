import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import MySearchBar from "../../components/user/home/MySearchBar";
import FeaturedContent from "../../components/user/home/FeaturedContent";
import StepTracker from "../../components/user/home/StepTracker/StepTracker";
import TestimonialsList from "../../components/user/home/Testimonials/TestimonialList";
import WaterIntake from "../../components/user/home/WaterIntake/WaterIntake";
import { StatusBar } from "expo-status-bar";
import ExerciseCategory from "../../components/user/home/ExerciseCategory";
import { fetchAllCategories } from "../../services/both/exercise/Category";
import { Category } from "../../types/both/exercise/Category";
import { WorkoutContext } from "../../context/WorkoutContext";
import { Subcategory } from "../../types/both/exercise/Subcategory";

const HomeScreen = () => {
  const [exerciseCategories, setExerciseCategories] = useState<Category[]>([]);
  const { categoryId }: any = useContext(WorkoutContext);
  const [exerciseSubcategories, setExerciseSubcategories] = useState<
    Subcategory[]
  >([]);

  const fetchCategories = async () => {
    const response = await fetchAllCategories();
    setExerciseCategories(response);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <LinearGradient colors={["#d3e1ed", "#d3e1ed"]} style={styles.gradient}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={{ marginBottom: 20 }}>
          <MySearchBar />
        </View>
        {/* Today's Workout Section */}
        <View style={{ marginBottom: 20 }}>
          <ExerciseCategory />
        </View>

        {/* Featured Content */}
        <View style={{ marginBottom: 20 }}>
          <FeaturedContent exerciseCategories={exerciseCategories} />
        </View>

        {/* Step Tracker */}
        <View style={{ marginBottom: 20 }}>
          <StepTracker />
        </View>

        <View style={{ marginBottom: 20 }}>
          <WaterIntake />
        </View>

        <View style={{ marginBottom: 0 }}>
          <TestimonialsList />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    
  },
});
