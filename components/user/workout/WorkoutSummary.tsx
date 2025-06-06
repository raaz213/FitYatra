import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, useTheme } from "react-native-paper";
import { Exercise } from "../../../types/user/exercise/Exercise";




const WorkoutSummary = ({ exercises, selectedSubcategory}: { exercises: Exercise[], selectedSubcategory: string}) => {
  const theme = useTheme();
  return (
    <Card
      style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}
    >
      <Card.Content style={styles.summaryContent}>
        <Text style={[styles.summaryTitle, { color: theme.colors.onSurface }]}>
          Workout Summary
        </Text>
        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: "#06407a" }]}>
              {exercises.length}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Exercises
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: "#06407a" }]}>45-60</Text>
            <Text
              style={[
                styles.statLabel,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Minutes
            </Text>
          </View>
          <View style={styles.statItem}>
            {/* <Text style={[styles.statNumber, { color: "#06407a" }]}>
              {selectedSubcategory === 7
                ? "Low"
                : selectedDay === 6
                ? "High"
                : "Medium"}
            </Text> */}
            <Text
              style={[
                styles.statLabel,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Intensity
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default WorkoutSummary;

const styles = StyleSheet.create({
  summaryCard: {
    marginBottom: 32,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  summaryContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  summaryStats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});
