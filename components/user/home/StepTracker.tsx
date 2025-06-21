import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pedometer } from "expo-sensors";
import WeeklyChart from "./WeeklyChart";
import CircularProgress from "./CircularProgress";
import { Toast } from "toastify-react-native";
import { Button, Modal, Surface, TextInput } from "react-native-paper";
import { setGoal } from "../../../services/user/exercise/Exercise";
import { StepCounterStats } from "../../../types/user/exercise/Workout";

const StepTracker: React.FC = () => {
  const isPedometerAvailableRef = useRef<boolean | null>(null);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState<number | string>(0);
  const [distanceUnit, setDistanceUnit] = useState("Meter");
  const [customModalVisible, setCustomModalVisible] = useState(false);
  const [goalValue, setGoalValue] = useState(0);
  const [goals, setGoals] = useState(0);
  const [stepStats, setStepStats] = useState<StepCounterStats[]>([])

  useEffect(() => {
    const fetchSteps = async () => {
      const available = await Pedometer.isAvailableAsync();
      isPedometerAvailableRef.current = available;

      if (!isPedometerAvailableRef.current) {
        console.log("No pedometer in this device");
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

  const calculateStats = () => {
    const progress = Math.min((steps / goals) * 100, 100);
    const calories = Math.round(steps * 0.04);
    return { progress, calories };
  };
  const setStepGoal = async () => {
    try {
      const response = await setGoal(goalValue);
      setGoals(response.goal);
      console.log(response.goal);
      setCustomModalVisible(false);
    } catch (error) {
      console.log(error);
      setCustomModalVisible(false);
    }
  };

  const { progress, calories } = calculateStats();

  useEffect(() => {
      setStepStats((prev)=>[...prev,{
        steps : steps,
        distance : Number(distance),
        calories : calories,
      }])    
  }, []);
  console.log(stepStats)

  const CustomModal = () => (
    <Modal
      visible={customModalVisible}
      onDismiss={() => setCustomModalVisible(false)}
      contentContainerStyle={styles.modalOverlay}
    >
      <TouchableWithoutFeedback onPress={() => setCustomModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <TouchableWithoutFeedback>
            <Surface style={styles.customModal}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Set Daily Goal</Text>
                <Text style={styles.modalSubtitle}>
                  Choose your target steps for today
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={goalValue == 0 ? "" : goalValue.toString()}
                  onChangeText={(text) => setGoalValue(Number(text))}
                  placeholder="Enter step count"
                  keyboardType="number-pad"
                  placeholderTextColor="#94A3B8"
                  mode="outlined"
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#2563EB"
                  theme={{
                    colors: {
                      primary: "#2563EB",
                      background: "#FFFFFF",
                    },
                  }}
                />
                <View style={styles.unitBadge}>
                  <Text style={styles.unitText}>steps</Text>
                </View>
              </View>

              <View style={styles.buttonRow}>
                <Button
                  mode="outlined"
                  onPress={() => setCustomModalVisible(false)}
                  labelStyle={styles.cancelButtonLabel}
                  style={styles.cancelButton}
                  contentStyle={styles.buttonContent}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  labelStyle={styles.addButtonLabel}
                  style={styles.addButton}
                  contentStyle={styles.buttonContent}
                  onPress={setStepGoal}
                >
                  Set Goal
                </Button>
              </View>
            </Surface>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Step Tracker</Text>
        <Text style={styles.headerSubtitle}>Today's Progress</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.progressSection}>
          <View style={styles.progressContainer}>
            <CircularProgress progress={progress} steps={steps} />
          </View>
          <View style={styles.goalInfo}>
            <Text style={styles.goalText}>Goal: {Number(goals)} steps</Text>
            <Text style={styles.remainingText}>
              {steps >= Number(goals)
                ? "Goal achieved! 🎉"
                : `${Number(goals) - steps} steps remaining`}
            </Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name="walk" size={24} color="#2563EB" />
              </View>
              <Text style={styles.statValue}>{distance}</Text>
              <Text style={styles.statLabel}>{distanceUnit}</Text>
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

        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Weekly Overview</Text>
            <Text style={styles.chartSubtitle}>Your progress this week</Text>
          </View>
          <View style={styles.chartContainer}>
            <WeeklyChart />
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <Button
            mode="outlined"
            icon="clipboard-text-outline"
            labelStyle={styles.logButtonLabel}
            style={styles.logButton}
            contentStyle={styles.actionButtonContent}
          >
            View Log
          </Button>
          <Button
            mode="contained"
            onPress={() => setCustomModalVisible(true)}
            icon="target"
            style={styles.goalButton}
            contentStyle={styles.actionButtonContent}
            labelStyle={styles.goalButtonLabel}
          >
            Set Goal
          </Button>
        </View>
      </View>
      <CustomModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#FFFFFF",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
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
  chartSection: {
    marginTop: 24,
    marginBottom: 32,
  },
  chartHeader: {
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
  chartContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  customModal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 32,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 32,
    position: "relative",
  },
  input: {
    fontSize: 18,
    backgroundColor: "#FFFFFF",
  },
  unitBadge: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -12 }],
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  unitText: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 16,
    borderColor: "#D1D5DB",
    borderWidth: 2,
  },
  addButton: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#2563EB",
  },
  buttonContent: {
    height: 56,
  },
  cancelButtonLabel: {
    color: "#6B7280",
    fontSize: 16,
    fontWeight: "600",
  },
  addButtonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default StepTracker;
