"use client";

import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  TextInput,
  Button,
  DataTable,
  Text,
  Card,
  useTheme,
  Chip,
  IconButton,
  Surface,
} from "react-native-paper";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  FileText,
  Tag,
} from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import DropDownPicker from "react-native-dropdown-picker";
import {
  addExerciseSubcategory,
  getExerciseSubcategories,
} from "../../../services/user/exercise/Subcategory";
import { Toast } from "toastify-react-native";
import { fetchAllCategories } from "../../../services/user/exercise/Category";
import { Subcategory } from "../../../types/user/exercise/Subcategory";



export default function ExerciseSubcategoryScreen() {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [dayNumber, setDayNumber] = useState<number>(1);
  const [description, setDescription] = useState("");
  const [page, setPage] = useState<number>(0);
  const [itemsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const handleAddSubcategory = async () => {
    setLoading(true);
    try {
      await addExerciseSubcategory({
        name: name.trim(),
        dayNumber,
        description: description.trim(),
        category: selectedCategory,
      });
      Toast.success("Subcategory added successfully");
      setName("");
      setDayNumber(1);
      setDescription("");
      setSelectedCategory("");
      fetchSubcategories();
    } catch (error) {
      Toast.error("Failed to add subcategory");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetchAllCategories();
      const dropdownItems = response.map((category) => ({
        label: category.name,
        value: category._id,
      }));
      setItems(dropdownItems);
    } catch (error) {
      Toast.error("Failed to load categories");
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await getExerciseSubcategories();
      
      setSubcategories(response);
    } catch (error) {
      Toast.error("Failed to load subcategories");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const isFormValid = name.trim() && selectedCategory && dayNumber >= 1;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />

      <Surface style={styles.header} elevation={4}>
        <Text style={styles.headerTitle}>Exercise Subcategories</Text>
        <Text style={styles.headerSubtitle}>Manage your workout categories</Text>
      </Surface>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={styles.formCard} elevation={2}>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.sectionTitle}>Add New Subcategory</Text>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <View style={styles.inputHeader}>
                  <Tag size={18} color={theme.colors.primary} />
                  <Text style={styles.inputLabel}>Subcategory Name *</Text>
                </View>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                  mode="outlined"
                  placeholder="Enter subcategory name"
                />
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.inputHeader}>
                  <Tag size={18} color={theme.colors.primary} />
                  <Text style={styles.inputLabel}>Category *</Text>
                </View>
                <View style={styles.dropdownContainer}>
                  <DropDownPicker
                    open={open}
                    value={selectedCategory}
                    items={items}
                    setOpen={setOpen}
                    setValue={setSelectedCategory}
                    setItems={setItems}
                    placeholder="Select a category"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.inputHeader}>
                  <Calendar size={18} color={theme.colors.primary} />
                  <Text style={styles.inputLabel}>Number of Days *</Text>
                </View>
                <TextInput
                  value={dayNumber.toString()}
                  onChangeText={(text) => {
                    const num = parseInt(text) || 0;
                    setDayNumber(Math.max(1, num));
                  }}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                  placeholder="1"
                />
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.inputHeader}>
                  <FileText size={18} color={theme.colors.primary} />
                  <Text style={styles.inputLabel}>Description</Text>
                </View>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  style={styles.input}
                  mode="outlined"
                  placeholder="Enter description (optional)"
                />
              </View>

              <Button
                onPress={handleAddSubcategory}
                mode="contained"
                style={styles.submitButton}
                disabled={!isFormValid || loading}
                loading={loading}
                icon={({ size, color }) => <Plus size={size} color={color} />}
              >
                {loading ? "Adding..." : "Add Subcategory"}
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.listCard} elevation={2}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.listHeader}>
              <Text style={styles.sectionTitle}>Subcategories</Text>
              <Chip>{subcategories.length}</Chip>
            </View>

            {subcategories.length === 0 ? (
              <Text>No subcategories yet</Text>
            ) : (
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Name</DataTable.Title>
                  <DataTable.Title numeric>Days</DataTable.Title>
                  <DataTable.Title>Actions</DataTable.Title>
                </DataTable.Header>
                {subcategories
                  .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                  .map((sub, index) => (
                    <DataTable.Row key={index}>
                      <DataTable.Cell>{sub.name}</DataTable.Cell>
                      <DataTable.Cell numeric>{sub.dayNumber}</DataTable.Cell>
                      <DataTable.Cell>
                        <View style={styles.actionButtons}>
                          <IconButton
                            icon={() => <Edit size={18} color={theme.colors.primary} />}
                            size={20}
                          />
                          <IconButton
                            icon={() => <Trash2 size={18} color="#e74c3c" />}
                            size={20}
                          />
                        </View>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                {subcategories.length > itemsPerPage && (
                  <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(subcategories.length / itemsPerPage)}
                    onPageChange={(newPage) => setPage(newPage)}
                    label={`${page * itemsPerPage + 1}-${Math.min(
                      (page + 1) * itemsPerPage,
                      subcategories.length
                    )} of ${subcategories.length}`}
                  />
                )}
              </DataTable>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#1e40af",
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginTop: 4,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  formCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  listCard: {
    borderRadius: 12,
  },
  cardContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  form: {
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  inputLabel: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    zIndex: 10,
  },
  submitButton: {
    marginTop: 12,
    borderRadius: 8,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
});