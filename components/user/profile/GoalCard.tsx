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
          <IconButton icon="target" size={24} iconColor="#667eea" />
        </View>
        <View style={styles.progressContainer}>
          <ProgressBar
            progress={weeklyGoal}
            color="#667eea"
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
    elevation: 3,
    backgroundColor: "#4a4a4a",
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  goalTitle: {
    fontWeight: "600",
    color: "#f0f0f0",
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
    color: "#667eea",
    fontWeight: "600",
  },
});
