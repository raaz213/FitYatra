import React, { useEffect, useState } from "react";
import { 
  Modal, 
  View, 
  StyleSheet, 
  ActivityIndicator, 
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView 
} from "react-native";
import { Text, Card, IconButton, ProgressBar } from "react-native-paper";
import moment from "moment";
import { getUserMeasurements } from "../../../services/user/exercise/Workout";

const { width, height } = Dimensions.get('window');

interface BodyDetails {
  height: number; // in cm
  weight: number; // in kg
  createdAt: Date;
}

interface BodyDetailsModalProps {
  visible: boolean;
  onClose: () => void;
}

const BodyMeasurementModal: React.FC<BodyDetailsModalProps> = ({ visible, onClose }) => {
  const [data, setData] = useState<BodyDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      fetchData();
    }
  }, [visible]);

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

  const getBMICategory = (bmi: number): { category: string; color: string; description: string } => {
    if (bmi < 18.5) {
      return { 
        category: "Underweight", 
        color: "#3b82f6", 
        description: "Below normal weight range" 
      };
    } else if (bmi >= 18.5 && bmi < 25) {
      return { 
        category: "Normal", 
        color: "#10b981", 
        description: "Healthy weight range" 
      };
    } else if (bmi >= 25 && bmi < 30) {
      return { 
        category: "Overweight", 
        color: "#f59e0b", 
        description: "Above normal weight range" 
      };
    } else {
      return { 
        category: "Obese", 
        color: "#ef4444", 
        description: "Significantly above normal range" 
      };
    }
  };

  const getBMIProgress = (bmi: number): number => {
    // Normalize BMI to a 0-1 scale for progress bar (15-35 BMI range)
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
              <View style={[styles.bmiCategoryBadge, { backgroundColor: bmiInfo.color }]}>
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
                <View style={[styles.referenceIndicator, { backgroundColor: "#3b82f6" }]} />
                <Text style={styles.referenceText}>Under 18.5 - Underweight</Text>
              </View>
              <View style={styles.referenceItem}>
                <View style={[styles.referenceIndicator, { backgroundColor: "#10b981" }]} />
                <Text style={styles.referenceText}>18.5 - 24.9 - Normal</Text>
              </View>
              <View style={styles.referenceItem}>
                <View style={[styles.referenceIndicator, { backgroundColor: "#f59e0b" }]} />
                <Text style={styles.referenceText}>25.0 - 29.9 - Overweight</Text>
              </View>
              <View style={styles.referenceItem}>
                <View style={[styles.referenceIndicator, { backgroundColor: "#ef4444" }]} />
                <Text style={styles.referenceText}>30.0+ - Obese</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
      statusBarTranslucent={false}
    >
      <StatusBar backgroundColor="#6366f1" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerIcon}>📊</Text>
              <Text style={styles.headerTitle}>Body Measurements</Text>
            </View>
            <IconButton 
              icon="close" 
              iconColor="#ffffff"
              size={28}
              onPress={onClose}
              style={styles.closeButton}
            />
          </View>
        </View>

        {/* Content */}
        {loading ? renderLoadingState() : renderMeasurements()}
      </SafeAreaView>
    </Modal>
  );
};

export default BodyMeasurementModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  headerContainer: {
    backgroundColor: "#6366f1",
    paddingBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
  },
  closeButton: {
    margin: 0,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: "#6b7280",
    fontWeight: "500",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 28,
  },
  bmiCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginTop: 24,
    marginBottom: 20,
  },
  bmiCardContent: {
    padding: 24,
  },
  bmiHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  bmiIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#f0f9ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  bmiIcon: {
    fontSize: 24,
  },
  bmiInfo: {
    flex: 1,
  },
  bmiTitle: {
    fontSize: 16,
    color: "#6b7280",
    fontWeight: "500",
    marginBottom: 4,
  },
  bmiValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
  },
  bmiCategoryBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bmiCategoryText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  bmiDescription: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 20,
    textAlign: "center",
  },
  bmiProgressContainer: {
    marginTop: 8,
  },
  bmiProgressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e5e7eb",
  },
  bmiScale: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  bmiScaleText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  measurementsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  measurementCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    flex: 0.48,
  },
  measurementCardContent: {
    padding: 20,
    alignItems: "center",
  },
  measurementIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f0f9ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  measurementIcon: {
    fontSize: 20,
  },
  measurementLabel: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
    marginBottom: 8,
  },
  measurementValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  measurementUnit: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 20,
  },
  infoCardContent: {
    padding: 20,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fef3c7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  infoIcon: {
    fontSize: 20,
  },
  infoDetails: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    color: "#6b7280",
    fontWeight: "500",
    marginBottom: 4,
  },
  infoDate: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  infoTime: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  referenceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 40,
  },
  referenceCardContent: {
    padding: 20,
  },
  referenceTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
    textAlign: "center",
  },
  referenceList: {
    gap: 12,
  },
  referenceItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  referenceIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  referenceText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
});