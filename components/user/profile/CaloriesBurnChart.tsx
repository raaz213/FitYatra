import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const CaloriesBurnChart = () => {
  const screenWidth = Dimensions.get("window").width;
  
  // Sample data
  const caloriesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [320, 450, 280, 580, 390, 620, 480],
        color: (opacity = 1) => `rgba(56, 189, 248, ${opacity})`, // More professional blue
        strokeWidth: 2.5,
      },
    ],
  };
  
  // Calculate weekly average
  const weeklyAverage = Math.round(
    caloriesData.datasets[0].data.reduce((sum, val) => sum + val, 0) / 
    caloriesData.datasets[0].data.length
  );

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `#06407a`,
    labelColor: (opacity = 1) => `#06407a`,
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
      strokeDasharray: "", // Solid lines
      stroke: "rgba(226, 232, 240, 0.6)",
      strokeWidth: 1,
    },
    propsForLabels: {
      fontSize: 12,
      fontWeight: "500",
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Calories Burned</Text>
        <View style={styles.averageContainer}>
          <Text style={styles.averageLabel}>Weekly Average</Text>
          <Text style={styles.averageValue}>{weeklyAverage} cal</Text>
        </View>
      </View>
      
      <View style={styles.chartContainer}>
        <LineChart
          data={caloriesData}
          width={screenWidth - 40}
          height={220}
          yAxisSuffix=" cal"
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          fromZero
          segments={5}
          formatYLabel={(value) => parseInt(value).toLocaleString()}
        />
      </View>
      
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#38bdf8" }]} />
          <Text style={styles.legendText}>Calories Burned</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    margin: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
    flexWrap: "wrap"
    
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