"use client";

import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Card, Title, Text, useTheme, Chip } from "react-native-paper";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import {
  TrendingUp,
  Users,
  Dumbbell,
  Apple,
  Activity,
  RefreshCw,
} from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { getAdminCardStats, totalAllUserCalories } from "../../../services/user/exercise/Workout";
import { AdminCardStats } from "../../../types/user/exercise/Workout";

const screenWidth = Dimensions.get("window").width;

interface DashboardStats {
  nutritionByType: { name: string; count: number; color: string }[];
}

export default function HomeScreen() {
  const theme = useTheme();
  const [allUserCalories, setAllUserCalories] = useState<{
    labels: string[];
    datasets: { data: number[] }[];
  }>({ labels: [], datasets: [{ data: [] }] });
  const [adminCardStats , setAdminCardStats] = useState<AdminCardStats>({
    totalExercise: 0,
    totalUser: 0,
    totalNutrition: 0,
    engagementRate: "0%",
  })

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
  }
  fetchDashboardStats();
}, []);
  useEffect(() => {
    const fetchTotalUserCalories = async () => {
      try {
        const response = await totalAllUserCalories();

        const labels = response.map((item) => item.date);
        const data = response.map((item) =>
          isNaN(item.totalDailyCalories)
            ? 0
            : parseFloat(item.totalDailyCalories.toString())
        );

        const filterCaloriesData = {
          labels: labels,
          datasets: [
            {
              data: data,
              color: (opacity = 1) => `rgba(0, 71, 171, ${opacity})`,
              strokeWidth: 2,
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
    color: (opacity = 1) => `rgba(0, 71, 171, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#0047AB",
    },
  };

  const pieData = stats.nutritionByType.map((nutrition) => ({
    color: nutrition.color,
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  }));

  

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Key Metrics Cards */}
        <View style={styles.metricsGrid}>
          <Card style={[styles.metricCard, { backgroundColor: "#E3F2FD" }]}>
            <Card.Content style={styles.metricContent}>
              <View style={styles.metricHeader}>
                <Dumbbell size={24} color="#0047AB" />
              </View>
              <Text style={styles.metricValue}>{adminCardStats.totalExercise}</Text>
              <Text style={styles.metricLabel}>Total Exercises</Text>
            </Card.Content>
          </Card>

          <Card style={[styles.metricCard, { backgroundColor: "#E8F5E8" }]}>
            <Card.Content style={styles.metricContent}>
              <View style={styles.metricHeader}>
                <Apple size={24} color="#4CAF50" />
              </View>
              <Text style={styles.metricValue}>{adminCardStats.totalNutrition}</Text>
              <Text style={styles.metricLabel}>Nutrition Items</Text>
            </Card.Content>
          </Card>

          <Card style={[styles.metricCard, { backgroundColor: "#FFF3E0" }]}>
            <Card.Content style={styles.metricContent}>
              <View style={styles.metricHeader}>
                <Users size={24} color="#FF9800" />
              </View>
              <Text style={styles.metricValue}>
                {adminCardStats.totalUser.toLocaleString()}
              </Text>
              <Text style={styles.metricLabel}>Active Users</Text>
            </Card.Content>
          </Card>

          <Card style={[styles.metricCard, { backgroundColor: "#F3E5F5" }]}>
            <Card.Content style={styles.metricContent}>
              <View style={styles.metricHeader}>
                <Activity size={24} color="#9C27B0" />
              </View>
              <Text style={styles.metricValue}>
                {adminCardStats.engagementRate}
              </Text>
              <Text style={styles.metricLabel}>Engagement Rate</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Daily Activity Chart */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={styles.chartTitle}>Daily Activity</Title>
            {allUserCalories.labels.length > 0 && (
              <LineChart
                data={allUserCalories}
                width={screenWidth - 64}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
              />
            )}
          </Card.Content>
        </Card>

        {/* Nutrition Distribution */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={styles.chartTitle}>Nutrition Distribution</Title>
            <View style={styles.nutritionGrid}>
              {stats.nutritionByType.map((item, index) => (
                <View key={index} style={styles.nutritionItem}>
                  <View
                    style={[
                      styles.nutritionIcon,
                      { backgroundColor: pieData[index]?.color || "#ccc" },
                    ]}
                  >
                    <Apple size={20} color="white" />
                  </View>
                  <Text style={styles.nutritionName}>{item.name}</Text>
                  <Text style={styles.nutritionCount}>{item.count}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#0047AB",
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

  content: {
    flex: 1,
    padding: 16,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  metricCard: {
    width: "48%",
    marginBottom: 12,
    elevation: 2,
  },
  metricContent: {
    padding: 12,
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  trendContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  trendText: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
    marginLeft: 2,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  chartCard: {
    marginBottom: 16,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    marginBottom: 12,
    color: "#333",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  quickStats: {
    gap: 12,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  nutritionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  nutritionItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  nutritionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  nutritionName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  nutritionCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0047AB",
  },
});
