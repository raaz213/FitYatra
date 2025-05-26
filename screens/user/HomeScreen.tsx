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

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome to <Text style={styles.highlightText}>fitYatra</Text>
          </Text>
          <Text style={styles.subtitleText}>
            Your journey to fitness starts here.
          </Text>
        </View>

        <View style={{ marginVertical: 20 }}>
          <ExerciseCategory />
        </View>

        {/* Motivational Quote */}

        {/*<View style={styles.quoteSection}>
          <Text style={styles.quoteText}>"No Pain, No Gain"</Text>
          <View style={styles.quoteLine} />
        </View>*/}

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
  welcomeSection: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa", 
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  highlightText: {
    color: "#1e90ff", // Bright, energetic blue
  },
  subtitleText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  quoteSection: {
    marginTop: 14,
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: "#f0efed",
    borderLeftWidth: 5,
    borderLeftColor: "#4361ee",
    alignItems: "center",
    elevation: 10,
  },
  quoteText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2b2d42",
    fontStyle: "italic",
    textAlign: "center",
    letterSpacing: 0.7,
    lineHeight: 32,
  },
  quoteLine: {
    width: 70,
    height: 4,
    backgroundColor: "#4361ee",
    marginTop: 16,
    borderRadius: 4,
  },
  featuredContentSection: {
    marginTop: -30,
  },
  featuredTitle: {
    fontSize: 22,
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
