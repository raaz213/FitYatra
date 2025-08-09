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
import { Plus, Image as ImageIcon, Edit, Trash2 } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import {
  addExerciseCategory,
  fetchAllCategories,
} from "../../../services/both/exercise/Category";
import type { Category } from "../../../types/both/exercise/Category";
import { API_URL } from "../../../constants/apiUrl";

export default function ExerciseCategoryScreen() {
  
  const theme = useTheme();
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddCategory = async () => {
    const formData = new FormData();
    formData.append("name", name);

    if (image) {
      const fileName = image.split("/").pop() || "photo.jpg";
      const fileType = fileName.split(".").pop();
      formData.append("image", {
        uri: image,
        name: fileName,
        type: `image/${fileType}`,
      } as any);
    }

    try {
      await addExerciseCategory(formData);
      Alert.alert("Category added successfully!");
      setName("");
      setImage(null);
    } catch (error) {
      Alert.alert("Failed to add category. Please try again.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchAllCategories();
      setCategories(response);
    };
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Exercise categories</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Add Category Section */}
        <View style={styles.addSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Add New Category</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              label="Category Name"
              value={name}
              onChangeText={setName}
              style={styles.textInput}
              mode="outlined"
              outlineColor="#E5E7EB"
              activeOutlineColor="#6366F1"
            />

            <TouchableOpacity
              onPress={pickImage}
              style={styles.imageUploadContainer}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <ImageIcon size={24} color="#6B7280" />
                  <Text style={styles.placeholderText}>Select Image</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAddCategory}
              style={styles.addButton}
            >
              <Plus size={18} color="white" />
              <Text style={styles.addButtonText}>Add Category</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories List Section */}
        <View style={styles.listSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>

          <View style={styles.tableContainer}>
            <DataTable>
              <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title
                  style={[styles.tableHeaderCell, { flex: 0.2 }]}
                >
                  <Text style={styles.tableHeaderText}>Image</Text>
                </DataTable.Title>
                <DataTable.Title
                  style={[styles.tableHeaderCell, { flex: 0.5 }]}
                >
                  <Text style={styles.tableHeaderText}>Name</Text>
                </DataTable.Title>
                <DataTable.Title
                  style={[styles.tableHeaderCell, { flex: 0.3 }]}
                >
                  <Text style={styles.tableHeaderText}>Actions</Text>
                </DataTable.Title>
              </DataTable.Header>

              {categories.map((category, index) => (
                <DataTable.Row key={index} style={styles.tableRow}>
                  <DataTable.Cell style={[styles.tableCell, { flex: 0.2 }]}>
                    <View style={styles.categoryImageContainer}>
                      <Image
                        source={{ uri: `${API_URL}/uploads/${category.image}` }}
                        style={styles.categoryImage}
                      />
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tableCell, { flex: 0.5 }]}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.tableCell, { flex: 0.3 }]}>
                    <View style={styles.actionButtonsContainer}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.editButton]}
                      >
                        <Edit size={18} color={"#06407a"} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                      >
                        <Trash2 size={18} color={theme.colors.error} />
                      </TouchableOpacity>
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </View>
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
  addSection: {
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
  listSection: {
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  formContainer: {
    gap: 16,
  },
  textInput: {
    backgroundColor: "white",
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
  placeholderText: {
    marginTop: 8,
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
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
