"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, Alert } from "react-native"
import { TextInput, Button, Text, Card, Title, useTheme, Divider, Chip } from "react-native-paper"
import { Plus, Apple, Hash, Zap, Star, FileText } from "lucide-react-native"
import { StatusBar } from "expo-status-bar"

interface NutritionItem {
  id: string
  name: string
  totalIntake: number
  proteinPer1g: number
  carbsPer1g: number
  fatsPer1g: number
  features: string[]
  keyBenefits: string
  // Calculated values
  totalProtein: number
  totalCarbs: number
  totalFats: number
  totalCalories: number
  proteinPercentage: number
  carbsPercentage: number
  fatsPercentage: number
  createdAt: string
}

export default function CreateNutrition() {
  const theme = useTheme()
  const [name, setName] = useState("")
  const [totalIntake, setTotalIntake] = useState("")
  const [proteinPer1g, setProteinPer1g] = useState("")
  const [carbsPer1g, setCarbsPer1g] = useState("")
  const [fatsPer1g, setFatsPer1g] = useState("")
  const [feature1, setFeature1] = useState("")
  const [feature2, setFeature2] = useState("")
  const [keyBenefits, setKeyBenefits] = useState("")
  const [nutritionItems, setNutritionItems] = useState<NutritionItem[]>([])

  // Calculated values
  const [calculations, setCalculations] = useState({
    totalProtein: 0,
    totalCarbs: 0,
    totalFats: 0,
    totalCalories: 0,
    proteinPercentage: 0,
    carbsPercentage: 0,
    fatsPercentage: 0,
  })

  // Calculate macronutrients and calories whenever inputs change
  useEffect(() => {
    const intake = Number.parseFloat(totalIntake) || 0
    const protein = Number.parseFloat(proteinPer1g) || 0
    const carbs = Number.parseFloat(carbsPer1g) || 0
    const fats = Number.parseFloat(fatsPer1g) || 0

    const totalProtein = intake * protein
    const totalCarbs = intake * carbs
    const totalFats = intake * fats

    // Calculate calories (Protein: 4 cal/g, Carbs: 4 cal/g, Fats: 9 cal/g)
    const totalCalories = totalProtein * 4 + totalCarbs * 4 + totalFats * 9

    // Calculate percentages
    const proteinCalories = totalProtein * 4
    const carbsCalories = totalCarbs * 4
    const fatsCalories = totalFats * 9

    const proteinPercentage = totalCalories > 0 ? (proteinCalories / totalCalories) * 100 : 0
    const carbsPercentage = totalCalories > 0 ? (carbsCalories / totalCalories) * 100 : 0
    const fatsPercentage = totalCalories > 0 ? (fatsCalories / totalCalories) * 100 : 0

    setCalculations({
      totalProtein: Math.round(totalProtein * 100) / 100,
      totalCarbs: Math.round(totalCarbs * 100) / 100,
      totalFats: Math.round(totalFats * 100) / 100,
      totalCalories: Math.round(totalCalories * 100) / 100,
      proteinPercentage: Math.round(proteinPercentage * 10) / 10,
      carbsPercentage: Math.round(carbsPercentage * 10) / 10,
      fatsPercentage: Math.round(fatsPercentage * 10) / 10,
    })
  }, [totalIntake, proteinPer1g, carbsPer1g, fatsPer1g])

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert("Validation Error", "Please enter nutrition name")
      return false
    }
    if (!totalIntake || isNaN(Number(totalIntake)) || Number(totalIntake) <= 0) {
      Alert.alert("Validation Error", "Please enter a valid total intake amount")
      return false
    }
    if (!proteinPer1g || isNaN(Number(proteinPer1g)) || Number(proteinPer1g) < 0) {
      Alert.alert("Validation Error", "Please enter a valid protein amount per 1g")
      return false
    }
    if (!carbsPer1g || isNaN(Number(carbsPer1g)) || Number(carbsPer1g) < 0) {
      Alert.alert("Validation Error", "Please enter a valid carbs amount per 1g")
      return false
    }
    if (!fatsPer1g || isNaN(Number(fatsPer1g)) || Number(fatsPer1g) < 0) {
      Alert.alert("Validation Error", "Please enter a valid fats amount per 1g")
      return false
    }
    if (!feature1.trim() || !feature2.trim()) {
      Alert.alert("Validation Error", "Please enter both features")
      return false
    }
    if (!keyBenefits.trim()) {
      Alert.alert("Validation Error", "Please enter key benefits")
      return false
    }

    // Validate that macronutrients don't exceed 1g per 1g
    const totalMacros = Number(proteinPer1g) + Number(carbsPer1g) + Number(fatsPer1g)
    if (totalMacros > 1) {
      Alert.alert(
        "Validation Error",
        "The sum of protein, carbs, and fats per 1g cannot exceed 1g. Please adjust the values.",
      )
      return false
    }

    return true
  }

  const handleSave = () => {
    if (!validateForm()) return

    const newNutritionItem: NutritionItem = {
      id: Date.now().toString(),
      name,
      totalIntake: Number(totalIntake),
      proteinPer1g: Number(proteinPer1g),
      carbsPer1g: Number(carbsPer1g),
      fatsPer1g: Number(fatsPer1g),
      features: [feature1.trim(), feature2.trim()],
      keyBenefits,
      ...calculations,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setNutritionItems([...nutritionItems, newNutritionItem])

    Alert.alert("Success", "Nutrition item created successfully!", [
      {
        text: "OK",
        onPress: () => console.log("Nutrition saved:", newNutritionItem),
      },
    ])

    // Reset form
    handleReset()
  }

  const handleReset = () => {
    setName("")
    setTotalIntake("")
    setProteinPer1g("")
    setCarbsPer1g("")
    setFatsPer1g("")
    setFeature1("")
    setFeature2("")
    setKeyBenefits("")
  }

  const getMacroColor = (macro: string) => {
    switch (macro) {
      case "protein":
        return "#FF6B6B"
      case "carbs":
        return "#4ECDC4"
      case "fats":
        return "#45B7D1"
      default:
        return "#95A5A6"
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FitYatra</Text>
        <Text style={styles.headerSubtitle}>Create Nutrition</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Basic Information */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Basic Information</Title>

            {/* Nutrition Name */}
            <View style={styles.inputContainer}>
              <Apple size={20} color={theme.colors.primary} style={styles.inputIcon} />
              <TextInput
                label="Nutrition Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
                mode="outlined"
                placeholder="e.g., Chicken Breast, Brown Rice"
              />
            </View>

            {/* Total Intake */}
            <View style={styles.inputContainer}>
              <Hash size={20} color={theme.colors.primary} style={styles.inputIcon} />
              <TextInput
                label="Total Intake (grams)"
                value={totalIntake}
                onChangeText={setTotalIntake}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="e.g., 100, 150, 200"
              />
            </View>
          </Card.Content>
        </Card>

        {/* Macronutrient Composition */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Macronutrient Composition (per 1g)</Title>
            <Text style={styles.subtitle}>Enter the amount of each macronutrient in 1 gram of this food</Text>

            {/* Protein per 1g */}
            <View style={styles.inputContainer}>
              <View style={[styles.macroIcon, { backgroundColor: getMacroColor("protein") }]}>
                <Text style={styles.macroIconText}>P</Text>
              </View>
              <TextInput
                label="Protein (g per 1g)"
                value={proteinPer1g}
                onChangeText={setProteinPer1g}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="e.g., 0.25, 0.31"
              />
            </View>

            {/* Carbs per 1g */}
            <View style={styles.inputContainer}>
              <View style={[styles.macroIcon, { backgroundColor: getMacroColor("carbs") }]}>
                <Text style={styles.macroIconText}>C</Text>
              </View>
              <TextInput
                label="Carbohydrates (g per 1g)"
                value={carbsPer1g}
                onChangeText={setCarbsPer1g}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="e.g., 0.72, 0.45"
              />
            </View>

            {/* Fats per 1g */}
            <View style={styles.inputContainer}>
              <View style={[styles.macroIcon, { backgroundColor: getMacroColor("fats") }]}>
                <Text style={styles.macroIconText}>F</Text>
              </View>
              <TextInput
                label="Fats (g per 1g)"
                value={fatsPer1g}
                onChangeText={setFatsPer1g}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="e.g., 0.03, 0.15"
              />
            </View>

            {/* Validation Helper */}
            {Number(proteinPer1g || 0) + Number(carbsPer1g || 0) + Number(fatsPer1g || 0) > 1 && (
              <Text style={styles.warningText}>⚠️ Total macronutrients exceed 1g per 1g. Please adjust the values.</Text>
            )}
          </Card.Content>
        </Card>

        {/* Calculated Values */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Nutritional Breakdown</Title>

            {/* Total Macronutrients */}
            <View style={styles.calculationSection}>
              <Text style={styles.sectionTitle}>Total Macronutrients</Text>
              <View style={styles.macroGrid}>
                <View style={styles.macroCard}>
                  <Text style={[styles.macroValue, { color: getMacroColor("protein") }]}>
                    {calculations.totalProtein}g
                  </Text>
                  <Text style={styles.macroLabel}>Protein</Text>
                </View>
                <View style={styles.macroCard}>
                  <Text style={[styles.macroValue, { color: getMacroColor("carbs") }]}>{calculations.totalCarbs}g</Text>
                  <Text style={styles.macroLabel}>Carbs</Text>
                </View>
                <View style={styles.macroCard}>
                  <Text style={[styles.macroValue, { color: getMacroColor("fats") }]}>{calculations.totalFats}g</Text>
                  <Text style={styles.macroLabel}>Fats</Text>
                </View>
              </View>
            </View>

            <Divider style={styles.divider} />

            {/* Macronutrient Percentages */}
            <View style={styles.calculationSection}>
              <Text style={styles.sectionTitle}>Macronutrient Breakdown</Text>
              <View style={styles.percentageContainer}>
                <Chip
                  mode="flat"
                  style={[styles.percentageChip, { backgroundColor: getMacroColor("protein") + "20" }]}
                  textStyle={{ color: getMacroColor("protein"), fontWeight: "600" }}
                >
                  Protein: {calculations.proteinPercentage}%
                </Chip>
                <Chip
                  mode="flat"
                  style={[styles.percentageChip, { backgroundColor: getMacroColor("carbs") + "20" }]}
                  textStyle={{ color: getMacroColor("carbs"), fontWeight: "600" }}
                >
                  Carbs: {calculations.carbsPercentage}%
                </Chip>
                <Chip
                  mode="flat"
                  style={[styles.percentageChip, { backgroundColor: getMacroColor("fats") + "20" }]}
                  textStyle={{ color: getMacroColor("fats"), fontWeight: "600" }}
                >
                  Fats: {calculations.fatsPercentage}%
                </Chip>
              </View>
            </View>

            <Divider style={styles.divider} />

            {/* Total Calories */}
            <View style={styles.caloriesSection}>
              <Zap size={24} color="#FF9800" />
              <View style={styles.caloriesContent}>
                <Text style={styles.caloriesValue}>{calculations.totalCalories}</Text>
                <Text style={styles.caloriesLabel}>Total Calories</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Features and Benefits */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Features & Benefits</Title>

            {/* Feature 1 */}
            <View style={styles.inputContainer}>
              <Star size={20} color="#FFD700" style={styles.inputIcon} />
              <TextInput
                label="Feature 1"
                value={feature1}
                onChangeText={setFeature1}
                style={styles.input}
                mode="outlined"
                placeholder="e.g., High in protein"
              />
            </View>

            {/* Feature 2 */}
            <View style={styles.inputContainer}>
              <Star size={20} color="#FFD700" style={styles.inputIcon} />
              <TextInput
                label="Feature 2"
                value={feature2}
                onChangeText={setFeature2}
                style={styles.input}
                mode="outlined"
                placeholder="e.g., Low in saturated fat"
              />
            </View>

            {/* Key Benefits */}
            <View style={styles.inputContainer}>
              <FileText size={20} color={theme.colors.primary} style={styles.inputIcon} />
              <TextInput
                label="Key Benefits"
                value={keyBenefits}
                onChangeText={setKeyBenefits}
                multiline
                numberOfLines={3}
                style={styles.textArea}
                mode="outlined"
                placeholder="Describe the key health benefits of this nutrition item..."
              />
            </View>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={handleReset}
                style={[styles.button, styles.resetButton]}
                labelStyle={{ color: theme.colors.error }}
              >
                Reset Form
              </Button>
              <Button
                mode="contained"
                onPress={handleSave}
                style={[styles.button, styles.saveButton]}
                icon={({ size, color }) => <Plus size={size} color={color} />}
              >
                Create Nutrition
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Recently Created */}
        {nutritionItems.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Recently Created</Title>
              {nutritionItems.slice(-2).map((item) => (
                <View key={item.id} style={styles.recentItem}>
                  <Text style={styles.recentName}>{item.name}</Text>
                  <Text style={styles.recentDetails}>
                    {item.totalIntake}g • {item.totalCalories} cal • P:{item.proteinPercentage}% C:
                    {item.carbsPercentage}% F:{item.fatsPercentage}%
                  </Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        )}
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
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    fontStyle: "italic",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
    marginTop: 16,
  },
  macroIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 12,
  },
  macroIconText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  input: {
    flex: 1,
  },
  textArea: {
    flex: 1,
    height: 80,
  },
  warningText: {
    color: "#D32F2F",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "500",
  },
  calculationSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  macroGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  macroCard: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  macroValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  divider: {
    marginVertical: 16,
  },
  percentageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  percentageChip: {
    marginBottom: 8,
  },
  caloriesSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FFF3E0",
    borderRadius: 8,
  },
  caloriesContent: {
    marginLeft: 12,
    alignItems: "center",
  },
  caloriesValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF9800",
  },
  caloriesLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    flex: 1,
  },
  resetButton: {
    borderColor: "#D32F2F",
  },
  saveButton: {
    backgroundColor: "#0047AB",
  },
  recentItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  recentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  recentDetails: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
})
