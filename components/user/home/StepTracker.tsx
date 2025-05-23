import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import WeeklyChart from "./WeeklyChart";
import CircularProgress from "./CircularProgress";

const StepTracker: React.FC = () => {
  const steps = 2126;
  const goal = 10000;
  const progress = (steps / goal) * 100;
  const miles = 0.99;
  const calories = 27;
  const floors = 2;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Today</Text>
      </View> */}

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.progressSection}>
          <CircularProgress progress={progress} steps={steps} />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="walk" size={20} color="#FF3B30" />
            <Text style={styles.statValue}>{miles}</Text>
            <Text style={styles.statLabel}>MILES</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="flame" size={20} color="#FF3B30" />
            <Text style={styles.statValue}>{calories}</Text>
            <Text style={styles.statLabel}>KCAL</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="trending-up" size={20} color="#FF3B30" />
            <Text style={styles.statValue}>{floors}</Text>
            <Text style={styles.statLabel}>FLOORS</Text>
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
    backgroundColor: "#f0efed",
    borderRadius: 5,
    paddingVertical: 10,
  },
  // header: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   paddingHorizontal: 20,
  //   paddingVertical: 15,
  // },
  // headerTitle: {
  //   color: '#fff',
  //   fontSize: 18,
  //   fontWeight: '600',
  // },
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
