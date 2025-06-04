"use client";

import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
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
} from "react-native-paper";
import { Eye, Edit, Trash2, Search, Zap } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import {
  fetchNutritionDietById,
  fetchNutritionDiets,
} from "../../../services/user/nutrition/Diet";
import { Diet } from "../../../types/user/nutrition/diet";

export default function ViewNutrition({ navigation }: any) {
  const theme = useTheme();
  const [diets, setDiets] = useState<Diet[]>([]);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [dietDetails, setDietDetails] = useState<Diet | null>(null);

  const fetchDiets = async () => {
    try {
      const response = await fetchNutritionDiets();
      setDiets(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDiets();
  }, []);

  const handleViewDetails = async (dietId: string) => {
    try {
      const response = await fetchNutritionDietById(dietId);
      setDetailsVisible(true);
      setDietDetails(response);
    } catch (error) {
      console.error(error);
      setDetailsVisible(false);
    }
  };
  const getMacroColor = (macro: string) => {
    switch (macro) {
      case "protein":
        return "#FF6B6B";
      case "carbs":
        return "#4ECDC4";
      case "fats":
        return "#45B7D1";
      default:
        return "#95A5A6";
    }
  };
 const totalItems = diets.length;
 const calTotalCalories = ()=> {
  let totalCalories = 0;
  diets.forEach((diet) => {
    totalCalories += diet.totalCalories;
  });
  return totalCalories;
 }
 const avgProtein = () => {
  let totalProtein = 0;
  diets.forEach((diet) => {
    totalProtein += diet.macronutrient.protein;
  });
  return totalProtein / totalItems;
 }
  const avgCarbs = () => {
  let totalCarbs = 0;
  diets.forEach((diet) => {
    totalCarbs += diet.macronutrient.carbohydrates;
  });
  return totalCarbs / totalItems;
  }

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
            <Text style={styles.statsValue}>{totalItems}</Text>
            <Text style={styles.statsLabel}>Items</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsValue}>{calTotalCalories()}</Text>
            <Text style={styles.statsLabel}>Total Cal</Text>
          </View>
          <View style={styles.statsItem}>
            <Text
              style={[styles.statsValue, { color: getMacroColor("protein") }]}
            >
              {avgProtein()}
            </Text>
            <Text style={styles.statsLabel}>Avg Protein</Text>
          </View>
          <View style={styles.statsItem}>
            <Text
              style={[styles.statsValue, { color: getMacroColor("carbs") }]}
            >
             { avgCarbs()}
            </Text>
            <Text style={styles.statsLabel}>Avg Carbs</Text>
          </View>
        </View>

        {/* Data Table */}
        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Nutrition Items</Text>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 2 }]}>Name</Text>
            <Text style={[styles.headerCell, { flex: 1, textAlign: "center" }]}>
              Calories
            </Text>
            <Text style={[styles.headerCell, { flex: 1, textAlign: "center" }]}>
              Actions
            </Text>
          </View>

          {/* Table Rows */}
          {diets.length > 0 ? (
            <ScrollView style={styles.tableBody}>
              {diets.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={[styles.tableCell, { flex: 2 }]}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemIntake}>{item.intake}g</Text>
                  </View>
                  <View
                    style={[
                      styles.tableCell,
                      { flex: 1, alignItems: "center" },
                    ]}
                  >
                    <Text style={styles.caloriesText}>
                      {Math.round(item.totalCalories)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.tableCell,
                      {
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <IconButton
                      icon={({ size, color }) => (
                        <Eye size={18} color={theme.colors.primary} />
                      )}
                      size={20}
                      onPress={() => handleViewDetails(item._id)}
                      style={styles.actionButton}
                    />
                    <IconButton
                      icon={({ size, color }) => (
                        <Edit size={18} color={theme.colors.secondary} />
                      )}
                      size={20}
                      style={styles.actionButton}
                    />
                    <IconButton
                      icon={({ size, color }) => (
                        <Trash2 size={18} color={theme.colors.error} />
                      )}
                      size={20}
                      style={styles.actionButton}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No nutrition items found.</Text>
            </View>
          )}

          {/* Pagination */}
          {/* <View style={styles.pagination}>
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
          </View> */}
        </View>
      </View>

      {/* Nutrition Details Modal */}
      <Portal>
        <Modal
          visible={detailsVisible}
          onDismiss={() => setDetailsVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          {dietDetails && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>{dietDetails.name}</Text>
              <Divider style={styles.modalDivider} />

              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Basic Information</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Total Intake:</Text>
                  <Text style={styles.detailValue}>{dietDetails.intake}g</Text>
                </View>
              </View>

              <View style={styles.caloriesDetailSection}>
                <Zap size={24} color="#FF9800" />
                <View style={styles.caloriesDetailContent}>
                  <Text style={styles.caloriesDetailValue}>
                    {Math.round(dietDetails.totalCalories)}
                  </Text>
                  <Text style={styles.caloriesDetailLabel}>Total Calories</Text>
                </View>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Macronutrient Breakdown</Text>

                <View style={styles.macroDetailRow}>
                  <View style={styles.macroDetailHeader}>
                    <View
                      style={[
                        styles.macroDetailIcon,
                        { backgroundColor: getMacroColor("protein") },
                      ]}
                    >
                      <Text style={styles.macroDetailIconText}>P</Text>
                    </View>
                    <Text style={styles.macroDetailName}>Protein</Text>
                  </View>
                  <View style={styles.macroDetailValues}>
                    <Text style={styles.macroDetailAmount}>
                      {dietDetails.macronutrient.protein}g
                    </Text>
                    <Text style={styles.macroDetailPercentage}>
                      {dietDetails.macronutrientPercent.protein}%
                    </Text>
                  </View>
                  <ProgressBar
                    progress={dietDetails.macronutrientPercent.protein / 100}
                    color={getMacroColor("protein")}
                    style={styles.progressBar}
                  />
                </View>

                <View style={styles.macroDetailRow}>
                  <View style={styles.macroDetailHeader}>
                    <View
                      style={[
                        styles.macroDetailIcon,
                        { backgroundColor: getMacroColor("carbs") },
                      ]}
                    >
                      <Text style={styles.macroDetailIconText}>C</Text>
                    </View>
                    <Text style={styles.macroDetailName}>Carbohydrates</Text>
                  </View>
                  <View style={styles.macroDetailValues}>
                    <Text style={styles.macroDetailAmount}>
                      {dietDetails.macronutrient.carbohydrates}g
                    </Text>
                    <Text style={styles.macroDetailPercentage}>
                      {dietDetails.macronutrientPercent.carbohydrates}%
                    </Text>
                  </View>
                  <ProgressBar
                    progress={
                      dietDetails.macronutrientPercent.carbohydrates / 100
                    }
                    color={getMacroColor("carbs")}
                    style={styles.progressBar}
                  />
                </View>

                <View style={styles.macroDetailRow}>
                  <View style={styles.macroDetailHeader}>
                    <View
                      style={[
                        styles.macroDetailIcon,
                        { backgroundColor: getMacroColor("fats") },
                      ]}
                    >
                      <Text style={styles.macroDetailIconText}>F</Text>
                    </View>
                    <Text style={styles.macroDetailName}>Fats</Text>
                  </View>
                  <View style={styles.macroDetailValues}>
                    <Text style={styles.macroDetailAmount}>
                      {dietDetails.macronutrient.fats}g
                    </Text>
                    <Text style={styles.macroDetailPercentage}>
                      {dietDetails.macronutrientPercent.fats}%
                    </Text>
                  </View>
                  <ProgressBar
                    progress={dietDetails.macronutrientPercent.fats / 100}
                    color={getMacroColor("fats")}
                    style={styles.progressBar}
                  />
                </View>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Features</Text>
                <View style={styles.featuresContainer}>
                  {dietDetails.features.map((feature, index) => (
                    <Chip
                      key={index}
                      mode="outlined"
                      style={styles.featureChip}
                    >
                      {feature}
                    </Chip>
                  ))}
                </View>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Key Benefits</Text>
                <Text style={styles.benefitsText}>{dietDetails.benefits}</Text>
              </View>

              <View style={styles.modalButtons}>
                <Button
                  mode="outlined"
                  onPress={() => setDetailsVisible(false)}
                  style={styles.modalButton}
                >
                  Close
                </Button>
                <Button
                  mode="contained"
                  onPress={() => {
                    setDetailsVisible(false);
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
  );
}

// Custom TextInput component to match the design in the image
const TextInput = ({ placeholder, value, onChangeText, style }: any) => {
  return (
    <View style={[styles.textInputContainer, style]}>
      <Text style={styles.textInput}>{value || placeholder}</Text>
    </View>
  );
};

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
});
