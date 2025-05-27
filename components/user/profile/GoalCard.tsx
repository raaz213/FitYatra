import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, IconButton, ProgressBar } from "react-native-paper";

const GoalCard = () => {
  const weeklyGoal = 0.75;

  return (
    <Card style={styles.goalCard}>
      <Card.Content>
        <View style={styles.goalHeader}>
          <Text style={styles.goalTitle}>
            Weekly Goal Progress
          </Text>
          <IconButton icon="target" size={24} iconColor="#06407a" />
        </View>
        <View style={styles.progressContainer}>
          <ProgressBar
            progress={weeklyGoal}
            color="#06407a"
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>
            {Math.round(weeklyGoal * 100)}% Complete
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default GoalCard;

const styles = StyleSheet.create({
  goalCard: {
    margin: 12,
    borderRadius: 12,
    backgroundColor: "#ffffff",
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  goalTitle: {
    fontWeight: "600",
    color: "#616263",
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e0e0e0",
  },
  progressText: {
    textAlign: "center",
    color: "#06407a",
    fontWeight: "600",
  },
});
