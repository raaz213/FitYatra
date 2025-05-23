import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Story = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Our Story</Text>
      <Text style={styles.sectionText}>
        Founded in 2022, FitTracker Pro was born from a simple idea: fitness
        tracking should be intuitive, motivating, and beautiful. What started as
        a weekend project has grown into a comprehensive wellness platform
        trusted by thousands of users worldwide.
      </Text>
    </View>
  );
};

export default Story;

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "black",
  },
});
