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
import { fetchAllCategories } from "../../services/user/exercise/Category";
import { Category } from "../../types/user/exercise/Category";
import { getUserExerciseSubcategories } from "../../services/user/exercise/Subcategory";
import { WorkoutContext } from "../../context/WorkoutContext";
import { Subcategory } from "../../types/user/exercise/Subcategory";

const HomeScreen = () => {
  const [exerciseCategories, setExerciseCategories] = useState<
    Category[]
  >([]);
  const {categoryId}:any = useContext(WorkoutContext);
  const [exerciseSubcategories, setExerciseSubcategories] = useState<Subcategory[]>([]);

  const fetchCategories = async () => {
    const response = await fetchAllCategories();
    setExerciseCategories(response);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
  const fetchExerciseSubcategories = async () => {
    try {
      const response = await getUserExerciseSubcategories(categoryId)
      setExerciseSubcategories(response);
    } catch (error) {
      console.error("Error fetching exercise subcategories:", error);
    }
  }
  fetchExerciseSubcategories();
  }, []);

  return (
    <LinearGradient colors={["#d3e1ed", "#d3e1ed"]} style={styles.gradient}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <MySearchBar />
        </View>

        {/* Today's Workout Section */}
        <View style={{ marginVertical: 20 }}>
          <ExerciseCategory exerciseSubcategories={exerciseSubcategories}/>
        </View>

        {/* Featured Content */}
        <View style={styles.featuredContentSection}>
          <FeaturedContent exerciseCategories={exerciseCategories} />
        </View>

        {/* Step Tracker */}
        <View style={styles.stepTrackerSection}>
          <StepTracker />
        </View>

        <View style={styles.waterIntakeSection}>
          <WaterIntake />
        </View>

        {/* Testimonials */}
        <View style={styles.testimonialSection}>
          <TestimonialsList />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  header: {
    marginTop: 24,
  },

  featuredContentSection: {
    marginTop: -30,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    letterSpacing: 0.3,
  },
  stepTrackerSection: {
    marginTop: 6,
  },
  waterIntakeSection: {
    marginTop: 14,
  },
  testimonialSection: {
    marginTop: 14,
  },
});

export default HomeScreen;
