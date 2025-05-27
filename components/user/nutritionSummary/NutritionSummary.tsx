import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { ProgressBar } from "react-native-paper"

interface NutritionSummaryProps {
  calories: number
  protein: number
  fat: number
  carbs: number
  fiber: number
  sugar: number
  sodium: number
  dailyGoals?: {
    calories: number
    protein: number
    fat: number
    carbs: number
  }
}

const NutritionSummary: React.FC<NutritionSummaryProps> = ({
  calories,
  protein,
  fat,
  carbs,
  fiber,
  sugar,
  sodium,
  dailyGoals = { calories: 2000, protein: 150, fat: 65, carbs: 300 },
}) => {
  const getProgressColor = (current: number, goal: number) => {
    const percentage = current / goal
    if (percentage < 0.5) return "#4CAF50"
    if (percentage < 0.8) return "#FF9800"
    return "#F44336"
  }

  const formatProgress = (current: number, goal: number) => {
    return Math.min(current / goal, 1) // Cap at 100%
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutrition Breakdown</Text>

      <View style={styles.macroContainer}>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{calories}</Text>
          <Text style={styles.macroLabel}>Calories</Text>
          <ProgressBar
            progress={formatProgress(calories, dailyGoals.calories)}
            color={getProgressColor(calories, dailyGoals.calories)}
            style={styles.progressBar}
          />
          <Text style={styles.goalText}>{((calories / dailyGoals.calories) * 100).toFixed(1)}% of daily goal</Text>
        </View>

        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{protein}g</Text>
          <Text style={styles.macroLabel}>Protein</Text>
          <ProgressBar
            progress={formatProgress(protein, dailyGoals.protein)}
            color={getProgressColor(protein, dailyGoals.protein)}
            style={styles.progressBar}
          />
          <Text style={styles.goalText}>{((protein / dailyGoals.protein) * 100).toFixed(1)}% of daily goal</Text>
        </View>

        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{fat}g</Text>
          <Text style={styles.macroLabel}>Fat</Text>
          <ProgressBar
            progress={formatProgress(fat, dailyGoals.fat)}
            color={getProgressColor(fat, dailyGoals.fat)}
            style={styles.progressBar}
          />
          <Text style={styles.goalText}>{((fat / dailyGoals.fat) * 100).toFixed(1)}% of daily goal</Text>
        </View>

        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{carbs}g</Text>
          <Text style={styles.macroLabel}>Carbs</Text>
          <ProgressBar
            progress={formatProgress(carbs, dailyGoals.carbs)}
            color={getProgressColor(carbs, dailyGoals.carbs)}
            style={styles.progressBar}
          />
          <Text style={styles.goalText}>{((carbs / dailyGoals.carbs) * 100).toFixed(1)}% of daily goal</Text>
        </View>
      </View>

      <View style={styles.microContainer}>
        <Text style={styles.microTitle}>Additional Nutrients</Text>
        <View style={styles.microGrid}>
          <View style={styles.microItem}>
            <Text style={styles.microValue}>{fiber}g</Text>
            <Text style={styles.microLabel}>Fiber</Text>
          </View>
          <View style={styles.microItem}>
            <Text style={styles.microValue}>{sugar}g</Text>
            <Text style={styles.microLabel}>Sugar</Text>
          </View>
          <View style={styles.microItem}>
            <Text style={styles.microValue}>{sodium}mg</Text>
            <Text style={styles.microLabel}>Sodium</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2E2E2E",
    marginBottom: 20,
    textAlign: "center",
  },
  macroContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  macroItem: {
    width: "48%",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    alignItems: "center",
  },
  macroValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#4CAF50",
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    fontWeight: "500",
  },
  progressBar: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
  },
  goalText: {
    fontSize: 11,
    color: "#999",
    textAlign: "center",
    lineHeight: 14,
  },
  microContainer: {
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 20,
  },
  microTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E2E2E",
    marginBottom: 16,
    textAlign: "center",
  },
  microGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  microItem: {
    alignItems: "center",
    flex: 1,
  },
  microValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 4,
  },
  microLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
})

export default NutritionSummary
