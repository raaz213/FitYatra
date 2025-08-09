"use client"
import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Text, useTheme, Modal, Portal, ProgressBar, DataTable, Searchbar } from "react-native-paper"
import { Eye, Edit, Trash2, Search, Zap, Plus } from "lucide-react-native"
import { StatusBar } from "expo-status-bar"
import { fetchNutritionDietById, fetchNutritionDiets, getSearchNutritions } from "../../../services/both/nutrition/Diet"
import type { Diet } from "../../../types/both/nutrition/diet"

export default function ViewNutrition({ navigation }: any) {
 
  const numberOfItemsPerPageList = [5, 10, 15]
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState<number>(numberOfItemsPerPageList[0])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [selectedDiet, setSelectedDiet] = useState<Diet | null>(null)
  const [search, setSearch] = useState<string>("")
  const [displayDietData, setDisplayDietData] = useState<Diet[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  const fetchDiets = async (page: number, limit: number) => {
    try {
      const response = await fetchNutritionDiets(page, limit)
      setDisplayDietData(response.data)
      setTotalPages(Number(response.totalPages))
      setTotalCount(Number(response.totalCounts))
      setPage(Number(response.currentPage))
    } catch (error) {
      console.error(error)
    }
  }

  const fetchSearchNutritions = async (page: number, limit: number) => {
    try {
      const response = await getSearchNutritions(search, page, limit)
      setDisplayDietData(response.data)
      setTotalPages(Number(response.totalPages))
      setTotalCount(Number(response.totalCounts))
      setPage(Number(response.currentPage))
    } catch (error) {
      console.error("Error fetching search exercises:", error)
    }
  }

  useEffect(() => {
    if (search.trim() === "") {
      fetchDiets(page, numberOfItemsPerPage)
    } else {
      fetchSearchNutritions(page, numberOfItemsPerPage)
    }
  }, [search, page, numberOfItemsPerPage])

  const handleViewDetails = async (dietId: string) => {
    try {
      const response = await fetchNutritionDietById(dietId)
      setDetailsVisible(true)
      setSelectedDiet(response)
    } catch (error) {
      console.error(error)
      setDetailsVisible(false)
    }
  }

  const getMacroColor = (macro: string) => {
    switch (macro) {
      case "protein":
        return "#EF4444" // Red-500
      case "carbs":
        return "#F59E0B" // Amber-500
      case "fats":
        return "#10B981" // Emerald-500
      default:
        return "#6B7280" // Gray-500
    }
  }

  const totalItems = displayDietData.length
  const calTotalCalories = () => {
    let totalCalories = 0
    displayDietData.forEach((diet) => {
      totalCalories += diet.totalCalories
    })
    return Math.round(totalCalories)
  }
  const avgProtein = () => {
    let totalProtein = 0
    displayDietData.forEach((diet) => {
      totalProtein += diet.macronutrient.protein
    })
    return totalItems > 0 ? Number.parseFloat((totalProtein / totalItems).toFixed(1)) : 0
  }
  const avgCarbs = () => {
    let totalCarbs = 0
    displayDietData.forEach((diet) => {
      totalCarbs += diet.macronutrient.carbohydrates
    })
    return totalItems > 0 ? Number.parseFloat((totalCarbs / totalItems).toFixed(1)) : 0
  }

  const from = page * numberOfItemsPerPage
  const to = Math.min((page + 1) * numberOfItemsPerPage, totalCount)

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.headerContent}>
    
          <Text style={styles.headerTitle}>Nutrition</Text>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search and Actions Section */}
        <View style={styles.section}>
       

          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Search nutrition items..."
              value={search}
              onChangeText={(query) => setSearch(query)}
              style={styles.searchbar}
              icon={({ size, color }) => <Search size={size} color={color} />}
            />
            <TouchableOpacity onPress={() => navigation.navigate("CreateNutrition")} style={styles.addButton}>
              <Plus size={18} color="white" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Stats</Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statsItem}>
              <Text style={styles.statsValue}>{totalItems}</Text>
              <Text style={styles.statsLabel}>Items</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={styles.statsValue}>{calTotalCalories()}</Text>
              <Text style={styles.statsLabel}>Total Cal</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={[styles.statsValue, { color: getMacroColor("protein") }]}>{avgProtein()}</Text>
              <Text style={styles.statsLabel}>Avg Protein</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={[styles.statsValue, { color: getMacroColor("carbs") }]}>{avgCarbs()}</Text>
              <Text style={styles.statsLabel}>Avg Carbs</Text>
            </View>
          </View>
        </View>

        {/* Nutrition Items List Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nutrition Items</Text>
            <View style={styles.countChip}>
              <Text style={styles.countText}>{totalCount}</Text>
            </View>
          </View>

          {displayDietData.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No nutrition items found.</Text>
            </View>
          ) : (
            <View style={styles.tableContainer}>
              <DataTable>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title style={[styles.tableHeaderCell, { flex: 2, justifyContent: "flex-start" }]}>
                    <Text style={styles.tableHeaderText}>Name</Text>
                  </DataTable.Title>
                  <DataTable.Title numeric style={[styles.tableHeaderCell, { flex: 1, justifyContent: "flex-start" }]}>
                    <Text style={styles.tableHeaderText}>Calories</Text>
                  </DataTable.Title>
                  <DataTable.Title style={[styles.tableHeaderCell, { flex: 2 }]}>
                    <Text style={styles.tableHeaderText}>Actions</Text>
                  </DataTable.Title>
                </DataTable.Header>

                {displayDietData.map((item, index) => (
                  <DataTable.Row key={index} style={styles.tableRow}>
                    <DataTable.Cell style={[styles.tableCell, { flex: 2, justifyContent: "flex-start" }]}>
                      <Text style={styles.itemName}>{item.name}</Text>
               
                    </DataTable.Cell>
                    <DataTable.Cell numeric style={[styles.tableCell, { flex: 1, justifyContent: "flex-start" }]}>
                      <Text style={styles.caloriesText}>{Math.round(item.totalCalories)}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={[styles.tableCell, { flex: 2 }]}>
                      <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity
                          style={[styles.actionButton, styles.viewButton]}
                          onPress={() => handleViewDetails(item._id)}
                        >
                          <Eye size={16} color="#6366F1" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
                          <Edit size={16} color="#6366F1" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
                          <Trash2 size={16} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}

                <DataTable.Pagination
                  page={page}
                  numberOfPages={totalPages}
                  onPageChange={(page) => setPage(page)}
                  label={`${from + 1}-${to} of ${totalCount} `}
                  showFastPaginationControls
                  numberOfItemsPerPageList={numberOfItemsPerPageList}
                  numberOfItemsPerPage={numberOfItemsPerPage}
                  onItemsPerPageChange={() => {
                    setNumberOfItemsPerPage(numberOfItemsPerPage)
                    setPage(0)
                  }}
                  selectPageDropdownLabel={"Rows per page"}
                  style={styles.pagination}
                />
              </DataTable>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Nutrition Details Modal */}
      <Portal>
        <Modal
          visible={detailsVisible}
          onDismiss={() => setDetailsVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          {selectedDiet && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedDiet.name}</Text>
              </View>

              <View style={styles.modalContent}>
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Basic Information</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Total Intake:</Text>
                    <Text style={styles.detailValue}>{selectedDiet.intake}g</Text>
                  </View>
                </View>

                <View style={styles.caloriesDetailSection}>
                  <Zap size={24} color="#FF9800" />
                  <View style={styles.caloriesDetailContent}>
                    <Text style={styles.caloriesDetailValue}>{Math.round(selectedDiet.totalCalories)}kcal</Text>
                    <Text style={styles.caloriesDetailLabel}>Total Calories</Text>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Macronutrient Breakdown</Text>
                  <View style={styles.macroDetailRow}>
                    <View style={styles.macroDetailHeader}>
                      <View style={[styles.macroDetailIcon, { backgroundColor: getMacroColor("protein") }]}>
                        <Text style={styles.macroDetailIconText}>P</Text>
                      </View>
                      <Text style={styles.macroDetailName}>Protein</Text>
                    </View>
                    <View style={styles.macroDetailValues}>
                      <Text style={styles.macroDetailAmount}>{selectedDiet.macronutrient.protein}g</Text>
                      <Text style={styles.macroDetailPercentage}>{selectedDiet.macronutrientPercent.protein}%</Text>
                    </View>
                    <ProgressBar
                      progress={selectedDiet.macronutrientPercent.protein / 100}
                      color={getMacroColor("protein")}
                      style={styles.progressBar}
                    />
                  </View>
                  <View style={styles.macroDetailRow}>
                    <View style={styles.macroDetailHeader}>
                      <View style={[styles.macroDetailIcon, { backgroundColor: getMacroColor("carbs") }]}>
                        <Text style={styles.macroDetailIconText}>C</Text>
                      </View>
                      <Text style={styles.macroDetailName}>Carbohydrates</Text>
                    </View>
                    <View style={styles.macroDetailValues}>
                      <Text style={styles.macroDetailAmount}>{selectedDiet.macronutrient.carbohydrates}g</Text>
                      <Text style={styles.macroDetailPercentage}>
                        {selectedDiet.macronutrientPercent.carbohydrates}%
                      </Text>
                    </View>
                    <ProgressBar
                      progress={selectedDiet.macronutrientPercent.carbohydrates / 100}
                      color={getMacroColor("carbs")}
                      style={styles.progressBar}
                    />
                  </View>
                  <View style={styles.macroDetailRow}>
                    <View style={styles.macroDetailHeader}>
                      <View style={[styles.macroDetailIcon, { backgroundColor: getMacroColor("fats") }]}>
                        <Text style={styles.macroDetailIconText}>F</Text>
                      </View>
                      <Text style={styles.macroDetailName}>Fats</Text>
                    </View>
                    <View style={styles.macroDetailValues}>
                      <Text style={styles.macroDetailAmount}>{selectedDiet.macronutrient.fats}g</Text>
                      <Text style={styles.macroDetailPercentage}>{selectedDiet.macronutrientPercent.fats}%</Text>
                    </View>
                    <ProgressBar
                      progress={selectedDiet.macronutrientPercent.fats / 100}
                      color={getMacroColor("fats")}
                      style={styles.progressBar}
                    />
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Features</Text>
                  <View style={styles.featuresContainer}>
                    {selectedDiet.features.map((feature, index) => (
                      <View key={index} style={styles.featureChip}>
                        <Text style={styles.featureChipText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Key Benefits</Text>
                  <Text style={styles.benefitsText}>{selectedDiet.benefits}</Text>
                </View>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={() => setDetailsVisible(false)}
                  style={[styles.modalButton, styles.closeButton]}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setDetailsVisible(false)}
                  style={[styles.modalButton, styles.editModalButton]}
                >
                  <Edit size={16} color="white" />
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </Modal>
      </Portal>
    </View>
  )
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
  countChip: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6366F1",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchbar: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 0, 
  },
  addButton: {
    backgroundColor: "#06407a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
  },
  statsItem: {
    width: "48%", // Adjust for 2 columns with gap
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  statsValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
    textAlign: "center",
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#6B7280",
    fontStyle: "italic",
  },
  tableContainer: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#FAFAFA",
  },
  tableHeader: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
  },
  tableHeaderCell: {
    justifyContent: "center",
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  tableRow: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingVertical: 12,
  },
  tableCell: {
    justifyContent: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  itemIntake: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  caloriesText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#F97316",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
  },
  viewButton: {
    backgroundColor: "#EEF2FF",
  },
  editButton: {
    backgroundColor: "#EEF2FF",
  },
  deleteButton: {
    backgroundColor: "#FEF2F2",
  },
  pagination: {
    backgroundColor: "white",
    paddingVertical: 8,
  },
  modalContainer: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeader: {
    backgroundColor: "#F8FAFC",
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  modalContent: {
    padding: 24,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  detailValue: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
    textAlign: "right",
  },
  caloriesDetailSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FFF7ED",
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  caloriesDetailContent: {
    marginLeft: 12,
    alignItems: "center",
  },
  caloriesDetailValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F97316",
  },
  caloriesDetailLabel: {
    fontSize: 14,
    color: "#6B7280",
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
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  macroDetailIconText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  macroDetailName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
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
    color: "#374151",
  },
  macroDetailPercentage: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E5E7EB",
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  featureChip: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  featureChipText: {
    fontSize: 12,
    color: "#6366F1",
    fontWeight: "500",
  },
  benefitsText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginTop: 8,
  },
  modalButtons: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  editModalButton: {
    backgroundColor: "#6366F1",
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
    marginLeft: 6,
  },
})
