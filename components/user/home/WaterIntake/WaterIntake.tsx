"use client";

import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Text, Button, Surface, IconButton } from "react-native-paper";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { window } from "../../../../constants/sizes";
import {
  addWaterIntake,
  getWaterIntake,
} from "../../../../services/user/exercise/WaterInake";
import { GetWaterIntake } from "../../../../types/user/exercise/WaterIntake";

const CustomModal = ({
  visible,
  onClose,
  value,
  onChange,
  onSubmit,
}: {
  visible: boolean;
  onClose: () => void;
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback>
          <Surface style={styles.customModal} elevation={5}>
            <Text variant="titleLarge" style={styles.modalTitle}>
              Add Custom Amount
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="number-pad"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#94A3B8"
              />
              <Text variant="bodyLarge" style={styles.unitText}>
                ml
              </Text>
            </View>

            <View style={styles.buttonRow}>
              <Button
                mode="outlined"
                onPress={onClose}
                labelStyle={{ color: "#06407a" }}
                style={styles.cancelButton}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={onSubmit}
                labelStyle={{ color: "#FFFFFF" }}
                style={styles.addButton}
                disabled={!value || isNaN(Number.parseInt(value))}
              >
                Add
              </Button>
            </View>
          </Surface>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const WaterIntake = () => {
  const [intake, setIntake] = useState(0); // ml
  const [goal, setGoal] = useState(3000); // ml
  const [intakeLog, setIntakeLog] = useState([
    { time: "08:30 AM", amount: 250 },
    { time: "10:15 AM", amount: 500 },
    { time: "12:45 PM", amount: 250 },
  ]);

  // Modal states
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [customModalVisible, setCustomModalVisible] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [waterIntakeLog, setWaterIntakeLog] = useState<GetWaterIntake[]>([]);

  useEffect(() => {
    const getWaterLog = async () => {
      try {
        const response = await getWaterIntake();

        const now = moment();
        const tenMinutesAgo = moment().subtract(2, "minutes");

        const recentLogs = response.filter((entry: GetWaterIntake) =>
          moment(entry.createdAt).isBetween(tenMinutesAgo, now)
        );

        setWaterIntakeLog(recentLogs);
      } catch (error) {
        console.log("Error fetching water intake:", error);
      }
    };

    getWaterLog();
  }, []);

  const calcTotalWaterIntake = waterIntakeLog.reduce(
    (acc, item) => acc + item.water,
    0
  );

  // const now = new Date();
  // now.setHours(0,0,0,0);

  const addWater = async (amount: number) => {
    try {
      await addWaterIntake(amount);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCustomAdd = () => {
    const amount = Number.parseInt(customAmount);
    if (!isNaN(amount) && amount > 0) {
      addWater(amount);
      setCustomAmount("");
      setCustomModalVisible(false);
    }
  };

  const progress = (calcTotalWaterIntake / goal) * 100;

  const getHydrationStatus = () => {
    if (progress < 30) return { text: "Need More Water", color: "#FF5252" };
    if (progress < 70) return { text: "Getting There", color: "#FFB300" };
    if (progress < 100) return { text: "Almost There", color: "#4CAF50" };
    return { text: "Goal Reached!", color: "#06407a" };
  };

  const hydrationStatus = getHydrationStatus();

  // Log Modal
  const LogModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={logModalVisible}
      onRequestClose={() => setLogModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setLogModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text variant="titleLarge" style={styles.modalTitle}>
                  Today's Water Log
                </Text>
                <IconButton
                  icon="close"
                  size={24}
                  onPress={() => setLogModalVisible(false)}
                />
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.logScrollContent}
              >
                {waterIntakeLog.length > 0 ? (
                  waterIntakeLog.map((entry, index) => (
                    <Surface key={index} style={styles.logEntry} elevation={1}>
                      <View style={styles.logTime}>
                        <MaterialCommunityIcons
                          name="water"
                          size={20}
                          color="#2196F3"
                        />
                        <View>
                          <Text variant="bodyMedium" style={styles.timeText}>
                            {entry.createdAt.toString().slice(0, 10)}
                          </Text>
                          <Text variant="bodyMedium" style={styles.timeText}>
                            {entry.createdAt.toString().slice(12, 19)}
                          </Text>
                        </View>
                      </View>
                      <Text variant="bodyLarge" style={styles.amountText}>
                        +{entry.water} ml
                      </Text>
                    </Surface>
                  ))
                ) : (
                  <Text style={styles.emptyText}>
                    No water intake recorded today
                  </Text>
                )}

                <Surface style={styles.logSummary} elevation={1}>
                  <Text variant="bodyLarge" style={styles.summaryText}>
                    Total: {calcTotalWaterIntake} ml
                  </Text>
                  <Text variant="bodyMedium" style={styles.summaryText}>
                    Goal: {goal} ml
                  </Text>
                  <Text variant="bodyMedium" style={styles.summaryText}>
                    Remaining: {Math.max(goal - calcTotalWaterIntake, 0)} ml
                  </Text>
                </Surface>
              </ScrollView>

              <Button
                mode="contained"
                onPress={() => setLogModalVisible(false)}
                style={styles.modalButton}
              >
                Close
              </Button>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          💧 Water Intake
        </Text>
        <Text variant="bodyMedium" style={styles.date}>
          {moment().format("dddd, MMMM D")}
        </Text>
      </View>

      <Surface style={styles.progressContainer} elevation={3}>
        <View style={styles.progressInner}>
          <AnimatedCircularProgress
            size={180}
            width={15}
            fill={progress}
            tintColor="#06407a"
            backgroundColor="#E0E0E0"
            rotation={0}
            lineCap="round"
            backgroundWidth={8}
          >
            {() => (
              <View style={styles.progressTextContainer}>
                <Text variant="displaySmall" style={styles.progressValue}>
                  {Math.round(progress)}%
                </Text>
                <Text variant="bodyMedium" style={styles.progressLabel}>
                  {calcTotalWaterIntake} / {goal} ml
                </Text>
              </View>
            )}
          </AnimatedCircularProgress>

          <View style={styles.statusContainer}>
            <Text
              variant="titleMedium"
              style={[styles.statusText, { color: hydrationStatus.color }]}
            >
              {hydrationStatus.text}
            </Text>
            <Text variant="bodyMedium" style={styles.remainingText}>
              {Math.max(goal - calcTotalWaterIntake, 0)} ml remaining
            </Text>
          </View>
        </View>
      </Surface>

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Quick Add
      </Text>
      <View style={styles.quickAddContainer}>
        {[250, 500, 750].map((amount) => (
          <TouchableOpacity
            key={amount}
            style={styles.quickAddButton}
            onPress={() => addWater(amount)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="cup-water"
              size={28}
              color="#06407a"
            />
            <Text variant="bodyLarge" style={styles.quickAddText}>
              {amount} ml
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.actionsContainer}>
        <Button
          mode="contained"
          onPress={() => setCustomModalVisible(true)}
          icon="plus"
          style={styles.customButton}
          contentStyle={styles.buttonContent}
        >
          Custom
        </Button>
      </View>

      <Button
        mode="outlined"
        onPress={() => setLogModalVisible(true)}
        icon="history"
        labelStyle={{ color: "#06407a" }}
        style={styles.logButton}
        contentStyle={styles.logButtonContent}
      >
        View Water Log
      </Button>

      <LogModal />
      <CustomModal
        visible={customModalVisible}
        onClose={() => setCustomModalVisible(false)}
        value={customAmount}
        onChange={setCustomAmount}
        onSubmit={handleCustomAdd}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontWeight: "bold",
    color: "#06407a",
  },
  date: {
    color: "#444757",
    marginTop: 4,
  },
  progressContainer: {
    marginHorizontal: 24,
    marginTop: 8,
    borderRadius: 5,
    padding: 24,
    backgroundColor: "transparent",
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 0,
  },
  progressInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressValue: {
    fontWeight: "bold",
    color: "#06407a",
  },
  progressLabel: {
    color: "#06407a",
    marginTop: 4,
  },
  statusContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  statusText: {
    fontWeight: "600",
    marginBottom: 4,
  },
  remainingText: {
    color: "#64748B",
  },
  sectionTitle: {
    fontWeight: "600",
    color: "#06407a",
    marginTop: 6,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  quickAddContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  quickAddButton: {
    width: (window.width - 64) / 3.3,
    height: 90,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    borderWidth: 1,
    borderColor: "#BBDEFB",
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  quickAddText: {
    color: "#06407a",
    fontWeight: "600",
    marginTop: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginTop: 24,
  },
  resetButton: {
    flex: 1,
    marginRight: 8,
    borderRadius: 12,
    borderColor: "#06407a",
  },
  customButton: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 12,
    backgroundColor: "#06407a",
  },
  buttonContent: {
    height: 48,
  },
  logButton: {
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 12,
    borderColor: "#06407a",
  },
  logButtonContent: {
    height: 48,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    width: "90%",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontWeight: "bold",
    color: "#06407a",
  },
  modalButton: {
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: "#2196F3",
  },
  logScrollContent: {
    paddingBottom: 8,
  },
  logEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "#F8FAFC",
  },
  logTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    marginLeft: 8,
    color: "#1E293B",
  },
  amountText: {
    fontWeight: "500",
    color: "#2196F3",
  },
  emptyText: {
    textAlign: "center",
    color: "#64748B",
    fontStyle: "italic",
    paddingVertical: 24,
  },
  logSummary: {
    backgroundColor: "#F1F5F9",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 8,
  },
  summaryText: {
    color: "#1E293B",
    marginBottom: 6,
  },

  // Custom modal styles
  customModal: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    width: "85%",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  input: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#F8FAFC",
    color: "#1E293B",
  },
  unitText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#64748B",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    borderRadius: 12,
    borderColor: "#CBD5E1",
  },
  addButton: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 12,
    backgroundColor: "#06407a",
  },
});

export default WaterIntake;
