"use client";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Text } from "react-native-paper";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { addWaterIntake, getWaterIntakeLog } from "../../../../services/both/exercise/WaterInake";

// TypeScript type for water intake log entry
type WaterEntry = {
  _id: string;
  user: string;
  water: number;
  createdAt: string;
  updatedAt: string;
};

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
  <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback>
          <View style={styles.customModal}>
            <View style={styles.customModalHeader}>
              <View style={styles.modalIconContainer}>
                <MaterialCommunityIcons name="water-plus" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.customModalTitle}>Add Custom Amount</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="number-pad"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#94A3B8"
              />
              <View style={styles.unitContainer}>
                <Text style={styles.unitText}>ml</Text>
              </View>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.addButton,
                  (!value || isNaN(Number(value))) && styles.addButtonDisabled,
                ]}
                onPress={onSubmit}
                disabled={!value || isNaN(Number(value))}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const WaterIntake = () => {
  const [waterIntakeLog, setWaterIntakeLog] = useState<WaterEntry[]>([]);
  const [LogModalVisible, setLogModalVisible] = useState(false);
  const [AddModalVisible, setAddModalVisible] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [goal, setGoal] = useState(3000);

  // Fetch water intake logs from backend for today
  const fetchWaterLog = async () => {
    try {
      const logs = await getWaterIntakeLog();
      setWaterIntakeLog(
        logs.map((entry: any) => ({
          _id: entry._id,
          user: entry.user ?? "",
          water: entry.water,
          createdAt: entry.createdAt,
          updatedAt: entry.updatedAt,
        }))
      );
    } catch (error) {
      console.error("Error fetching water intake log:", error);
    }
  };

  useEffect(() => {
    fetchWaterLog();

    // Optional: Refresh water intake logs every minute
    const interval = setInterval(fetchWaterLog, 60000);
    return () => clearInterval(interval);
  }, []);

  // Calculate total water intake for today
  const totalIntake = waterIntakeLog.reduce((acc, entry) => acc + entry.water, 0);

  const progress = Math.min((totalIntake / goal) * 100, 100);

  const getHydrationStatus = () => {
    if (progress < 30) return { text: "Need More Water", color: "#EF4444" };
    if (progress < 70) return { text: "Getting There", color: "#F59E0B" };
    if (progress < 100) return { text: "Almost There", color: "#10B981" };
    return { text: "Goal Reached!", color: "#06407a" };
  };

  const hydrationStatus = getHydrationStatus();

  const handleAddWater = async (amount: number) => {
    try {
      await addWaterIntake(amount);
      setCustomAmount("");
      setAddModalVisible(false);
      await fetchWaterLog(); 
    } catch (error) {
      console.error(error);
    }
  };

  const LogModal = () => (
    <Modal
      animationType="slide"
      transparent
      visible={LogModalVisible}
      onRequestClose={() => setLogModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setLogModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderLeft}>
                  <View style={styles.logModalIconContainer}>
                    <MaterialCommunityIcons name="clipboard-list" size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.modalTitle}>Today's Water Log</Text>
                </View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setLogModalVisible(false)}
                >
                  <MaterialCommunityIcons name="close" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.logScrollContent}
              >
                {waterIntakeLog.length > 0 ? (
                  waterIntakeLog.map((entry) => (
                    <View key={entry._id} style={styles.logEntry}>
                      <View style={styles.logTime}>
                        <View style={styles.logEntryIcon}>
                          <MaterialCommunityIcons name="water" size={16} color="#06407a" />
                        </View>
                        <View>
                          <Text style={styles.timeText}>
                            {moment(entry.createdAt).format("MMM DD")}
                          </Text>
                          <Text style={styles.timeSubText}>
                            {moment(entry.createdAt).format("HH:mm")}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.amountContainer}>
                        <Text style={styles.amountText}>+{entry.water}</Text>
                        <Text style={styles.amountUnit}>ml</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <View style={styles.emptyContainer}>
                    <View style={styles.emptyIconContainer}>
                      <MaterialCommunityIcons name="water-off" size={48} color="#94A3B8" />
                    </View>
                    <Text style={styles.emptyTitle}>No Records Today</Text>
                    <Text style={styles.emptyText}>
                      Start tracking your water intake to see your progress here.
                    </Text>
                  </View>
                )}
              </ScrollView>

              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setLogModalVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <MaterialCommunityIcons name="water" size={32} color="#FFFFFF" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>Water Intake</Text>
            <Text style={styles.date}>{moment().format("dddd, MMMM D")}</Text>
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressInner}>
            <AnimatedCircularProgress
              size={200}
              width={16}
              fill={progress}
              tintColor="#06407a"
              backgroundColor="#E2E8F0"
              rotation={0}
              lineCap="round"
              backgroundWidth={8}
            >
              {() => (
                <View style={styles.progressTextContainer}>
                  <Text style={styles.progressValue}>{Math.round(progress)}%</Text>
                  <Text style={styles.progressLabel}>
                    {totalIntake} / {goal} ml
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>

            <View style={styles.statusContainer}>
              <Text style={[styles.statusText, { color: hydrationStatus.color }]}>
                {hydrationStatus.text}
              </Text>
              <Text style={styles.remainingText}>
                {Math.max(goal - totalIntake, 0)} ml remaining
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Add</Text>
          <View style={styles.quickAddContainer}>
            {[250, 500, 750].map((amount) => (
              <TouchableOpacity
                key={amount}
                style={styles.quickAddButton}
                onPress={() => handleAddWater(amount)}
                activeOpacity={0.7}
              >
                <View style={styles.quickAddIcon}>
                  <MaterialCommunityIcons name="cup-water" size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.quickAddText}>{amount} ml</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => setAddModalVisible(true)}
          >
            <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
            <Text style={styles.customButtonText}>Custom Amount</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logButton}
            onPress={() => setLogModalVisible(true)}
          >
            <MaterialCommunityIcons name="history" size={20} color="#06407a" />
            <Text style={styles.logButtonText}>View Water Log</Text>
          </TouchableOpacity>
        </View>
      </View>

      <LogModal />
      <CustomModal
        visible={AddModalVisible}
        onClose={() => setAddModalVisible(false)}
        value={customAmount}
        onChange={setCustomAmount}
        onSubmit={() => {
          const amount = parseInt(customAmount, 10);
          if (amount > 0) {
            handleAddWater(amount);
          }
        }}
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
    paddingBottom: 24,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  date: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
    marginTop: 4,
  },

  contentContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  progressContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 32,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
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
    fontSize: 36,
    fontWeight: "800",
    color: "#06407a",
    letterSpacing: -1,
  },
  progressLabel: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 4,
    fontWeight: "500",
  },
  statusContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  statusText: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  remainingText: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonSection: {
    marginHorizontal: 20,
    marginTop: 16,


  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  quickAddContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  quickAddButton: {
    flex: 1,
    height: 100,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F9FF",
    borderWidth: 2,
    borderColor: "#E0F2FE",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  quickAddIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#06407a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#06407a",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  quickAddText: {
    fontSize: 16,
    color: "#0E7490",
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  customButton: {
    backgroundColor: "#06407a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#06407a",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  customButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  logButton: {
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
  logButtonText: {
    color: "#06407a",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    width: "100%",
    maxWidth: 400,
    maxHeight: "85%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  modalHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logModalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#06407a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    letterSpacing: -0.3,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  logScrollContent: {
    padding: 24,
    paddingBottom: 8,
  },
  logEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 8,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  logTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  logEntryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E0F2FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    letterSpacing: -0.2,
  },
  timeSubText: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
    marginTop: 2,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#06407a",
    letterSpacing: -0.3,
  },
  amountUnit: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
    marginTop: 2,
  },
  logSummary: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginLeft: 8,
    letterSpacing: -0.3,
  },
  summaryStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryStatItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryStatValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#06407a",
    marginBottom: 4,
    letterSpacing: -0.4,
  },
  summaryStatLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: -0.3,
  },
  emptyText: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "500",
  },
  modalCloseButton: {
    backgroundColor: "#06407a",
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#06407a",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  modalCloseButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  // Custom modal styles
  customModal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: 350,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 20,
  },
  customModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  modalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#06407a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  customModalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    letterSpacing: -0.3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  input: {
    flex: 1,
    height: 56,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#F8FAFC",
    color: "#1E293B",
    fontWeight: "500",
  },
  unitContainer: {
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
  },
  unitText: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E2E8F0",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#64748B",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  addButton: {
    flex: 1,
    backgroundColor: "#06407a",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#06407a",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonDisabled: {
    backgroundColor: "#CBD5E1",
    shadowOpacity: 0,
    elevation: 0,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});

export default WaterIntake;
