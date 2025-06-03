"use client";

import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Card,
  useTheme,
  DataTable,
  Chip,
  IconButton,
} from "react-native-paper";
import { Edit, Plus, Tag, Trash2 } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import DropDownPicker from "react-native-dropdown-picker";
import {
  addNutritionSubcategory,
  fetchNutritionSubcategories,
} from "../../../services/user/nutrition/Subcategory";
import {
  formData,
  Subcategory,
} from "../../../types/user/nutrition/Subcategory";
import { Toast } from "toastify-react-native";
import { fetchNutritionCategories } from "../../../services/user/nutrition/Category";
import { Category } from "../../../types/user/nutrition/Category";

export default function NutritionSubcategoryScreen() {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await fetchNutritionCategories();
      const dropDownItems = response.map((category) => ({
        label: category.name,
        value: category._id,
      }));
      setItems(dropDownItems);
    } catch (error) {
      Toast.error("Failed to fetch categories. Please try again.");
    }
  };
  const fetchSubcategories = async () => {
    try {
      const response = await fetchNutritionSubcategories();
      setSubcategories(response);
    } catch (error) {
      Toast.error("Failed to fetch subcategories. Please try again.");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const handleSave = async () => {
    try {
      await addNutritionSubcategory({ name, category: selectedCategory });
      Toast.success("Subcategory created successfully!");
      setName("");
      setSelectedCategory("");
      setOpen(false);
    } catch (e) {
      Toast.error("Failed to create subcategory. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FitYatra</Text>
        <Text style={styles.headerSubtitle}>Nutrition Subcategories</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Form Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Create New Subcategory</Text>

            <View style={styles.form}>
              {/* Subcategory Name */}
              <View style={styles.inputContainer}>
                <Tag
                  size={20}
                  color={theme.colors.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  label="Subcategory Name"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                  mode="outlined"
                  placeholder="e.g., Lean Meats, Whole Grains"
                />
              </View>

              {/* Parent Category Selection */}
              <View style={styles.inputContainer}>
                <Tag
                  size={20}
                  color={theme.colors.primary}
                  style={styles.inputIcon}
                />
                <DropDownPicker
                  open={open}
                  value={selectedCategory}
                  items={items}
                  setOpen={setOpen}
                  setValue={setSelectedCategory}
                  setItems={setItems}
                  placeholder="Select a category"
                  style={{ width: "90%" }}
                  dropDownContainerStyle={{ width: "90%" }}
                />
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  onPress={handleSave}
                  style={[styles.button, styles.saveButton]}
                  icon={({ size, color }) => <Plus size={size} color={color} />}
                >
                  Create Subcategory
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>
        {/* Subcategories Table */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.tableTitle}>Nutrition Subcategories</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{ flex: 1.2 }}>Name</DataTable.Title>
                <DataTable.Title style={{ flex: 1 }}>
                  Parent Category
                </DataTable.Title>
                <DataTable.Title style={{ flex: 0.8 }}>Actions</DataTable.Title>
              </DataTable.Header>

              {subcategories.map((subcategory, index) => {
              
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell style={{ flex: 1.2 }}>
                      <Text style={styles.subcategoryName}>
                        {subcategory.name}
                      </Text>
                    </DataTable.Cell>

                    <DataTable.Cell style={{ flex: 1 }}>
                      <Chip mode="outlined" style={styles.parentChip} compact>
                        {subcategory.category.name}
                      </Chip>
                    </DataTable.Cell>

                    <DataTable.Cell style={{ flex: 0.8 }}>
                      <View style={styles.actionButtons}>
                        <IconButton
                          icon={({ size, color }) => (
                            <Edit size={16} color={theme.colors.primary} />
                          )}
                          size={20}
                          style={styles.actionButton}
                          // onPress={() => handleEdit(subcategory)} /
                        />
                        <IconButton
                          icon={({ size, color }) => (
                            <Trash2 size={16} color={theme.colors.error} />
                          )}
                          size={20}
                          style={styles.actionButton}
                          // onPress={() => handleDelete(subcategory)}
                        />
                      </View>
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}

              {subcategories.length === 0 && (
                <DataTable.Row>
                  <DataTable.Cell style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={styles.noDataText}>
                      No subcategories found
                    </Text>
                  </DataTable.Cell>
                </DataTable.Row>
              )}
            </DataTable>
          </Card.Content>
        </Card>
      </ScrollView>
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
  form: {
    marginBottom: 8,
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
  input: {
    flex: 1,
  },
  dropdownContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: "white",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  selectedChip: {
    alignSelf: "flex-start",
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 8,
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
  searchContainer: {
    marginBottom: 12,
  },
  searchbar: {
    elevation: 0,
    backgroundColor: "#f8f9fa",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  tableTitle: {
    fontSize: 18,
    marginBottom: 8,
    color: "#333",
  },
  subcategoryName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  createdDate: {
    fontSize: 10,
    color: "#999",
  },
  parentChip: {
    alignSelf: "flex-start",
    height: 28,
  },
  itemCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0047AB",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  actionButton: {
    margin: 0,
    marginLeft: 4,
  },
  noDataText: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    paddingVertical: 20,
  },
  groupContainer: {
    marginBottom: 16,
  },
  groupHeader: {
    marginBottom: 8,
  },
  groupChip: {
    alignSelf: "flex-start",
  },
  subcategoryList: {
    paddingLeft: 16,
  },
  subcategoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f8f9fa",
    marginBottom: 4,
    borderRadius: 6,
  },
  subcategoryItemName: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  subcategoryItemCount: {
    fontSize: 12,
    color: "#666",
  },
  groupDivider: {
    marginTop: 8,
  },
});
