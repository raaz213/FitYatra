"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Alert } from "react-native"
import {
  Text,
  Title,
  useTheme,
  IconButton,
  Button,
  Modal,
  Portal,
  Divider,
  Chip,
  ProgressBar,
} from "react-native-paper"
import { Eye, Edit, Trash2, Search, Zap } from "lucide-react-native"
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
  totalProtein: number
  totalCarbs: number
  totalFats: number
  totalCalories: number
  proteinPercentage: number
  carbsPercentage: number
  fatsPercentage: number
  createdAt: string
}

export default function ViewNutrition({navigation}:any) {
  const theme = useTheme()
  const [nutritionItems, setNutritionItems] = useState<NutritionItem[]>([
    {
      id: "1",
      name: "Chicken Breast",
      totalIntake: 100,
      proteinPer1g: 0.31,
      carbsPer1g: 0,
      fatsPer1g: 0.036,
      features: ["High in protein", "Low in fat"],
      keyBenefits:
        "Excellent source of lean protein for muscle building and repair. Low in saturated fat and calories.",
      totalProtein: 31,
      totalCarbs: 0,
      totalFats: 3.6,
      totalCalories: 156,
      proteinPercentage: 79.2,
      carbsPercentage: 0,
      fatsPercentage: 20.8,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Brown Rice",
      totalIntake: 150,
      proteinPer1g: 0.073,
      carbsPer1g: 0.72,
      fatsPer1g: 0.009,
      features: ["Complex carbohydrates", "High in fiber"],
      keyBenefits: "Provides sustained energy through complex carbohydrates. Rich in fiber and essential nutrients.",
      totalProtein: 10.95,
      totalCarbs: 108,
      totalFats: 1.35,
      totalCalories: 492,
      proteinPercentage: 8.9,
      carbsPercentage: 87.8,
      fatsPercentage: 2.5,
      createdAt: "2024-01-14",
    },
    {
      id: "3",
      name: "Avocado",
      totalIntake: 80,
      proteinPer1g: 0.02,
      carbsPer1g: 0.085,
      fatsPer1g: 0.147,
      features: ["Healthy monounsaturated fats", "Rich in potassium"],
      keyBenefits: "Excellent source of healthy fats and fiber. Supports heart health and nutrient absorption.",
      totalProtein: 1.6,
      totalCarbs: 6.8,
      totalFats: 11.76,
      totalCalories: 134,
      proteinPercentage: 4.8,
      carbsPercentage: 20.4,
      fatsPercentage: 79.2,
      createdAt: "2024-01-13",
    },
    {
      id: "4",
      name: "Greek Yogurt",
      totalIntake: 170,
      proteinPer1g: 0.1,
      carbsPer1g: 0.036,
      fatsPer1g: 0.004,
      features: ["High protein content", "Probiotic benefits"],
      keyBenefits: "Rich in protein and probiotics. Supports digestive health and muscle recovery.",
      totalProtein: 17,
      totalCarbs: 6.12,
      totalFats: 0.68,
      totalCalories: 100,
      proteinPercentage: 68.3,
      carbsPercentage: 24.6,
      fatsPercentage: 6.1,
      createdAt: "2024-01-12",
    },
    {
      id: "5",
      name: "Almonds",
      totalIntake: 30,
      proteinPer1g: 0.211,
      carbsPer1g: 0.219,
      fatsPer1g: 0.497,
      features: ["Rich in vitamin E", "Heart-healthy fats"],
      keyBenefits: "Packed with healthy fats, protein, and vitamin E. Supports heart health and brain function.",
      totalProtein: 6.33,
      totalCarbs: 6.57,
      totalFats: 14.91,
      totalCalories: 174,
      proteinPercentage: 14.6,
      carbsPercentage: 15.1,
      fatsPercentage: 77.1,
      createdAt: "2024-01-11",
    },
  ])

  const [page, setPage] = useState<number>(0)
  const [itemsPerPage] = useState<number>(4)
  const [selectedNutrition, setSelectedNutrition] = useState<NutritionItem | null>(null)
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredNutrition, setFilteredNutrition] = useState<NutritionItem[]>(nutritionItems)

  // Filter nutrition items based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredNutrition(nutritionItems)
    } else {
      const filtered = nutritionItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.features.some((feature) => feature.toLowerCase().includes(query.toLowerCase())),
      )
      setFilteredNutrition(filtered)
    }
    setPage(0)
  }

  const handleViewDetails = (nutrition: NutritionItem) => {
    setSelectedNutrition(nutrition)
    setDetailsVisible(true)
  }

  const handleEdit = (nutrition: NutritionItem) => {
    Alert.alert("Edit Nutrition", `Edit functionality for "${nutrition.name}" would be implemented here.`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Edit",
        onPress: () => {
          console.log("Edit nutrition:", nutrition.id)
        },
      },
    ])
  }

  const handleDelete = (nutrition: NutritionItem) => {
    Alert.alert("Delete Nutrition", `Are you sure you want to delete "${nutrition.name}"?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updatedNutrition = nutritionItems.filter((item) => item.id !== nutrition.id)
          setNutritionItems(updatedNutrition)
          setFilteredNutrition(
            updatedNutrition.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
          )
          Alert.alert("Success", "Nutrition item deleted successfully!")
        },
      },
    ])
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

  const getTotalStats = () => {
    return {
      totalItems: nutritionItems.length,
      totalCalories: Math.round(nutritionItems.reduce((sum, item) => sum + item.totalCalories, 0)),
      avgProtein:
        Math.round(
          (nutritionItems.reduce((sum, item) => sum + item.proteinPercentage, 0) / nutritionItems.length) * 10,
        ) / 10,
      avgCarbs:
        Math.round((nutritionItems.reduce((sum, item) => sum + item.carbsPercentage, 0) / nutritionItems.length) * 10) /
        10,
    }
  }

  const stats = getTotalStats()
  const from = page * itemsPerPage
  const to = Math.min((page + 1) * itemsPerPage, filteredNutrition.length)

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FitYatra</Text>
        <Text style={styles.headerSubtitle}>View Nutrition</Text>
      </View>

      <View style={styles.content}>
        {/* Search and Stats Section */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              placeholder="Search nutrition items..."
              onChangeText={handleSearch}
              value={searchQuery}
              style={styles.searchInput}
            />
          </View>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("CreateNutrition")}
            style={styles.addButton}
            labelStyle={styles.addButtonLabel}
          >
            Add
          </Button>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statsItem}>
            <Text style={styles.statsValue}>{stats.totalItems}</Text>
            <Text style={styles.statsLabel}>Items</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsValue}>{stats.totalCalories}</Text>
            <Text style={styles.statsLabel}>Total Cal</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={[styles.statsValue, { color: getMacroColor("protein") }]}>{stats.avgProtein}%</Text>
            <Text style={styles.statsLabel}>Avg Protein</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={[styles.statsValue, { color: getMacroColor("carbs") }]}>{stats.avgCarbs}%</Text>
            <Text style={styles.statsLabel}>Avg Carbs</Text>
          </View>
        </View>

        {/* Data Table */}
        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Nutrition Items</Text>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 2 }]}>Name</Text>
            <Text style={[styles.headerCell, { flex: 1, textAlign: "center" }]}>Calories</Text>
            <Text style={[styles.headerCell, { flex: 1, textAlign: "center" }]}>Actions</Text>
          </View>

          {/* Table Rows */}
          <ScrollView style={styles.tableBody}>
            {filteredNutrition.map((nutrition) => (
              <View key={nutrition.id} style={styles.tableRow}>
                <View style={[styles.tableCell, { flex: 2 }]}>
                  <Text style={styles.itemName}>{nutrition.name}</Text>
                  <Text style={styles.itemIntake}>{nutrition.totalIntake}g</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1, alignItems: "center" }]}>
                  <Text style={styles.caloriesText}>{Math.round(nutrition.totalCalories)}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1, flexDirection: "row", justifyContent: "center" }]}>
                  <IconButton
                    icon={({ size, color }) => <Eye size={18} color={theme.colors.primary} />}
                    size={20}
                    onPress={() => handleViewDetails(nutrition)}
                    style={styles.actionButton}
                  />
                  <IconButton
                    icon={({ size, color }) => <Edit size={18} color={theme.colors.secondary} />}
                    size={20}
                    onPress={() => handleEdit(nutrition)}
                    style={styles.actionButton}
                  />
                  <IconButton
                    icon={({ size, color }) => <Trash2 size={18} color={theme.colors.error} />}
                    size={20}
                    onPress={() => handleDelete(nutrition)}
                    style={styles.actionButton}
                  />
                </View>
              </View>
            ))}

            {filteredNutrition.length === 0 && (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No nutrition items found</Text>
              </View>
            )}
          </ScrollView>

          {/* Pagination */}
          <View style={styles.pagination}>
            <Text style={styles.paginationText}>
              {from + 1}-{to} of {filteredNutrition.length}
            </Text>
            <View style={styles.paginationControls}>
              <IconButton
                icon="page-first"
                size={20}
                onPress={() => setPage(0)}
                disabled={page === 0}
                style={styles.paginationButton}
              />
              <IconButton
                icon="chevron-left"
                size={20}
                onPress={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                style={styles.paginationButton}
              />
              <IconButton
                icon="chevron-right"
                size={20}
                onPress={() => setPage(Math.min(Math.ceil(filteredNutrition.length / itemsPerPage) - 1, page + 1))}
                disabled={page >= Math.ceil(filteredNutrition.length / itemsPerPage) - 1}
                style={styles.paginationButton}
              />
              <IconButton
                icon="page-last"
                size={20}
                onPress={() => setPage(Math.ceil(filteredNutrition.length / itemsPerPage) - 1)}
                disabled={page >= Math.ceil(filteredNutrition.length / itemsPerPage) - 1}
                style={styles.paginationButton}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Nutrition Details Modal */}
      <Portal>
        <Modal
          visible={detailsVisible}
          onDismiss={() => setDetailsVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          {selectedNutrition && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Title style={styles.modalTitle}>{selectedNutrition.name}</Title>
              <Divider style={styles.modalDivider} />

              {/* Basic Info */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Basic Information</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Total Intake:</Text>
                  <Text style={styles.detailValue}>{selectedNutrition.totalIntake}g</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Created:</Text>
                  <Text style={styles.detailValue}>{selectedNutrition.createdAt}</Text>
                </View>
              </View>

              {/* Calories */}
              <View style={styles.caloriesDetailSection}>
                <Zap size={24} color="#FF9800" />
                <View style={styles.caloriesDetailContent}>
                  <Text style={styles.caloriesDetailValue}>{Math.round(selectedNutrition.totalCalories)}</Text>
                  <Text style={styles.caloriesDetailLabel}>Total Calories</Text>
                </View>
              </View>

              {/* Macronutrients */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Macronutrient Breakdown</Text>

                {/* Protein */}
                <View style={styles.macroDetailRow}>
                  <View style={styles.macroDetailHeader}>
                    <View style={[styles.macroDetailIcon, { backgroundColor: getMacroColor("protein") }]}>
                      <Text style={styles.macroDetailIconText}>P</Text>
                    </View>
                    <Text style={styles.macroDetailName}>Protein</Text>
                  </View>
                  <View style={styles.macroDetailValues}>
                    <Text style={styles.macroDetailAmount}>{selectedNutrition.totalProtein}g</Text>
                    <Text style={styles.macroDetailPercentage}>{selectedNutrition.proteinPercentage}%</Text>
                  </View>
                  <ProgressBar
                    progress={selectedNutrition.proteinPercentage / 100}
                    color={getMacroColor("protein")}
                    style={styles.progressBar}
                  />
                </View>

                {/* Carbs */}
                <View style={styles.macroDetailRow}>
                  <View style={styles.macroDetailHeader}>
                    <View style={[styles.macroDetailIcon, { backgroundColor: getMacroColor("carbs") }]}>
                      <Text style={styles.macroDetailIconText}>C</Text>
                    </View>
                    <Text style={styles.macroDetailName}>Carbohydrates</Text>
                  </View>
                  <View style={styles.macroDetailValues}>
                    <Text style={styles.macroDetailAmount}>{selectedNutrition.totalCarbs}g</Text>
                    <Text style={styles.macroDetailPercentage}>{selectedNutrition.carbsPercentage}%</Text>
                  </View>
                  <ProgressBar
                    progress={selectedNutrition.carbsPercentage / 100}
                    color={getMacroColor("carbs")}
                    style={styles.progressBar}
                  />
                </View>

                {/* Fats */}
                <View style={styles.macroDetailRow}>
                  <View style={styles.macroDetailHeader}>
                    <View style={[styles.macroDetailIcon, { backgroundColor: getMacroColor("fats") }]}>
                      <Text style={styles.macroDetailIconText}>F</Text>
                    </View>
                    <Text style={styles.macroDetailName}>Fats</Text>
                  </View>
                  <View style={styles.macroDetailValues}>
                    <Text style={styles.macroDetailAmount}>{selectedNutrition.totalFats}g</Text>
                    <Text style={styles.macroDetailPercentage}>{selectedNutrition.fatsPercentage}%</Text>
                  </View>
                  <ProgressBar
                    progress={selectedNutrition.fatsPercentage / 100}
                    color={getMacroColor("fats")}
                    style={styles.progressBar}
                  />
                </View>
              </View>

              {/* Features */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Features</Text>
                <View style={styles.featuresContainer}>
                  {selectedNutrition.features.map((feature, index) => (
                    <Chip key={index} mode="outlined" style={styles.featureChip}>
                      {feature}
                    </Chip>
                  ))}
                </View>
              </View>

              {/* Benefits */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Key Benefits</Text>
                <Text style={styles.benefitsText}>{selectedNutrition.keyBenefits}</Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.modalButtons}>
                <Button mode="outlined" onPress={() => setDetailsVisible(false)} style={styles.modalButton}>
                  Close
                </Button>
                <Button
                  mode="contained"
                  onPress={() => {
                    setDetailsVisible(false)
                    handleEdit(selectedNutrition)
                  }}
                  style={styles.modalButton}
                  icon={({ size, color }) => <Edit size={size} color={color} />}
                >
                  Edit
                </Button>
              </View>
            </ScrollView>
          )}
        </Modal>
      </Portal>
    </View>
  )
}

// Custom TextInput component to match the design in the image
const TextInput = ({ placeholder, value, onChangeText, style }:any) => {
  return (
    <View style={[styles.textInputContainer, style]}>
      <Text style={styles.textInput}>{value || placeholder}</Text>
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
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  textInputContainer: {
    flex: 1,
  },
  textInput: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    borderRadius: 20,
    backgroundColor: "#0047AB",
    paddingHorizontal: 8,
  },
  addButtonLabel: {
    fontSize: 14,
    marginHorizontal: 8,
  },
  statsCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  statsItem: {
    alignItems: "center",
  },
  statsValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statsLabel: {
    fontSize: 10,
    color: "#666",
    marginTop: 2,
  },
  tableContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerCell: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  tableBody: {
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingVertical: 12,
  },
  tableCell: {
    justifyContent: "center",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  itemIntake: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  caloriesText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF9800",
  },
  actionButton: {
    margin: 0,
    padding: 0,
    width: 28,
    height: 28,
  },
  noDataContainer: {
    padding: 20,
    alignItems: "center",
  },
  noDataText: {
    color: "#666",
    fontStyle: "italic",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  paginationText: {
    fontSize: 12,
    color: "#666",
  },
  paginationControls: {
    flexDirection: "row",
  },
  paginationButton: {
    margin: 0,
    padding: 0,
    width: 28,
    height: 28,
  },
  modalContainer: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 8,
    maxHeight: "85%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  modalDivider: {
    marginVertical: 16,
  },
  detailSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  caloriesDetailSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FFF3E0",
    borderRadius: 8,
    marginBottom: 20,
  },
  caloriesDetailContent: {
    marginLeft: 12,
    alignItems: "center",
  },
  caloriesDetailValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF9800",
  },
  caloriesDetailLabel: {
    fontSize: 14,
    color: "#666",
  },
  macroDetailRow: {
    marginBottom: 16,
  },
  macroDetailHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  macroDetailIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  macroDetailIconText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  macroDetailName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    flex: 1,
  },
  macroDetailValues: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  macroDetailAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  macroDetailPercentage: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  featureChip: {
    marginBottom: 4,
  },
  benefitsText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
})
