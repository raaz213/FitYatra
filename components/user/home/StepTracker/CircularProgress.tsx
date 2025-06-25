import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const CircularProgress: React.FC<{ progress: number; steps: number }> = ({
  progress,
  steps,
}) => {
  const size = 200;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.circularContainer}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2a2a2a"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#ff6b35" />
            <Stop offset="50%" stopColor="#f7931e" />
            <Stop offset="100%" stopColor="#ffd700" />
          </LinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.centerContent}>
        <Text style={styles.stepCount}>{steps.toLocaleString()}</Text>
        <Text style={styles.stepLabel}>STEPS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circularContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  centerContent: {
    position: "absolute",
    alignItems: "center",
  },
  stepCount: {
    color: "#FF3B30",
    fontSize: 48,
    fontWeight: "bold",
  },
  stepLabel: {
    color: "black",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
  },
});

export default CircularProgress;
