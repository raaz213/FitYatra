"use client";

import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { DataTable, Text, useTheme, Modal, Portal } from "react-native-paper";
import { Eye, Edit, Trash2, Search, Plus } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import {
  getAllExercises,
  getExerciseById,
  getSearchExercises,
} from "../../../services/both/exercise/Exercise";
import type { Exercise } from "../../../types/both/exercise/Exercise";

export default function ViewExercise({ navigation }: any) {

  const numberOfItemsPerPageList = [5, 10, 15, 20];
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState<number>(
    numberOfItemsPerPageList[3]
  );
  const [totalCount, setTotalCount] = useState<number>(0);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [search, setSearch] = useState<string>("");
  const [displayExerciseData, setDisplayExerciseData] = useState<Exercise[]>(
    []
  );
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleAddExercise = () => {
    navigation.navigate("CreateExercise");
  };

  const fetchAllExercises = async (page: number, limit: number) => {
    try {
      const response = await getAllExercises(page, limit);
      setDisplayExerciseData(response.data);
      setTotalPages(Number(response.totalPages));
      setTotalCount(Number(response.totalCounts));
      setPage(Number(response.currentPage));
    } catch (error) {
      console.error("Error fetch in exercises", error);
    }
  };

  const fetchSearchExercises = async (page: number, limit: number) => {
    try {
      const response = await getSearchExercises(search, page, limit);
      setDisplayExerciseData(response.data);
      setTotalPages(Number(response.totalPages));
      setTotalCount(Number(response.totalCounts));
      setPage(Number(response.currentPage));
    } catch (error) {
      console.error("Error fetching search exercises:", error);
    }
  };

  useEffect(() => {
    if (search.trim() === "") {
      fetchAllExercises(page, numberOfItemsPerPage);
    } else {
      fetchSearchExercises(page, numberOfItemsPerPage);
    }
  }, [search, page, numberOfItemsPerPage]);

  const handleViewDetails = async (exerciseId: string) => {
    setDetailsVisible(true);
    const response = await getExerciseById(exerciseId);
    setSelectedExercise(response);
  };

  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, totalCount);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Exercise List</Text>
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
            <View style={styles.searchInputContainer}>
              <View style={styles.searchIconContainer}>
                <Search size={18} color="#6B7280" />
              </View>
              <View style={styles.searchInput}>
                <TouchableOpacity>
                  <Text style={styles.searchText}>
                    {search || "Search exercises..."}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleAddExercise}
              style={styles.addButton}
            >
              <Plus size={18} color="white" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Exercise List Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exercise List</Text>
            <View style={styles.countChip}>
              <Text style={styles.countText}>{totalCount}</Text>
            </View>
          </View>

          {displayExerciseData.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No exercises found</Text>
            </View>
          ) : (
            <View style={styles.tableContainer}>
              <DataTable>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title
                    style={[styles.tableHeaderCell, { flex: 2, justifyContent: "flex-start" }]}
                  >
                    <Text style={styles.tableHeaderText}>Name</Text>
                  </DataTable.Title>
                  <DataTable.Title
                    style={[styles.tableHeaderCell, { flex: 1 }]}
                  >
                    <Text style={styles.tableHeaderText}>Sets</Text>
                  </DataTable.Title>
                  <DataTable.Title
                    style={[styles.tableHeaderCell, { flex: 2 }]}
                  >
                    <Text style={styles.tableHeaderText}>Actions</Text>
                  </DataTable.Title>
                </DataTable.Header>

                {displayExerciseData.map((exercise, index) => (
                  <DataTable.Row key={index} style={styles.tableRow}>
                    <DataTable.Cell style={[styles.tableCell, { flex: 2, justifyContent: "flex-start" }]}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={[styles.tableCell, { flex: 1 }]}>
                      <Text style={styles.setsText}>{exercise.sets} sets</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={[styles.tableCell, { flex: 2 }]}>
                      <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity
                          style={[styles.actionButton, styles.viewButton]}
                          onPress={() => handleViewDetails(exercise._id)}
                        >
                          <Eye size={16} color="#6366F1" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.actionButton, styles.editButton]}
                        >
                          <Edit size={16} color="#6366F1" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.actionButton, styles.deleteButton]}
                        >
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
                  label={`${from + 1}-${to} of ${totalCount} exercises`}
                  showFastPaginationControls
                  numberOfItemsPerPageList={numberOfItemsPerPageList}
                  numberOfItemsPerPage={numberOfItemsPerPage}
                  onItemsPerPageChange={() => {
                    setNumberOfItemsPerPage(numberOfItemsPerPage);
                    setPage(0);
                  }}
                  selectPageDropdownLabel={"Rows per page"}
                  style={styles.pagination}
                />
              </DataTable>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Exercise Details Modal */}
      <Portal>
        <Modal
          visible={detailsVisible}
          onDismiss={() => setDetailsVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          {selectedExercise && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedExercise.name}</Text>
              </View>

              <View style={styles.modalContent}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Duration:</Text>
                  <Text style={styles.detailValue}>
                    {selectedExercise.duration}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Sets:</Text>
                  <Text style={styles.detailValue}>
                    {selectedExercise.sets}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>MET Value:</Text>
                  <Text style={styles.detailValue}>
                    {selectedExercise.metValue}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Focus Area:</Text>
                  <View style={styles.focusAreaContainer}>
                    {selectedExercise.focusArea.map((fa, index) => (
                      <View key={index} style={styles.focusChip}>
                        <Text style={styles.focusChipText}>{fa}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Instructions:</Text>
                  <Text style={styles.instructionText}>
                    {selectedExercise.instructions}
                  </Text>
                </View>

                {selectedExercise.videoUrl && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>YouTube URL:</Text>
                    <Text style={styles.urlText} numberOfLines={1}>
                      {selectedExercise.videoUrl}
                    </Text>
                  </View>
                )}
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
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchIconContainer: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
  },

  searchText: {
    fontSize: 16,
    color: "#111827",
  },
  addButton: {
    backgroundColor: "#06407a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
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
  exerciseName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  setsText: {
    fontSize: 14,
    color: "#6B7280",
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
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
  },
  focusAreaContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  focusChip: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  focusChipText: {
    fontSize: 12,
    color: "#6366F1",
    fontWeight: "500",
  },
  detailSection: {
    marginBottom: 16,
  },
  instructionText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginTop: 8,
  },
  urlText: {
    fontSize: 12,
    color: "#6366F1",
    flex: 1,
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
});
