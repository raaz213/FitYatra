import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import MySearchBar from "../../components/user/home/MySearchBar";
import FeaturedContent from "../../components/user/home/FeaturedContent";
import StepTracker from "../../components/user/home/StepTracker";
import TestimonialsList from "../../components/user/home/TestimonialList";
import WaterIntake from "../../components/user/home/WaterIntake";
import { StatusBar } from "expo-status-bar";
import ExerciseCategory from "../../components/user/home/ExerciseCategory";

const HomeScreen = () => {
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
          <ExerciseCategory />
        </View>

        {/* Featured Content */}
        <View style={styles.featuredContentSection}>
          <FeaturedContent />
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
