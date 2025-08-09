
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput, DataTable, Text, useTheme } from "react-native-paper";
import {
  Plus,
  Image as ImageIcon,
  Edit,
  Trash2,
  Apple,
  FileText,
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import {
  addNutritionCategory,
  fetchNutritionCategories,
} from "../../../services/both/nutrition/Category";
import type { Category } from "../../../types/both/nutrition/Category";
import { API_URL } from "../../../constants/apiUrl";

export default function NutritionCategoryScreen() {
  
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) {
        formData.append("image", {
          uri: image,
          name: image.split("/").pop() || "image.jpg",
          type: `image/${image.split(".").pop()}`,
        } as any);
      }
      formData.append("description", description);
      await addNutritionCategory(formData);
      Alert.alert("Category created successfully!");
      setName("");
      setDescription("");
      setImage(null);
      getAllCategories(); 
    } catch (error) {
      Alert.alert("Failed to create category. Please try again.");
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await fetchNutritionCategories();
      setCategories(response);
    } catch (error) {
      Alert.alert("Failed to fetch categories. Please try again.");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Nutrition Categories</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Create New Category Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Add New Category</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <Apple size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Category Name</Text>
              </View>
              <TextInput
                label="Category Name"
                value={name}
                onChangeText={setName}
                style={styles.textInput}
                mode="outlined"
                placeholder="e.g., Proteins, Carbohydrates"
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <ImageIcon size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Category Image</Text>
              </View>
              <TouchableOpacity
                onPress={pickImage}
                style={styles.imageUploadContainer}
              >
                {image ? (
                  <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <View style={styles.imagePlaceholderIconContainer}>
                      <ImageIcon size={32} color="#6B7280" />
                    </View>
                    <Text style={styles.placeholderText}>
                      Tap to select image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <FileText size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Description</Text>
              </View>
              <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                style={[styles.textInput, styles.textArea]}
                mode="outlined"
                placeholder="Describe the nutrition category and its benefits..."
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
              <Plus size={18} color="white" />
              <Text style={styles.addButtonText}>Create Category</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nutrition Categories Table Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nutrition Categories</Text>
            <View style={styles.countChip}>
              <Text style={styles.countText}>{categories.length}</Text>
            </View>
          </View>

          {categories.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No categories found</Text>
            </View>
          ) : (
            <View style={styles.tableContainer}>
              <DataTable>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title
                    style={[styles.tableHeaderCell, { flex: 0.3 }]}
                  >
                    <Text style={styles.tableHeaderText}>Image</Text>
                  </DataTable.Title>
                  <DataTable.Title
                    style={[styles.tableHeaderCell, { flex: 1 }]}
                  >
                    <Text style={styles.tableHeaderText}>Name</Text>
                  </DataTable.Title>
                  <DataTable.Title
                    style={[styles.tableHeaderCell, { flex: 0.8 }]}
                  >
                    <Text style={styles.tableHeaderText}>Actions</Text>
                  </DataTable.Title>
                </DataTable.Header>

                {categories.map((category, index) => (
                  <DataTable.Row key={index} style={styles.tableRow}>
                    <DataTable.Cell style={[styles.tableCell, { flex: 0.3 }]}>
                      <View style={styles.categoryImageContainer}>
                        <Image
                          source={{
                            uri: `${API_URL}/uploads/${category.image}`,
                          }}
                          style={styles.categoryImage}
                        />
                      </View>
                    </DataTable.Cell>
                    <DataTable.Cell style={[styles.tableCell, { flex: 1 }]}>
                      <Text style={styles.categoryName}>{category.name}</Text>
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
  textArea: {
    minHeight: 100,
  },
  imageUploadContainer: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
  },
  previewImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  imagePlaceholder: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  imagePlaceholderIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "500",
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
  categoryImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 6,
    overflow: "hidden",
  },
  categoryImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
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
