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

import { getStepCounterStats } from "../../../../services/user/exercise/StepCounter";
import { StepCounterStatsResponse } from "../../../../types/user/exercise/StepCounter";
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
                <Text variant="titleLarge" style={styles.headerTitle}>
                  Step Tracker Log
                </Text>
                <IconButton icon="close" size={22} onPress={onClose} />
              </View>

              {/* Body */}
              <ScrollView
                
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
              >
                {logs.length > 0 ? (
                  logs.map((log, index) => (
                    <Surface key={index} style={styles.card} elevation={2}>
                      <View style={styles.cardTopRow}>
                        <MaterialCommunityIcons
                          name="shoe-print"
                          size={20}
                          color="#3B82F6"
                        />
                        <Text style={styles.date}>
                          {new Date(log.createdAt).toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.cardBottomRow}>
                        <Text style={styles.cardStat}>{log.steps} steps</Text>
                        <Text style={styles.cardStat}>{log.distance >= 1000 ? log.distance / 1000 + "km": log.distance + "m"}</Text>
                        <Text style={styles.cardStat}>{log.calories} kcal</Text>
                      </View>
                    </Surface>
                  ))
                ) : (
                  <Text style={styles.emptyMessage}>
                    No step records available.
                  </Text>
                )}

                {/* Summary */}
                <Surface style={styles.summaryCard} elevation={2}>
                  <Text style={styles.summaryText}>
                    🏃‍♂️ Total Steps: {totalSteps}
                  </Text>
                  <Text style={styles.summaryText}>
                    🔥 Total Calories: {totalCalories} kcal
                  </Text>
                  <Text style={styles.summaryText}>
                    📏 Total Distance: {totalDistance >= 1000 ? totalDistance / 1000 + "km": totalDistance + "m"} 
                  </Text>
                </Surface>
              </ScrollView>

              {/* Footer */}
              <Button mode="contained" onPress={onClose} style={styles.closeBtn}>
                Close
              </Button>
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "60%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontWeight: "700",
    color: "#1E3A8A",
  },
  content: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  date: {
    marginLeft: 8,
    color: "#1E293B",
    fontWeight: "500",
  },
  cardBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardStat: {
    color: "#3B82F6",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyMessage: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#6B7280",
    marginVertical: 30,
  },
  summaryCard: {
    backgroundColor: "#F1F5F9",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  summaryText: {
    color: "#1E293B",
    fontWeight: "600",
    marginBottom: 6,
  },
  closeBtn: {
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: "#3B82F6",
  },
});
