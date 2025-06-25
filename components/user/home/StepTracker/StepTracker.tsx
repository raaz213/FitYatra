import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pedometer } from "expo-sensors";
import CircularProgress from "./CircularProgress";
import GoalModal from "./StepTrackerGoalModal";
import { Button } from "react-native-paper";
import {
  addStepCounterStats,
  getGoal,
  setGoal,
} from "../../../../services/user/exercise/StepCounter";
import StepTrackerLogModel from "./StepTrackerLogModal";

const StepTracker: React.FC = () => {
  const isPedometerAvailableRef = useRef<boolean | null>(null);

  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState<number | string>(0);
  const [calories, setCalories] = useState(0);
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [logModalVisible, setLogModelVisible] = useState(false);
  const [goals, setGoals] = useState(0);
  const [goalId, setGoalId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Keep latest stats snapshot here for API calls
  const latestStatsRef = useRef({
    steps: 0,
    distance: 0,
    calories: 0,
  });

  // Update latest snapshot anytime stats update
  useEffect(() => {
    latestStatsRef.current = {
      steps,
      distance: Number(distance),
      calories,
    };
  }, [steps, distance, calories]);

  // Fetch current goal on mount
  useEffect(() => {
    getGoalForStepCounter();
  }, []);

  // Poll pedometer data every second while goal active and not expired
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let alertShown = false;

    const fetchSteps = async () => {
      const now = new Date();

      const available = await Pedometer.isAvailableAsync();
      isPedometerAvailableRef.current = available;

      if (!available) {
        console.log("No pedometer available");
        return;
      }

      if (endDate && endDate < now) {
        if (!alertShown) {
          alertShown = true;
          Alert.alert(
            "Goal expired",
            "Your step goal has expired. Please set a new goal."
          );
          setGoals(0);
          setSteps(0);
          setDistance(0);
          setCalories(0);
          // Send final stats before reset
          await setStepCounterStats();
        }
        return;
      }

      if (!startDate) {
        console.log("Start date not set");
        return;
      }

      const start = new Date(startDate);
      const result = await Pedometer.getStepCountAsync(start, now);
      setSteps(result.steps);
    };

    if (goals > 0) {
      fetchSteps();
      interval = setInterval(fetchSteps, 1000);
    }

    return () => clearInterval(interval);
  }, [goals, startDate, endDate]);

  // Calculate distance and calories whenever steps update
  useEffect(() => {
    const distanceInMeters = steps * 0.762;
    setDistance(distanceInMeters.toFixed(2));
    setCalories(Math.round(steps * 0.04));
  }, [steps]);

  // Snapshot stats 3 seconds before goal expiry, API call at expiry
  useEffect(() => {
    if (!endDate) return;

    const now = new Date();
    const end = new Date(endDate);

    if (now >= end) return;

    const timeoutDelay = end.getTime() - now.getTime();

    const snapshotDelay = Math.max(0, timeoutDelay - 3000);

    const snapShotTimeout = setTimeout(() => {
      latestStatsRef.current = {
        steps,
        distance: Number(distance),
        calories,
      };
    }, snapshotDelay);

    const apiTimeout = setTimeout(() => {
      setStepCounterStats();
    }, timeoutDelay);

    return () => {
      clearTimeout(snapShotTimeout);
      clearTimeout(apiTimeout);
    };
  }, [endDate, steps, distance, calories]);

  // Load goal from backend
  const getGoalForStepCounter = async () => {
    try {
      const response = await getGoal();
      setGoals(response.goal);
      setGoalId(response._id);
      setStartDate(new Date(response.createdAt));
      setEndDate(new Date(response.expiresAt));

      if (response.goal === 0) {
        setLogModelVisible(true);
      }
    } catch (error) {
      console.log("Error fetching goal:", error);
    }
  };

  // Set new goal handler
  const handleSetGoal = async (goalInput: number) => {
    try {
      if (goalInput <= 0) {
        Alert.alert("Please enter a valid step goal.");
        return;
      }
      await setGoal(goalInput);
      await getGoalForStepCounter();
      setGoalModalVisible(false);
    } catch (error) {
      console.log("Error setting goal:", error);
      Alert.alert("Error", "Failed to set goal. Please try again.");
      setGoalModalVisible(false);
    }
  };

  // Send final step stats to backend
  const setStepCounterStats = async () => {
    try {
      if (goalId !== null) {
        const { steps, distance, calories } = latestStatsRef.current;
        await addStepCounterStats(goalId, steps, distance, calories);
      }
    } catch (error) {
      console.log("Error sending step counter stats:", error);
    }
  };

  const calculateProgress = () => {
    return Math.min((steps / goals) * 100, 100);
  };

  const progress = calculateProgress();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Step Tracker</Text>
        <Text style={styles.headerSubtitle}>Today's Progress</Text>
      </View>

      <View style={styles.content}>
        {goals > 0 ? (
        <View style={{ marginBottom: 16 }}> 
    
            <View style={styles.progressSection}>
              <View style={styles.progressContainer}>
                <CircularProgress progress={progress} steps={steps} />
              </View>
              <View style={styles.goalInfo}>
                <Text style={styles.goalText}>Goal: {goals} steps</Text>
                <Text style={styles.remainingText}>
                  {steps >= goals
                    ? "Goal achieved! 🎉"
                    : `${goals - steps} steps remaining`}
                </Text>
              </View>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <View style={styles.statIconContainer}>
                    <Ionicons name="walk" size={24} color="#2563EB" />
                  </View>
                  <Text style={styles.statValue}>
                    {Number(distance) >= 1000
                      ? Number(distance) / 1000
                      : distance}
                  </Text>
                  <Text style={styles.statLabel}>
                    {Number(distance) >= 1000 ? "KM" : "METER"}
                  </Text>
                </View>

                <View style={styles.statCard}>
                  <View style={styles.statIconContainer}>
                    <Ionicons name="flame" size={24} color="#EF4444" />
                  </View>
                  <Text style={styles.statValue}>{calories}</Text>
                  <Text style={styles.statLabel}>KCAL</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.noGoalSection}>
            <View style={styles.noGoalCard}>
              <View style={styles.noGoalIconContainer}>
                <Ionicons size={48} color="#6366F1" />
              </View>
              <Text style={styles.noGoalTitle}>Set Your Daily Goal</Text>
              <Text style={styles.noGoalSubtitle}>
                Set your daily step goal to start tracking your progress and
                stay motivated!
              </Text>
            </View>
          </View>
        )}

        <View style={styles.actionsContainer}>
          {goals <= 0 && (
            <Button
              mode="contained"
              onPress={() => setGoalModalVisible(true)}
              icon="target"
              style={styles.goalButton}
              contentStyle={styles.actionButtonContent}
              labelStyle={styles.goalButtonLabel}
            >
              Set Goal
            </Button>
          )}
          <Button
            mode="outlined"
            icon="clipboard-text-outline"
            onPress={() => setLogModelVisible(true)}
            labelStyle={styles.logButtonLabel}
            style={styles.logButton}
            contentStyle={styles.actionButtonContent}
          >
            View Log
          </Button>
        </View>
      </View>

      <GoalModal
        visible={goalModalVisible}
        onClose={() => setGoalModalVisible(false)}
        onSetGoal={handleSetGoal}
      />
      <StepTrackerLogModel
        visible={logModalVisible}
        onClose={() => setLogModelVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 5,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  progressSection: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "#FFFFFF",
    marginTop: 16,
    borderRadius: 20,
    elevation: 3,
  },
  progressContainer: {
    marginBottom: 24,
  },
  goalInfo: {
    alignItems: "center",
  },
  goalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  remainingText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  statsContainer: {
    marginTop: 20,
  },
  noGoalSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  noGoalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    maxWidth: 300,
  },
  noGoalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  noGoalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
    textAlign: "center",
  },
  noGoalSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    elevation: 3,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 12,
    paddingBottom: 24,
  },
  logButton: {
    flex: 1,
    borderRadius: 16,
    borderColor: "#2563EB",
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
  },
  goalButton: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#2563EB",
  },
  actionButtonContent: {
    height: 56,
  },
  logButtonLabel: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "600",
  },
  goalButtonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default StepTracker;
