import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, useTheme, Button } from "react-native-paper";

type CurrentWorkoutType = {
  currentWorkout: {
    title: string;
    category: string;
  };
};

const WorkoutCategory: React.FC<CurrentWorkoutType> = ({ currentWorkout }) => {
  const theme = useTheme();
  return (
    <Card
      style={[styles.categoryCard, { backgroundColor: theme.colors.surface }]}
    >
      <Card.Content style={styles.categoryContent}>
        <View style={styles.categoryInfo}>
          <View>
            <Text
              style={[styles.categoryTitle, { color: theme.colors.onSurface }]}
            >
              {currentWorkout.title}
            </Text>
            <Text
              style={[
                styles.categorySubtitle,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {currentWorkout.category}
            </Text>
          </View>
          <Button
            mode="contained"
            compact
            style={[styles.descriptionButton, { backgroundColor: "#06407a" }]}
            labelStyle={{ color: theme.colors.background, fontSize: 12 }}
          >
            Description
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default WorkoutCategory;

const styles = StyleSheet.create({
  categoryCard: {
    marginBottom: 24,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  categoryContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  categoryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.8,
  },
  descriptionButton: {
    borderRadius: 24,
    paddingHorizontal: 8,
    elevation: 2,
  },
});
