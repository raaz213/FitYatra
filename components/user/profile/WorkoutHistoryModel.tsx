import React, { useEffect, useState } from "react";
import { 
  Modal, 
  View, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  Dimensions,
  StatusBar,
  SafeAreaView 
} from "react-native";
import { Text, Card, IconButton, Divider } from "react-native-paper";
import moment from "moment";
import { getWorkoutHistory } from "../../../services/user/exercise/Workout";

const { width, height } = Dimensions.get('window');

interface WorkoutHistoryModalProps {
  visible: boolean;
  onClose: () => void;
}

interface WorkoutHistory {
  exercise?: { name?: string };
  startTime: string;
  duration: number;
  caloriesBurned: number;
}

const WorkoutHistoryModal: React.FC<WorkoutHistoryModalProps> = ({ visible, onClose }) => {
  const [history, setHistory] = useState<WorkoutHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      fetchHistory();
    }
  }, [visible]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getWorkoutHistory();
      
      // Convert startTime from Date to string for each workout
      const formattedData = data.map((workout: any) => ({
        ...workout,
        startTime: typeof workout.startTime === "string" ? workout.startTime : workout.startTime.toISOString(),
      }));

      setHistory(formattedData);
    } catch (error) {
      console.error("Failed to fetch workout history", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }: { item: WorkoutHistory; index: number }) => (
    <Card style={[styles.itemCard, { marginTop: index === 0 ? 0 : 16 }]} elevation={3}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.exerciseIconContainer}>
            <Text style={styles.exerciseIcon}>🏋️</Text>
          </View>
          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseName}>
              {item.exercise?.name || "Unknown Exercise"}
            </Text>
            <Text style={styles.dateText}>
              {moment(item.startTime).format("MMM D, YYYY")}
            </Text>
          </View>
          <Text style={styles.timeText}>
            {moment(item.startTime).format("h:mm A")}
          </Text>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>⏱️</Text>
            </View>
            <View>
              <Text style={styles.statValue}>{item.duration}</Text>
              <Text style={styles.statLabel}>minutes</Text>
            </View>
          </View>
          
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>🔥</Text>
            </View>
            <View>
              <Text style={styles.statValue}>{item.caloriesBurned}</Text>
              <Text style={styles.statLabel}>calories</Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>📊</Text>
      <Text style={styles.emptyTitle}>No Workout History</Text>
      <Text style={styles.emptySubtitle}>
        Start your fitness journey and your workouts will appear here
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#6366f1" />
      <Text style={styles.loadingText}>Loading your workout history...</Text>
    </View>
  );

  const getTotalStats = () => {
    const totalWorkouts = history.length;
    const totalDuration = history.reduce((sum, workout) => sum + workout.duration, 0);
    const totalCalories = history.reduce((sum, workout) => sum + workout.caloriesBurned, 0);
    
    return { totalWorkouts, totalDuration, totalCalories };
  };

  const { totalWorkouts, totalDuration, totalCalories } = getTotalStats();

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
        {/* Header with Gradient Background */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.headerLeft}>
                <Text style={styles.headerIcon}>📈</Text>
                <Text style={styles.headerTitle}>Workout History</Text>
              </View>
              <IconButton 
                icon="close" 
                iconColor="#ffffff"
                size={28}
                onPress={onClose}
                style={styles.closeButton}
              />
            </View>
            
            {/* Stats Summary */}
            {!loading && history.length > 0 && (
              <View style={styles.summaryStats}>
                <View style={styles.summaryStatItem}>
                  <Text style={styles.summaryStatValue}>{totalWorkouts}</Text>
                  <Text style={styles.summaryStatLabel}>Workouts</Text>
                </View>
                <View style={styles.summaryStatDivider} />
                <View style={styles.summaryStatItem}>
                  <Text style={styles.summaryStatValue}>{totalDuration}</Text>
                  <Text style={styles.summaryStatLabel}>Minutes</Text>
                </View>
                <View style={styles.summaryStatDivider} />
                <View style={styles.summaryStatItem}>
                  <Text style={styles.summaryStatValue}>{totalCalories}</Text>
                  <Text style={styles.summaryStatLabel}>Calories</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {loading ? (
            renderLoadingState()
          ) : history.length === 0 ? (
            renderEmptyState()
          ) : (
            <FlatList
              data={history}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default WorkoutHistoryModal;

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
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
  summaryStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  summaryStatItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryStatValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  summaryStatLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  summaryStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingVertical: 24,
    paddingBottom: 40,
  },
  itemCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardContent: {
    padding: 24,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  exerciseIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#f0f9ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  exerciseIcon: {
    fontSize: 24,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  dateText: {
    fontSize: 15,
    color: "#6b7280",
    fontWeight: "500",
  },
  timeText: {
    fontSize: 15,
    color: "#6366f1",
    fontWeight: "600",
    backgroundColor: "#f0f9ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  divider: {
    backgroundColor: "#e5e7eb",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fef3c7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  statIcon: {
    fontSize: 18,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: "500",
    textTransform: "uppercase",
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
});