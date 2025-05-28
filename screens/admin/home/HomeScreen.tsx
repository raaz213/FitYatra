"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Dimensions } from "react-native"
import { Card, Title, Text, useTheme, Chip, IconButton } from "react-native-paper"
import { BarChart, LineChart, PieChart, ProgressChart } from "react-native-chart-kit"
import { TrendingUp, Users, Dumbbell, Apple, Activity, RefreshCw } from "lucide-react-native"
import { StatusBar } from "expo-status-bar"

const screenWidth = Dimensions.get("window").width

interface DashboardStats {
  totalExercises: number
  totalNutrition: number
  activeUsers: number
  weeklyGrowth: number
  monthlyGrowth: number
  popularCategories: { name: string; count: number; color: string }[]
  exercisesByCategory: { name: string; count: number }[]
  nutritionByType: { name: string; count: number }[]
  weeklyActivity: number[]
  userEngagement: number
}

export default function HomeScreen() {
  const theme = useTheme()
  const [stats, setStats] = useState<DashboardStats>({
    totalExercises: 156,
    totalNutrition: 89,
    activeUsers: 1247,
    weeklyGrowth: 12.5,
    monthlyGrowth: 8.3,
    popularCategories: [
      { name: "Strength", count: 45, color: "#FF6384" },
      { name: "Cardio", count: 38, color: "#36A2EB" },
      { name: "Flexibility", count: 32, color: "#FFCE56" },
      { name: "Core", count: 28, color: "#4BC0C0" },
      { name: "HIIT", count: 13, color: "#9966FF" },
    ],
    exercisesByCategory: [
      { name: "Chest", count: 25 },
      { name: "Back", count: 22 },
      { name: "Legs", count: 30 },
      { name: "Arms", count: 18 },
      { name: "Core", count: 28 },
      { name: "Cardio", count: 33 },
    ],
    nutritionByType: [
      { name: "Protein", count: 32 },
      { name: "Carbs", count: 28 },
      { name: "Fats", count: 15 },
      { name: "Vitamins", count: 14 },
    ],
    weeklyActivity: [65, 78, 82, 95, 88, 92, 105],
    userEngagement: 0.78,
  })

  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

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
  }

  const pieData = stats.popularCategories.map((category) => ({
    name: category.name,
    population: category.count,
    color: category.color,
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  }))

  const barData = {
    labels: stats.exercisesByCategory.map((item) => item.name),
    datasets: [
      {
        data: stats.exercisesByCategory.map((item) => item.count),
      },
    ],
  }

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: stats.weeklyActivity,
        color: (opacity = 1) => `rgba(0, 71, 171, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  }

  const progressData = {
    labels: ["Exercises", "Nutrition", "Users", "Engagement"],
    data: [0.8, 0.6, 0.9, stats.userEngagement],
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>FitYatra</Text>
          <Text style={styles.headerSubtitle}>Admin Dashboard</Text>
        </View>
        <IconButton
          icon={({ size, color }) => <RefreshCw size={size} color="white" />}
          size={24}
          onPress={handleRefresh}
          style={[styles.refreshButton, refreshing && styles.refreshing]}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Key Metrics Cards */}
        <View style={styles.metricsGrid}>
          <Card style={[styles.metricCard, { backgroundColor: "#E3F2FD" }]}>
            <Card.Content style={styles.metricContent}>
              <View style={styles.metricHeader}>
                <Dumbbell size={24} color="#0047AB" />
                <View style={styles.trendContainer}>
                  <TrendingUp size={16} color="#4CAF50" />
                  <Text style={styles.trendText}>+{stats.weeklyGrowth}%</Text>
                </View>
              </View>
              <Text style={styles.metricValue}>{stats.totalExercises}</Text>
              <Text style={styles.metricLabel}>Total Exercises</Text>
            </Card.Content>
          </Card>

          <Card style={[styles.metricCard, { backgroundColor: "#E8F5E8" }]}>
            <Card.Content style={styles.metricContent}>
              <View style={styles.metricHeader}>
                <Apple size={24} color="#4CAF50" />
                <View style={styles.trendContainer}>
                  <TrendingUp size={16} color="#4CAF50" />
                  <Text style={styles.trendText}>+{stats.monthlyGrowth}%</Text>
                </View>
              </View>
              <Text style={styles.metricValue}>{stats.totalNutrition}</Text>
              <Text style={styles.metricLabel}>Nutrition Items</Text>
            </Card.Content>
          </Card>

          <Card style={[styles.metricCard, { backgroundColor: "#FFF3E0" }]}>
            <Card.Content style={styles.metricContent}>
              <View style={styles.metricHeader}>
                <Users size={24} color="#FF9800" />
                <View style={styles.trendContainer}>
                  <TrendingUp size={16} color="#4CAF50" />
                  <Text style={styles.trendText}>+15.2%</Text>
                </View>
              </View>
              <Text style={styles.metricValue}>{stats.activeUsers.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>Active Users</Text>
            </Card.Content>
          </Card>

          <Card style={[styles.metricCard, { backgroundColor: "#F3E5F5" }]}>
            <Card.Content style={styles.metricContent}>
              <View style={styles.metricHeader}>
                <Activity size={24} color="#9C27B0" />
                <View style={styles.trendContainer}>
                  <TrendingUp size={16} color="#4CAF50" />
                  <Text style={styles.trendText}>+5.8%</Text>
                </View>
              </View>
              <Text style={styles.metricValue}>{Math.round(stats.userEngagement * 100)}%</Text>
              <Text style={styles.metricLabel}>Engagement Rate</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Weekly Activity Chart */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={styles.chartTitle}>Weekly Activity</Title>
            <LineChart
              data={lineData}
              width={screenWidth - 64}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </Card.Content>
        </Card>

        {/* Exercise Categories Chart */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={styles.chartTitle}>Exercises by Category</Title>
            <BarChart
              data={barData}
              width={screenWidth - 64}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
              showValuesOnTopOfBars
              yAxisLabel=""
              yAxisSuffix=""
            />
          </Card.Content>
        </Card>

        {/* Popular Categories Pie Chart */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={styles.chartTitle}>Popular Exercise Categories</Title>
            <PieChart
              data={pieData}
              width={screenWidth - 64}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              style={styles.chart}
            />
          </Card.Content>
        </Card>

        {/* Progress Overview */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={styles.chartTitle}>Progress Overview</Title>
            <ProgressChart
              data={progressData}
              width={screenWidth - 64}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
              style={styles.chart}
            />
          </Card.Content>
        </Card>

        {/* Quick Stats */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={styles.chartTitle}>Quick Statistics</Title>
            <View style={styles.quickStats}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Most Popular Exercise:</Text>
                <Chip mode="outlined">Push-ups</Chip>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Top Nutrition Category:</Text>
                <Chip mode="outlined">Protein</Chip>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Average Session Duration:</Text>
                <Text style={styles.statValue}>45 minutes</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>User Retention Rate:</Text>
                <Text style={styles.statValue}>82%</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>New Users This Week:</Text>
                <Text style={styles.statValue}>156</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Nutrition Distribution */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={styles.chartTitle}>Nutrition Distribution</Title>
            <View style={styles.nutritionGrid}>
              {stats.nutritionByType.map((item, index) => (
                <View key={index} style={styles.nutritionItem}>
                  <View style={[styles.nutritionIcon, { backgroundColor: pieData[index]?.color || "#ccc" }]}>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#0047AB",
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  headerSubtitle: {
    color: "white",
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  refreshButton: {
    margin: 0,
  },
  refreshing: {
    transform: [{ rotate: "180deg" }],
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
})
