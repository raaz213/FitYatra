import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton, Surface } from "react-native-paper";
import { window } from "../../../constants/sizes"; // make sure this imports your screen width

// User stats data
const userStats = [
  { label: "Workouts", value: "142", icon: "dumbbell" },
  { label: "Calories Burned", value: "12.5k", icon: "fire" },
  { label: "Hours Trained", value: "87", icon: "clock-outline" },
  { label: "Streak Days", value: "21", icon: "calendar-check" },
];

// Distinct colors for each card
const cardColors = ["#3b82f6", "#f97316", "#22c55e", "#8b5cf6"];

const UserStats = () => {
  return (
    <View style={styles.statsContainer}>
      {userStats.map((stat, index) => (
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
