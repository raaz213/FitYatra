import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, useTheme } from "react-native-paper";
import { Exercise } from "../../../types/both/exercise/Exercise";
import { window } from "../../../constants/sizes";

const WorkoutSummary = ({
  exercises,
  selectedSubcategory,
}: {
  exercises: Exercise[];
  selectedSubcategory: string;
}) => {
  const theme = useTheme();
  return (
    <View
      style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]}
    >
      <View style={styles.summaryContent}>
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
        </View>
      </View>
    </View>
  );
};

export default WorkoutSummary;

const styles = StyleSheet.create({
  summaryCard: {
    borderRadius: 5,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    width: window.width,
  },
  summaryContent: {
    paddingBottom: 30,
    paddingTop: 10,
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
