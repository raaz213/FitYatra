import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconButton, Surface } from "react-native-paper";
import { window } from "../../../constants/sizes";

const userStats = [
  { label: "Workouts", value: "142", icon: "dumbbell" },
  { label: "Calories Burned", value: "12.5k", icon: "fire" },
  { label: "Hours Trained", value: "87", icon: "clock-outline" },
  { label: "Streak Days", value: "21", icon: "calendar-check" },
];

const UserStats = () => {
  return (
    <View style={styles.statsContainer}>
      {userStats.map((stat, index) => (
        <Surface key={index} style={styles.statCard} elevation={2}>
          <IconButton
            icon={stat.icon}
            size={28}
            iconColor="#667eea"
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
  },
  statCard: {
    width: (window.width - 44) / 2,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#4a4a4a",
  },
  statIcon: {
    margin: 0,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f0f0f0",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#f0f0f0",
    textAlign: "center",
  },
});
