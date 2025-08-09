import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Text, Card, ProgressBar } from "react-native-paper";
import moment from "moment";
import { getUserMeasurements } from "../../../services/both/stats/Stats";

interface BodyDetails {
  height: number;
  weight: number;
  createdAt: Date;
}

const BodyMeasurementScreen = () => {
  const [data, setData] = useState<BodyDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getUserMeasurements();
      setData(response);
    } catch (err) {
      console.error("Failed to fetch body data", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateBMI = (weight: number, height: number): number => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return parseFloat(bmi.toFixed(1));
  };

  const getBMICategory = (
    bmi: number
  ): { category: string; color: string; description: string } => {
    if (bmi < 18.5) {
      return {
        category: "Underweight",
        color: "#3b82f6",
        description: "Below normal weight range",
      };
    } else if (bmi >= 18.5 && bmi < 25) {
      return {
        category: "Normal",
        color: "#10b981",
        description: "Healthy weight range",
      };
    } else if (bmi >= 25 && bmi < 30) {
      return {
        category: "Overweight",
        color: "#f59e0b",
        description: "Above normal weight range",
      };
    } else {
      return {
        category: "Obese",
        color: "#ef4444",
        description: "Significantly above normal range",
      };
    }
  };

  const getBMIProgress = (bmi: number): number => {
    const minBMI = 15;
    const maxBMI = 35;
    return Math.min(Math.max((bmi - minBMI) / (maxBMI - minBMI), 0), 1);
  };

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#6366f1" />
      <Text style={styles.loadingText}>Loading your measurements...</Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>📏</Text>
      <Text style={styles.emptyTitle}>No Measurements Found</Text>
      <Text style={styles.emptySubtitle}>
        Add your body measurements to track your fitness progress
      </Text>
    </View>
  );

  const renderMeasurements = () => {
    if (!data) return renderEmptyState();

    const bmi = calculateBMI(data.weight, data.height);
    const bmiInfo = getBMICategory(bmi);
    const bmiProgress = getBMIProgress(bmi);

    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* BMI Card */}
        <Card style={styles.bmiCard} elevation={4}>
          <Card.Content style={styles.bmiCardContent}>
            <View style={styles.bmiHeader}>
              <View style={styles.bmiIconContainer}>
                <Text style={styles.bmiIcon}>⚖️</Text>
              </View>
              <View style={styles.bmiInfo}>
                <Text style={styles.bmiTitle}>Body Mass Index</Text>
                <Text style={styles.bmiValue}>{bmi}</Text>
              </View>
              <View
                style={[
                  styles.bmiCategoryBadge,
                  { backgroundColor: bmiInfo.color },
                ]}
              >
                <Text style={styles.bmiCategoryText}>{bmiInfo.category}</Text>
              </View>
            </View>

            <Text style={styles.bmiDescription}>{bmiInfo.description}</Text>

            <View style={styles.bmiProgressContainer}>
              <ProgressBar
                progress={bmiProgress}
                color={bmiInfo.color}
                style={styles.bmiProgressBar}
              />
              <View style={styles.bmiScale}>
                <Text style={styles.bmiScaleText}>15</Text>
                <Text style={styles.bmiScaleText}>25</Text>
                <Text style={styles.bmiScaleText}>35</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Measurements Grid */}
        <View style={styles.measurementsGrid}>
          {/* Height Card */}
          <Card style={styles.measurementCard} elevation={2}>
            <Card.Content style={styles.measurementCardContent}>
              <View style={styles.measurementIconContainer}>
                <Text style={styles.measurementIcon}>📏</Text>
              </View>
              <Text style={styles.measurementLabel}>Height</Text>
              <Text style={styles.measurementValue}>{data.height}</Text>
              <Text style={styles.measurementUnit}>cm</Text>
            </Card.Content>
          </Card>

          {/* Weight Card */}
          <Card style={styles.measurementCard} elevation={2}>
            <Card.Content style={styles.measurementCardContent}>
              <View style={styles.measurementIconContainer}>
                <Text style={styles.measurementIcon}>⚖️</Text>
              </View>
              <Text style={styles.measurementLabel}>Weight</Text>
              <Text style={styles.measurementValue}>{data.weight}</Text>
              <Text style={styles.measurementUnit}>kg</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Additional Info Card */}
        <Card style={styles.infoCard} elevation={2}>
          <Card.Content style={styles.infoCardContent}>
            <View style={styles.infoHeader}>
              <View style={styles.infoIconContainer}>
                <Text style={styles.infoIcon}>📅</Text>
              </View>
              <View style={styles.infoDetails}>
                <Text style={styles.infoTitle}>Last Updated</Text>
                <Text style={styles.infoDate}>
                  {moment(data.createdAt).format("MMMM D, YYYY")}
                </Text>
                <Text style={styles.infoTime}>
                  {moment(data.createdAt).format("h:mm A")}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* BMI Reference Card */}
        <Card style={styles.referenceCard} elevation={1}>
          <Card.Content style={styles.referenceCardContent}>
            <Text style={styles.referenceTitle}>BMI Reference</Text>
            <View style={styles.referenceList}>
              <View style={styles.referenceItem}>
                <View
                  style={[
                    styles.referenceIndicator,
                    { backgroundColor: "#3b82f6" },
                  ]}
                />
                <Text style={styles.referenceText}>
                  Under 18.5 - Underweight
                </Text>
              </View>
              <View style={styles.referenceItem}>
                <View
                  style={[
                    styles.referenceIndicator,
                    { backgroundColor: "#10b981" },
                  ]}
                />
                <Text style={styles.referenceText}>18.5 - 24.9 - Normal</Text>
              </View>
              <View style={styles.referenceItem}>
                <View
                  style={[
                    styles.referenceIndicator,
                    { backgroundColor: "#f59e0b" },
                  ]}
                />
                <Text style={styles.referenceText}>
                  25.0 - 29.9 - Overweight
                </Text>
              </View>
              <View style={styles.referenceItem}>
                <View
                  style={[
                    styles.referenceIndicator,
                    { backgroundColor: "#ef4444" },
                  ]}
                />
                <Text style={styles.referenceText}>30.0+ - Obese</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerIcon}>📊</Text>
            <Text style={styles.headerTitle}>Body Measurements</Text>
          </View>
        </View>
      </View>

      {/* Content */}
      {loading ? renderLoadingState() : renderMeasurements()}
    </SafeAreaView>
  );
};

