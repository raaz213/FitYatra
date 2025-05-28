"use client";

import { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import {
  DataTable,
  Text,
  Card,
  Title,
  useTheme,
  IconButton,
  Button,
  Modal,
  Portal,
  Divider,
  Chip,
  Searchbar,
} from "react-native-paper";
import { Eye, Edit, Trash2, Search, Plus } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";

interface Exercise {
  id: string;
  name: string;
  duration: string;
  sets: number;
  focusArea: string;
  instruction: string;
  youtubeUrl?: string;
  imageUri: string;
}

export default function ViewExercise({navigation}: any) {
  const theme = useTheme();
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: "1",
      name: "Push-ups",
      duration: "30 seconds",
      sets: 3,
      focusArea: "Chest",
      instruction:
        "Start in plank position, lower body until chest nearly touches floor, push back up.",
      youtubeUrl: "https://youtube.com/watch?v=example1",
      imageUri: "https://via.placeholder.com/300x200",
    },
    {
      id: "2",
      name: "Squats",
      duration: "45 seconds",
      sets: 4,
      focusArea: "Legs",
      instruction:
        "Stand with feet shoulder-width apart, lower body as if sitting back into chair, return to standing.",
      youtubeUrl: "https://youtube.com/watch?v=example2",
      imageUri: "https://via.placeholder.com/300x200",
    },
    {
      id: "3",
      name: "Plank",
      duration: "60 seconds",
      sets: 3,
      focusArea: "Core",
      instruction:
        "Hold body in straight line from head to heels, engage core muscles throughout.",
      imageUri: "https://via.placeholder.com/300x200",
    },
    {
      id: "4",
      name: "Burpees",
      duration: "20 seconds",
      sets: 3,
      focusArea: "Full Body",
      instruction:
        "Start standing, drop to squat, jump back to plank, do push-up, jump feet to squat, jump up.",
      youtubeUrl: "https://youtube.com/watch?v=example4",
      imageUri: "https://via.placeholder.com/300x200",
    },
    {
      id: "5",
      name: "Mountain Climbers",
      duration: "30 seconds",
      sets: 3,
      focusArea: "Cardio",
      instruction:
        "Start in plank position, alternate bringing knees to chest in running motion.",
      imageUri: "https://via.placeholder.com/300x200",
    },
  ]);

  const [page, setPage] = useState<number>(0);
  const [itemsPerPage] = useState<number>(5);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExercises, setFilteredExercises] =
    useState<Exercise[]>(exercises);

  // Filter exercises based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredExercises(exercises);
    } else {
      const filtered = exercises.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(query.toLowerCase()) ||
          exercise.focusArea.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredExercises(filtered);
    }
    setPage(0); // Reset to first page when searching
  };
  const handleAddExercise = () => {
    navigation.navigate("CreateExercise");
  };

  const handleViewDetails = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setDetailsVisible(true);
  };

  const handleEdit = (exercise: Exercise) => {
    Alert.alert(
      "Edit Exercise",
      `Edit functionality for "${exercise.name}" would be implemented here.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Edit",
          onPress: () => {
            // Navigate to edit screen or show edit modal
            console.log("Edit exercise:", exercise.id);
          },
        },
      ]
    );
  };

  const handleDelete = (exercise: Exercise) => {
    Alert.alert(
      "Delete Exercise",
      `Are you sure you want to delete "${exercise.name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedExercises = exercises.filter(
              (ex) => ex.id !== exercise.id
            );
            setExercises(updatedExercises);
            setFilteredExercises(
              updatedExercises.filter((ex) =>
                ex.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
            );
            Alert.alert("Success", "Exercise deleted successfully!");
          },
        },
      ]
    );
  };

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, filteredExercises.length);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        {/* Search and Filter Section */}
        <Card style={styles.searchCard}>
          <Card.Content>
            <View style={styles.searchContainer}>
              <Searchbar
                placeholder="Search exercises..."
                onChangeText={handleSearch}
                value={searchQuery}
                style={styles.searchbar}
                icon={({ size, color }) => <Search size={size} color={color} />}
              />
              <Button
                mode="contained"
                onPress={() => handleAddExercise()}
                style={styles.addButton}
                icon={({ size, color }) => <Plus size={size} color={color} />}
              >
                Add
              </Button>
            </View>
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>
                Total Exercises: {exercises.length}
              </Text>
              <Text style={styles.statsText}>
                Showing: {filteredExercises.length}{" "}
                {filteredExercises.length === 1 ? "exercise" : "exercises"}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Data Table */}
        <Card style={styles.tableCard}>
          <Card.Content>
            <Title style={styles.tableTitle}>Exercise List</Title>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{ flex: 2 }}>Name</DataTable.Title>
                <DataTable.Title style={{ flex: 1 }}>Sets</DataTable.Title>
                <DataTable.Title style={{ flex: 2 }}>Actions</DataTable.Title>
              </DataTable.Header>

              {filteredExercises.slice(from, to).map((exercise) => (
                <DataTable.Row key={exercise.id}>
                  <DataTable.Cell style={{ flex: 2 }}>
                    <View>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      {/* <Chip mode="outlined" style={styles.focusChip} compact>
                        {exercise.focusArea}
                      </Chip> */}
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1 }}>
                    {/* <Text style={styles.durationText}>{exercise.duration}</Text> */}
                    <Text style={styles.setsText}>{exercise.sets} sets</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 2 }}>
                    <View style={styles.actionButtons}>
                      <IconButton
                        icon={({ size, color }) => (
                          <Eye size={16} color={theme.colors.primary} />
                        )}
                        size={20}
                        onPress={() => handleViewDetails(exercise)}
                        style={styles.actionButton}
                      />
                      <IconButton
                        icon={({ size, color }) => (
                          <Edit size={16} color={theme.colors.secondary} />
                        )}
                        size={20}
                        onPress={() => handleEdit(exercise)}
                        style={styles.actionButton}
                      />
                      <IconButton
                        icon={({ size, color }) => (
                          <Trash2 size={16} color={theme.colors.error} />
                        )}
                        size={20}
                        onPress={() => handleDelete(exercise)}
                        style={styles.actionButton}
                      />
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}

              {filteredExercises.length === 0 && (
                <DataTable.Row>
                  <DataTable.Cell style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={styles.noDataText}>No exercises found</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              )}

              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(
                  filteredExercises.length / itemsPerPage
                )}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${filteredExercises.length}`}
                showFastPaginationControls
              />
            </DataTable>
          </Card.Content>
        </Card>
      </View>

      {/* Exercise Details Modal */}
      <Portal>
        <Modal
          visible={detailsVisible}
          onDismiss={() => setDetailsVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          {selectedExercise && (
            <ScrollView>
              <Title style={styles.modalTitle}>{selectedExercise.name}</Title>
              <Divider style={styles.modalDivider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Duration:</Text>
                <Text style={styles.detailValue}>
                  {selectedExercise.duration}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Sets:</Text>
                <Text style={styles.detailValue}>{selectedExercise.sets}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Focus Area:</Text>
                <Chip mode="outlined" style={styles.detailChip}>
                  {selectedExercise.focusArea}
                </Chip>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Instructions:</Text>
                <Text style={styles.instructionText}>
                  {selectedExercise.instruction}
                </Text>
              </View>

              {selectedExercise.youtubeUrl && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>YouTube URL:</Text>
                  <Text style={styles.urlText} numberOfLines={1}>
                    {selectedExercise.youtubeUrl}
                  </Text>
                </View>
              )}

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
                    handleEdit(selectedExercise);
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
  searchCard: {
    marginBottom: 16,
    elevation: 2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  searchbar: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#0047AB",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsText: {
    fontSize: 12,
    color: "#666",
  },
  tableCard: {
    flex: 1,
    elevation: 2,
  },
  tableTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  focusChip: {
    alignSelf: "flex-start",
    height: 24,
  },
  durationText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  setsText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  actionButton: {
    margin: 0,
    marginRight: 4,
  },
  noDataText: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    paddingVertical: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 8,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalDivider: {
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  detailChip: {
    height: 28,
  },
  detailSection: {
    marginBottom: 16,
  },
  instructionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginTop: 8,
  },
  urlText: {
    fontSize: 12,
    color: "#0047AB",
    flex: 1,
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
