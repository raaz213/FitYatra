import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput, DataTable, Text, useTheme } from "react-native-paper";
import { Edit, Plus, Tag, Trash2 } from "lucide-react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  addNutritionSubcategory,
  fetchNutritionSubcategories,
} from "../../../services/both/nutrition/Subcategory";
import type { Subcategory } from "../../../types/both/nutrition/Subcategory";
import { fetchNutritionCategories } from "../../../services/both/nutrition/Category";
import type { Category } from "../../../types/both/nutrition/Category";

export default function NutritionSubcategoryScreen() {

  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await fetchNutritionCategories();
      const dropDownItems = response.map((category: Category) => ({
        label: category.name,
        value: category._id,
      }));
      setItems(dropDownItems);
    } catch (error) {
      Alert.alert("Failed to fetch categories. Please try again.");
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetchNutritionSubcategories();
      setSubcategories(response);
    } catch (error) {
      Alert.alert("Failed to fetch subcategories. Please try again.");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const handleSave = async () => {
    try {
      await addNutritionSubcategory({ name, category: selectedCategory });
      Alert.alert("Subcategory created successfully!");
      setName("");
      setSelectedCategory("");
      setOpen(false);
      fetchSubcategories();
    } catch (e) {
      Alert.alert("Failed to create subcategory. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Nutrition Subcategories</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Create New Subcategory Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Add New Subcategory</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <Tag size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Subcategory Name</Text>
              </View>
              <TextInput
                label="Subcategory Name"
                value={name}
                onChangeText={setName}
                style={styles.textInput}
                mode="outlined"
                placeholder="e.g., Lean Meats, Whole Grains"
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <Tag size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Category</Text>
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
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownList}
                  textStyle={styles.dropdownText}
                  placeholderStyle={styles.dropdownPlaceholder}
                />
              </View>
            </View>

            <TouchableOpacity onPress={handleSave} style={styles.addButton}>
              <Plus size={18} color="white" />
              <Text style={styles.addButtonText}>Create Subcategory</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nutrition Subcategories Table Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nutrition Subcategories</Text>
            <View style={styles.countChip}>
              <Text style={styles.countText}>{subcategories.length}</Text>
            </View>
          </View>

          {subcategories.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No subcategories found</Text>
            </View>
          ) : (
            <View style={styles.tableContainer}>
              <DataTable>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title
                    style={[styles.tableHeaderCell, { flex: 1.2, justifyContent: 'flex-start' }]}
                  >
                    <Text style={styles.tableHeaderText}>Name</Text>
                  </DataTable.Title>
                  <DataTable.Title
                    style={[styles.tableHeaderCell, { flex: 1, justifyContent: "flex-start"}]}
                  >
                    <Text style={styles.tableHeaderText}>Category</Text>
                  </DataTable.Title>
                  <DataTable.Title
                    style={[styles.tableHeaderCell, { flex: 0.8 }]}
                  >
                    <Text style={styles.tableHeaderText}>Actions</Text>
                  </DataTable.Title>
                </DataTable.Header>

                {subcategories.map((subcategory, index) => (
                  <DataTable.Row key={index} style={styles.tableRow}>
                    <DataTable.Cell style={[styles.tableCell, { flex: 1.2, justifyContent: "flex-start" }]}>
                      <Text style={styles.subcategoryName}>
                        {subcategory.name}
                      </Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={[styles.tableCell, { flex: 1, justifyContent: "flex-start" }]}>
                      <View style={styles.parentCategoryChip}>
                        <Text style={styles.parentCategoryChipText}>
                          {subcategory.category.name}
                        </Text>
                      </View>
                    </DataTable.Cell>
                    <DataTable.Cell style={[styles.tableCell, { flex: 0.8 }]}>
                      <View style={styles.actionButtonsContainer}>
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
              </DataTable>
            </View>
          )}
        </View>
      </ScrollView>
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
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 4,
  },
  inputHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  inputIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  textInput: {
    backgroundColor: "white",
  },
  dropdownContainer: {
    zIndex: 1000, // Ensure dropdown is above other elements
  },
  dropdown: {
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "white",
    minHeight: 56,
  },
  dropdownList: {
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "white",
  },
  dropdownText: {
    fontSize: 16,
    color: "#111827",
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: "#6B7280",
  },
  addButton: {
    backgroundColor: "#06407a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
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
  subcategoryName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  parentCategoryChip: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  parentCategoryChipText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6366F1",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
  },
  editButton: {
    backgroundColor: "#EEF2FF",
  },
  deleteButton: {
    backgroundColor: "#FEF2F2",
  },
});