export default BodyMeasurementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafbfc",
  },
  headerContainer: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
   
  },
  closeButton: {
    margin: 0,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },
  loadingText: {
    marginTop: 24,
    fontSize: 16,
    color: "#6b7280",
    fontWeight: "500",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: 32,
    opacity: 0.8,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
  },
  bmiCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    marginTop: 32,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  bmiCardContent: {
    padding: 32,
  },
  bmiHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  bmiIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f9ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    borderWidth: 2,
    borderColor: "#e0f2fe",
  },
  bmiIcon: {
    fontSize: 28,
  },
  bmiInfo: {
    flex: 1,
  },
  bmiTitle: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  bmiValue: {
    fontSize: 40,
    fontWeight: "900",
    color: "#111827",
    letterSpacing: -1,
  },
  bmiCategoryBadge: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bmiCategoryText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  bmiDescription: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "500",
  },
  bmiProgressContainer: {
    marginTop: 16,
  },
  bmiProgressBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: "#f3f4f6",
  },
  bmiScale: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingHorizontal: 4,
  },
  bmiScaleText: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "600",
  },
  measurementsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 16,
  },
  measurementCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  measurementCardContent: {
    padding: 24,
    alignItems: "center",
  },
  measurementIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#f0f9ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#e0f2fe",
  },
  measurementIcon: {
    fontSize: 24,
  },
  measurementLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  measurementValue: {
    fontSize: 32,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  measurementUnit: {
    fontSize: 14,
    color: "#9ca3af",
    fontWeight: "600",
  },
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  infoCardContent: {
    padding: 24,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fef3c7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    borderWidth: 2,
    borderColor: "#fde68a",
  },
  infoIcon: {
    fontSize: 24,
  },
  infoDetails: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoDate: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  infoTime: {
    fontSize: 14,
    color: "#9ca3af",
    fontWeight: "500",
  },
  referenceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  referenceCardContent: {
    padding: 24,
  },
  referenceTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
  },
  referenceList: {
    gap: 16,
  },
  referenceItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  referenceIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  referenceText: {
    fontSize: 15,
    color: "#4b5563",
    fontWeight: "500",
  },
});
