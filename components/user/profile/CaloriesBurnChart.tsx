import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Card } from "react-native-paper"; 
import { window } from "../../../constants/sizes";
import { userCaloriesStatsAnalytics } from "../../../services/both/stats/Stats";

const CaloriesBurnChart = () => {
  const [caloriesData, setCaloriesData] = useState<{
    labels: string[];
    datasets: { data: number[] }[];
  }>({
    labels: [],
    datasets: [{ data: [] }],
  });

  const [weeklyData, setWeeklyData] = useState<number | null>(null);

  const caloriesStats = async () => {
    try {
      const response = await userCaloriesStatsAnalytics();
      setWeeklyData(response.averageWeekCalories.averageWeekCalories);

      const labels = response.dailyCalories.map((item) => item.date.slice(6));
      const data = response.dailyCalories.map((item) => {
        const value = Number(item.totalDailyCalories);
        return !isNaN(value) && isFinite(value) ? value : 0;
      });

      setCaloriesData({
        labels,
        datasets: [{ data }],
      });
    } catch (error) {
      console.error("Error fetching calorie data:", error);
    }
  };

  useEffect(() => {
    caloriesStats();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: () => `#06407a`,
    labelColor: () => `#06407a`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#06407a",
      fill: "#ffffff",
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: "rgba(226, 232, 240, 0.6)",
      strokeWidth: 1,
    },
    propsForLabels: {
      fontSize: 12,
      fontWeight: "500",
    },
  };

  const safeFormatYLabel = (value: string) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) || !isFinite(parsed) ? "0" : `${Math.round(parsed)}`;
  };

  return (
    <Card style={styles.card} elevation={2}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Calories Burned</Text>
          <View style={styles.averageContainer}>
            <Text style={styles.averageLabel}>Weekly Average</Text>
            <Text style={styles.averageValue}>{weeklyData?.toFixed(2)} cal</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          {caloriesData.datasets[0].data.length > 0 && (
            <LineChart
              data={caloriesData}
              width={window.width - 64} // adjusted for padding inside Card
              height={220}
              yAxisSuffix=" cal"
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              fromZero
              segments={5}
              formatYLabel={safeFormatYLabel}
            />
          )}
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#38bdf8" }]} />
            <Text style={styles.legendText}>Calories Burned</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 12,
    borderRadius: 16,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    gap: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#06407a",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  averageContainer: {
    alignItems: "flex-end",
  },
  averageLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 2,
  },
  averageValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#06407a",
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  chart: {
    borderRadius: 12,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#06407a",
  },
});

export default CaloriesBurnChart;
