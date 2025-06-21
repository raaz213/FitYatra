import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pedometer } from "expo-sensors";
import WeeklyChart from "./WeeklyChart";
import CircularProgress from "./CircularProgress";
import { Toast } from "toastify-react-native";

const StepTracker: React.FC = () => {
  const isPedometerAvailableRef = useRef<boolean | null>(null);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState<number | string>(0);
  const [distanceUnit, setDistanceUnit] = useState("Meter");
  const goal = 10000;

  useEffect(() => {
    const fetchSteps = async () => {
      const available = await Pedometer.isAvailableAsync();
      isPedometerAvailableRef.current = available;

      if (!isPedometerAvailableRef.current) {
        Toast.error("Pedometer not available on this device");
        return;
      }

      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();

      const result = await Pedometer.getStepCountAsync(start, end);
      setSteps(result.steps);
    };
    fetchSteps();
    const interval = setInterval(fetchSteps, 1000);

    return () => clearInterval(interval);
  }, []);

  // Update distance and distanceUnit whenever steps changes
  useEffect(() => {
    const distanceInMeters = steps * 0.762;
    if (distanceInMeters >= 1000) {
      setDistance((distanceInMeters / 1000).toFixed(2));
      setDistanceUnit("KM");
    } else {
      setDistance(Math.round(distanceInMeters));
      setDistanceUnit("Meter");
    }
  }, [steps]);

  // Pure function, no state updates here
  const calculateStats = () => {
    const progress = Math.min((steps / goal) * 100, 100);
    const calories = Math.round(steps * 0.04);
    return { progress, calories };
  };

  const { progress, calories } = calculateStats();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.progressSection}>
          <CircularProgress progress={progress} steps={steps} />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="walk" size={20} color="#FF3B30" />

            <Text style={styles.statValue}>{distance}</Text>
            <Text style={styles.statLabel}>{distanceUnit}</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="flame" size={20} color="#FF3B30" />
            <Text style={styles.statValue}>{calories}</Text>
            <Text style={styles.statLabel}>KCAL</Text>
          </View>
        </View>

        <View style={styles.chartSection}>
          <WeeklyChart />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  progressSection: {
    alignItems: "center",
    marginTop: 10,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 40,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "#FF3B30",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
  statLabel: {
    color: "black",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  chartSection: {
    marginBottom: 40,
  },
});

export default StepTracker;
