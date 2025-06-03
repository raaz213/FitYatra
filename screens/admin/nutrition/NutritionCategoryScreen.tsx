"use client"

import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from "react-native"
import { TextInput, Button, DataTable, Text, Card, Title, useTheme, IconButton, Searchbar } from "react-native-paper"
import { Plus, Image as ImageIcon, Edit, Trash2, Apple, FileText, Search } from "lucide-react-native"
import { StatusBar } from "expo-status-bar"
import * as ImagePicker from "expo-image-picker"
import { addNutritionCategory, fetchNutritionCategories } from "../../../services/user/nutrition/Category"
import { Toast } from "toastify-react-native"
import { Category } from "../../../types/user/nutrition/Category"
import { API_URL } from "../../../constants/apiUrl"

export default function NutritionCategoryScreen() {
  const theme = useTheme()
  const [name, setName] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const[categories, setCategories] = useState<Category[]>([])
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri)
    }
  }
const handleSubmit = async() => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", {
        uri: image,
        name: image.split('/').pop() || 'image.jpg',
        type: `image/${image.split('.').pop()}`,
      } as any);
    }
    formData.append("description", description);
   await addNutritionCategory(formData);
   Toast.success("Category created successfully!");
   setName("");
   setDescription("");
    setImage(null);
  }
  catch (error) {
    Toast.error("Failed to create category. Please try again.");
  }
}
const getAllCategories = async () => {
  try {
   const response = await fetchNutritionCategories();
   setCategories(response);
  } catch (error) {
    Toast.error("Failed to fetch categories. Please try again.");
  }
}
useEffect(() => {
  getAllCategories();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FitYatra</Text>
        <Text style={styles.headerSubtitle}>Nutrition Categories</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Form Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Create New Category</Text>
            <View style={styles.form}>
              {/* Category Name */}
              <View style={styles.inputContainer}>
                <Apple size={20} color={theme.colors.primary} style={styles.inputIcon} />
                <TextInput
                  label="Category Name"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                  mode="outlined"
                  placeholder="e.g., Proteins, Carbohydrates"
                />
              </View>

              {/* Image Picker */}
              <View style={styles.inputContainer}>
                <ImageIcon size={20} color={theme.colors.primary} style={styles.inputIcon} />
                <View style={styles.imageSection}>
                  <Text style={styles.inputLabel}>Category Image</Text>
                  <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    {image ? (
                      <Image source={{ uri: image }} style={styles.previewImage} />
                    ) : (
                      <View style={[styles.placeholderImage, { backgroundColor: theme.colors.surfaceVariant }]}>
                        <ImageIcon size={32} color={theme.colors.onSurfaceVariant} />
                        <Text style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}>Tap to select image</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Description */}
              <View style={styles.inputContainer}>
                <FileText size={20} color={theme.colors.primary} style={styles.inputIcon} />
                <TextInput
                  label="Description"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={3}
                  style={styles.textArea}
                  mode="outlined"
                  placeholder="Describe the nutrition category and its benefits..."
                />
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={[styles.button, styles.saveButton]}
                  icon={({ size, color }) => <Plus size={size} color={color} />}
                >
                 Create Category
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>


        {/* Categories Table */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.tableTitle}>Nutrition Categories</Title>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{ flex: 0.3 }}>Image</DataTable.Title>
                <DataTable.Title style={{ flex: 1 }}>Name</DataTable.Title>
                <DataTable.Title style={{ flex: 0.8 }}>Actions</DataTable.Title>
              </DataTable.Header>

             
              {
                categories.map((category,index) => (
                    <DataTable.Row key={index}>
                  <DataTable.Cell style={{ flex: 0.3 }}>
                    <Image source={{ uri: `${API_URL}/uploads/${category.image}` }} style={styles.tableImage} />
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1 }}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 0.8 }}>
                    <View style={styles.actionButtons}>
                      <IconButton
                        icon={({ size, color }) => <Edit size={16} color={theme.colors.primary} />}
                        size={20}
                        // onPress={() => handleEdit(category)}
                        style={styles.actionButton}
                      />
                      <IconButton
                        icon={({ size, color }) => <Trash2 size={16} color={theme.colors.error} />}
                        size={20}
                        // onPress={() => handleDelete(category)}
                        style={styles.actionButton}
                      />
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
                ))
              }
              
              {categories.length === 0 && (
                <DataTable.Row>
                  <DataTable.Cell style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={styles.noDataText}>No categories found</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              )}
            </DataTable>
          </Card.Content>
        </Card>

      </ScrollView>
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
  textArea: {
    flex: 1,
    height: 80,
  },
 imageSection: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  }, 
  imagePicker: {
    marginBottom: 8,
  },
  previewImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    resizeMode: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#ccc",
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
  tableImage: {
    width: 50,
    height: 40,
    borderRadius: 6,
    resizeMode: "cover",
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  createdDate: {
    fontSize: 10,
    color: "#999",
  },
  descriptionText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
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
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  summaryItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  summaryImage: {
    width: 60,
    height: 45,
    borderRadius: 6,
    marginBottom: 8,
    resizeMode: "cover",
  },
  summaryName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  summaryCount: {
    fontSize: 10,
    color: "#666",
  },
})
