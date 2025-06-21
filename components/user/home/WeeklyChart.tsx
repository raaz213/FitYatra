import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Portal, Card } from "react-native-paper";

const weeklyData = [
  { day: "SUN", steps: 3200, active: false },
  { day: "MON", steps: 5800, active: false },
  { day: "TUE", steps: 2126, active: true },
  { day: "WED", steps: 0, active: false },
  { day: "THU", steps: 0, active: false },
  { day: "FRI", steps: 0, active: false },
  { day: "SAT", steps: 0, active: false },
];

const calculateCalories = (steps: number) => {
  return (steps * 0.04).toFixed(2); // Basic estimation
};

const WeeklyChart: React.FC = () => {
  const maxSteps = Math.max(...weeklyData.map((d) => d.steps));

  const handleBarPress = (index: number, event: any) => {
    console.log(" Pressed", index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.weeklyContainer}>
        {weeklyData.map((day, index) => {
          const height = maxSteps > 0 ? (day.steps / maxSteps) * 40 : 0;
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={(e) => handleBarPress(index, e)}
            >
              <View style={styles.dayContainer}>
                <View style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height,
                        backgroundColor: day.active
                          ? "#FF3B30"
                          : day.steps > 0
                          ? "#FF3B30"
                          : "#2a2a2a",
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[styles.dayLabel, day.active && styles.activeDayLabel]}
                >
                  {day.day}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  weeklyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    zIndex: 1,
  },
  dayContainer: {
    alignItems: "center",
    flex: 1,
  },
  barContainer: {
    height: 50,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  bar: {
    width: 8,
    borderRadius: 4,
    minHeight: 4,
  },
  dayLabel: {
    color: "black",
    fontSize: 12,
    fontWeight: "500",
  },
  activeDayLabel: {
    color: "#FF3B30",
  },
});

export default WeeklyChart;
