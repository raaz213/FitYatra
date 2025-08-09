"use client";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, Button, Surface, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getStepCounterStats } from "../../../../services/both/exercise/StepCounter";
import { StepCounterStatsResponse } from "../../../../types/both/exercise/StepCounter";
import { ScrollView } from "react-native-gesture-handler";

interface StepTrackerLogModelProps {
  visible: boolean;
  onClose: () => void;
}

const StepTrackerLogModel = ({ visible, onClose }: StepTrackerLogModelProps) => {
  const [logs, setLogs] = useState<StepCounterStatsResponse[]>([]);

  useEffect(() => {
    if (!visible) return;
    const fetchLogs = async () => {
      try {
        const response = await getStepCounterStats();
        setLogs(response);
      } catch (error) {
        console.error("Error fetching step logs:", error);
      }
    };
    fetchLogs();
  }, [visible]);

  const totalCalories = logs.reduce((acc, log) => acc + log.calories, 0);
  const totalDistance = logs.reduce((acc, log) => acc + log.distance, 0);
  const totalSteps = logs.reduce((acc, log) => acc + log.steps, 0);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <View style={styles.headerIconContainer}>
                    <MaterialCommunityIcons
                      name="chart-line"
                      size={24}
                      color="#FFFFFF"
                    />
                  </View>
                  <Text style={styles.headerTitle}>Step Tracker Log</Text>
                </View>
                <TouchableWithoutFeedback onPress={onClose}>
                  <View style={styles.closeButton}>
                    <MaterialCommunityIcons
                      name="close"
                      size={20}
                      color="#64748B"
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>

              {/* Body */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
              >
                {logs.length > 0 ? (
                  <>
                    {logs.map((log, index) => (
                      <View key={index} style={styles.card}>
                        <View style={styles.cardHeader}>
                          <View style={styles.cardIconContainer}>
                            <MaterialCommunityIcons
                              name="shoe-print"
                              size={18}
                              color="#FFFFFF"
                            />
                          </View>
                          <Text style={styles.date}>
                            {new Date(log.createdAt).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </Text>
                        </View>
                        
                        <View style={styles.statsContainer}>
                          <View style={styles.statItem}>
                            <MaterialCommunityIcons
                              name="walk"
                              size={16}
                              color="#06407a"
                            />
                            <Text style={styles.statValue}>{log.steps.toLocaleString()}</Text>
                            <Text style={styles.statLabel}>steps</Text>
                          </View>
                          
                          <View style={styles.statItem}>
                            <MaterialCommunityIcons
                              name="map-marker-distance"
                              size={16}
                              color="#10B981"
                            />
                            <Text style={styles.statValue}>
                              {log.distance >= 1000 
                                ? (log.distance / 1000).toFixed(1)
                                : log.distance.toFixed(0)
                              }
                            </Text>
                            <Text style={styles.statLabel}>
                              {log.distance >= 1000 ? "km" : "m"}
                            </Text>
                          </View>
                          
                          <View style={styles.statItem}>
                            <MaterialCommunityIcons
                              name="fire"
                              size={16}
                              color="#F59E0B"
                            />
                            <Text style={styles.statValue}>{log.calories}</Text>
                            <Text style={styles.statLabel}>kcal</Text>
                          </View>
                        </View>
                      </View>
                    ))}

                    {/* Summary Card */}
                    <View style={styles.summaryCard}>
                      <View style={styles.summaryHeader}>
                        <MaterialCommunityIcons
                          name="chart-box"
                          size={20}
                          color="#06407a"
                        />
                        <Text style={styles.summaryTitle}>Total Summary</Text>
                      </View>
                      
                      <View style={styles.summaryStats}>
                        <View style={styles.summaryStatItem}>
                          <Text style={styles.summaryStatValue}>
                            {totalSteps.toLocaleString()}
                          </Text>
                          <Text style={styles.summaryStatLabel}>Total Steps</Text>
                        </View>
                        
                        <View style={styles.summaryStatItem}>
                          <Text style={styles.summaryStatValue}>
                            {totalDistance >= 1000 
                              ? (totalDistance / 1000).toFixed(1) + " km"
                              : totalDistance.toFixed(0) + " m"
                            }
                          </Text>
                          <Text style={styles.summaryStatLabel}>Total Distance</Text>
                        </View>
                        
                        <View style={styles.summaryStatItem}>
                          <Text style={styles.summaryStatValue}>
                            {totalCalories.toLocaleString()}
                          </Text>
                          <Text style={styles.summaryStatLabel}>Total Calories</Text>
                        </View>
                      </View>
                    </View>
                  </>
                ) : (
                  <View style={styles.emptyContainer}>
                    <View style={styles.emptyIconContainer}>
                      <MaterialCommunityIcons
                        name="clipboard-text-off"
                        size={48}
                        color="#94A3B8"
                      />
                    </View>
                    <Text style={styles.emptyTitle}>No Records Found</Text>
                    <Text style={styles.emptyMessage}>
                      Start tracking your steps to see your progress here.
                    </Text>
                  </View>
                )}
              </ScrollView>

              {/* Footer */}
              <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.closeBtn}>
                  <Text style={styles.closeBtnText}>Close</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default StepTrackerLogModel;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
    maxHeight: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#06407a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerTitle: {
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
  content: {
    padding: 24,
    paddingBottom: 8,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#06407a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    letterSpacing: -0.2,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 4,
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
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
  emptyMessage: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "500",
  },
  closeBtn: {
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
  closeBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});