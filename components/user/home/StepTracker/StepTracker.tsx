"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Pedometer } from "expo-sensors";
import { StatusBar } from "expo-status-bar";
import { Target, Activity, Flame, MapPin } from "lucide-react-native";
import CircularProgress from "./CircularProgress";
import GoalModal from "./StepTrackerGoalModal";
import StepTrackerLogModel from "./StepTrackerLogModal";
import {
  addStepCounterStats,
  getGoal,
  setGoal,
} from "../../../../services/both/exercise/StepCounter";

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
          alert(
            "Goal expired. Your step goal has expired. Please set a new goal."
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
        alert("Please enter a valid step goal.");
        return;
      }
      await setGoal(goalInput);
      await getGoalForStepCounter();
      setGoalModalVisible(false);
    } catch (error) {
      console.log("Error setting goal:", error);
      alert("Error: Failed to set goal. Please try again.");
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Step Tracker</Text>
          <Text style={styles.headerSubtitle}>Today's Progress</Text>
        </View>
      </View>

      <View style={styles.mainContent}>
        {goals > 0 ? (
          <>
            {/* Progress Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Daily Progress</Text>
                <View style={styles.progressChip}>
                  <Text style={styles.progressChipText}>
                    {Math.round(progress)}%
                  </Text>
                </View>
              </View>
              <View style={styles.progressContainer}>
                <CircularProgress progress={progress} steps={steps} />
              </View>
              <View style={styles.goalInfo}>
                <Text style={styles.goalText}>
                  Goal: {goals.toLocaleString()} steps
                </Text>
                <Text style={styles.remainingText}>
                  {steps >= goals
                    ? "Goal achieved! 🎉"
                    : `${(goals - steps).toLocaleString()} steps remaining`}
                </Text>
              </View>
            </View>

            {/* Statistics Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Today's Statistics</Text>
              </View>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <View style={[styles.statIconContainer, styles.distanceIcon]}>
                    <MapPin size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.statValue}>
                    {Number(distance) >= 1000
                      ? (Number(distance) / 1000).toFixed(2)
                      : Number(distance).toFixed(0)}
                  </Text>
                  <Text style={styles.statLabel}>
                    {Number(distance) >= 1000 ? "KM" : "METERS"}
                  </Text>
                </View>
                <View style={styles.statCard}>
                  <View style={[styles.statIconContainer, styles.caloriesIcon]}>
                    <Flame size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.statValue}>{calories}</Text>
                  <Text style={styles.statLabel}>CALORIES</Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          /* No Goal Section */

          <View style={styles.noGoalContainer}>
            <View style={styles.noGoalIconContainer}>
              <Target size={48} color="#FFFFFF" />
            </View>
            <Text style={styles.noGoalTitle}>Set Your Daily Goal</Text>
            <Text style={styles.noGoalSubtitle}>
              Set your daily step goal to start tracking your progress and stay
              motivated!
            </Text>
          </View>
        )}

        <View style={styles.actionsContainer}>
          {goals <= 0 && (
            <TouchableOpacity
              onPress={() => setGoalModalVisible(true)}
              style={styles.primaryButton}
            >
              <Target size={20} color="white" />
              <Text style={styles.primaryButtonText}>Set Goal</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => setLogModelVisible(true)}
            style={styles.secondaryButton}
          >
            <Activity size={20} color="#06407a" />
            <Text style={styles.secondaryButtonText}>View Log</Text>
          </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
  header: {
    backgroundColor: "#06407a",
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#06407a",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  headerContent: {
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
  },

  mainContent: {
    paddingBottom: 20,
    paddingTop: 8,
    flex: 1,
  },
  section: {
    backgroundColor: "#ffffffff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000000ff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E293B",
    letterSpacing: -0.3,
  },
  progressChip: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },
  progressChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#06407a",
  },
  progressContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  goalInfo: {
    alignItems: "center",
  },
  goalText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  remainingText: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  distanceIcon: {
    backgroundColor: "#10B981",
  },
  caloriesIcon: {
    backgroundColor: "#F59E0B",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  noGoalContainer: {
    alignItems: "center",

    marginHorizontal: 20,
    marginTop: 20,

    padding: 24,
  },
  noGoalIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#06407a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    shadowColor: "#06407a",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  noGoalTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 16,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  noGoalSubtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
    fontWeight: "500",
  },
  actionsContainer: {
    gap: 16,
    marginTop: 20,
    marginHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: "#06407a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#06407a",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E0E7FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  secondaryButtonText: {
    color: "#06407a",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
    letterSpacing: 0.2,
  },
});

export default StepTracker;
