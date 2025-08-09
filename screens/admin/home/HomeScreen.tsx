import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import {
  TrendingUp,
  Users,
  Dumbbell,
  Apple,
  Activity,
} from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import type { AdminCardStats } from "../../../types/both/exercise/Workout";
import {
  getAdminCardStats,
  totalAllUserCalories,
} from "../../../services/both/stats/Stats";

const { width: screenWidth } = Dimensions.get("window");

interface DashboardStats {
  nutritionByType: { name: string; count: number; color: string }[];
}

export default function HomeScreen() {

  const [allUserCalories, setAllUserCalories] = useState<{
    labels: string[];
    datasets: { data: number[] }[];
  }>({ labels: [], datasets: [{ data: [] }] });

  const [adminCardStats, setAdminCardStats] = useState<AdminCardStats>({
    totalExercise: 0,
    totalUser: 0,
    totalNutrition: 0,
    engagementRate: "0%",
  });

  const [stats, setStats] = useState<DashboardStats>({
    nutritionByType: [
      { name: "Protein", count: 32, color: "#4CAF50" },
      { name: "Carbs", count: 28, color: "#FF9800" },
      { name: "Fats", count: 15, color: "#F44336" },
      { name: "Vitamins", count: 14, color: "#2196F3" },
    ],
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await getAdminCardStats();
        setAdminCardStats(response);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    fetchDashboardStats();
  }, []);

  useEffect(() => {
    const fetchTotalUserCalories = async () => {
      try {
        const response = await totalAllUserCalories();
        const labels = response.map((item) => {
          // Format date to show only day and month (e.g., "Jan 15")
          const date = new Date(item.date);
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        });
        const data = response.map((item) =>
          isNaN(item.totalDailyCalories)
            ? 0
            : Number.parseFloat(item.totalDailyCalories.toString())
        );

        const filterCaloriesData = {
          labels: labels,
          datasets: [
            {
              data: data,
              color: (opacity = 1) => `rgba(6, 64, 122, ${opacity})`,
              strokeWidth: 3,
            },
          ],
        };
        setAllUserCalories(filterCaloriesData);
      } catch (error) {
        console.error("Error fetching total user calories:", error);
      }
    };
    fetchTotalUserCalories();
  }, []);

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(6, 64, 122, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
    style: {
      borderRadius: 12,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#06407a",
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: "#E5E7EB",
      strokeWidth: 1,
    },
  };

  // Calculate chart width for horizontal scrolling
  const chartWidth = Math.max(
    screenWidth - 64,
    allUserCalories.labels.length * 60
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Key Metrics Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Key Metrics</Text>
          </View>

          <View style={styles.metricsGrid}>
            <View style={[styles.metricCard, { backgroundColor: "#EEF2FF" }]}>
              <View style={styles.metricIconContainer}>
                <Dumbbell size={24} color="#6366F1" />
              </View>
              <Text style={styles.metricValue}>
                {adminCardStats.totalExercise}
              </Text>
              <Text style={styles.metricLabel}>Total Exercises</Text>
            </View>

            <View style={[styles.metricCard, { backgroundColor: "#F0FDF4" }]}>
              <View style={styles.metricIconContainer}>
                <Apple size={24} color="#22C55E" />
              </View>
              <Text style={styles.metricValue}>
                {adminCardStats.totalNutrition}
              </Text>
              <Text style={styles.metricLabel}>Nutrition Items</Text>
            </View>

            <View style={[styles.metricCard, { backgroundColor: "#FFF7ED" }]}>
              <View style={styles.metricIconContainer}>
                <Users size={24} color="#F97316" />
              </View>
              <Text style={styles.metricValue}>
                {adminCardStats.totalUser.toLocaleString()}
              </Text>
              <Text style={styles.metricLabel}>Active Users</Text>
            </View>

            <View style={[styles.metricCard, { backgroundColor: "#FAF5FF" }]}>
              <View style={styles.metricIconContainer}>
                <Activity size={24} color="#A855F7" />
              </View>
              <Text style={styles.metricValue}>
                {adminCardStats.engagementRate}
              </Text>
              <Text style={styles.metricLabel}>Engagement Rate</Text>
            </View>
          </View>
        </View>

        {/* Daily Activity Chart Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Activity</Text>
            <View style={styles.trendContainer}>
              <TrendingUp size={16} color="#22C55E" />
              <Text style={styles.trendText}>+12.5%</Text>
            </View>
          </View>

          {allUserCalories.labels.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chartScrollView}
            >
              <LineChart
                data={allUserCalories}
                width={chartWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                withHorizontalLabels={true}
                withVerticalLabels={true}
                withDots={true}
                withShadow={false}
                withInnerLines={true}
                withOuterLines={false}
              />
            </ScrollView>
          ) : (
            <View style={styles.emptyChart}>
              <Text style={styles.emptyChartText}>No data available</Text>
            </View>
          )}
        </View>

        {/* Nutrition Distribution Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nutrition Distribution</Text>
          </View>

          <View style={styles.nutritionGrid}>
            {stats.nutritionByType.map((item, index) => (
              <View key={index} style={styles.nutritionCard}>
                <View
                  style={[
                    styles.nutritionIconContainer,
                    { backgroundColor: item.color },
                  ]}
                >
                  <Apple size={20} color="white" />
                </View>
                <View style={styles.nutritionContent}>
                  <Text style={styles.nutritionName}>{item.name}</Text>
                  <Text style={styles.nutritionCount}>{item.count}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    backgroundColor: "#06407a",
    paddingVertical: 8,
    paddingHorizontal: 20,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  headerContent: {
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  trendContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    color: "#22C55E",
    fontWeight: "600",
    marginLeft: 4,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  metricCard: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  metricIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
    textAlign: "center",
  },
  chartScrollView: {
    marginHorizontal: -20,
  
  },
  chart: {
    borderRadius: 12,
    marginVertical: 8,
  },
  emptyChart: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
  },
  emptyChartText: {
    fontSize: 16,
    color: "#6B7280",
    fontStyle: "italic",
  },
  nutritionGrid: {
    gap: 12,
  },
  nutritionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  nutritionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  nutritionContent: {
    flex: 1,
  },
  nutritionName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 2,
  },
  nutritionCount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#6366F1",
  },
});
