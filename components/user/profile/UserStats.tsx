import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton, Surface } from "react-native-paper";
import { window } from "../../../constants/sizes"; // make sure this imports your screen width
import { CardWorkoutStats } from "../../../types/user/exercise/Workout";
import { userCaloriesStatsAnalytics } from "../../../services/user/exercise/Workout";

// Distinct colors for each card
const cardColors = ["#3b82f6", "#f97316", "#22c55e", "#8b5cf6"];

const UserStats = () => {
  const [stats, setStats] = useState<CardWorkoutStats>({
    totalCalories: 0,
    totalWorkouts: 0,
    totalHoursTrained: 0,
    streakDays: 0,
  });
  const trainedMin = stats.totalHoursTrained/60;
  const trainedHr = Math.floor(trainedMin/60);
  const formatedTrained = `${trainedHr} Hr ${Math.floor(trainedMin%60)} Min`;

  const caloriesData = [
    { label: "Workouts", value: stats.totalWorkouts, icon: "dumbbell" },
    { label: "Calories Burned", value:stats.totalCalories.toFixed(2), icon: "fire" },
    { label: "Hours Trained", value: formatedTrained, icon: "clock-outline" },
    { label: "Streak Days", value: stats.streakDays, icon: "calendar-check" },
  ];

  const caloriesStats = async () => {
    try {
      const response = await userCaloriesStatsAnalytics();
      setStats(response.cardWorkoutStats);
    } catch (error) {
      console.error("Error fetching calorie data:", error);
    }
  };

  useEffect(() => {
    caloriesStats();
  }, []);

  return (
    <View style={styles.statsContainer}>
      {caloriesData.map((stat, index) => (
        <Surface
          key={index}
          style={[styles.statCard, { backgroundColor: cardColors[index] }]}
          elevation={4}
        >
          <IconButton
            icon={stat.icon}
            size={28}
            iconColor="#ffffff"
            style={styles.statIcon}
          />
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </Surface>
      ))}
    </View>
  );
};

export default UserStats;

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    margin: 12,
    justifyContent: "space-between",
  },
  statCard: {
    width: (window.width - 44) / 2, // adjust for margins + gaps
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statIcon: {
    margin: 0,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#ffffff",
    textAlign: "center",
  },
});
