"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from "react-native"
import { TextInput, Button, DataTable, Text, Card, Title, useTheme, IconButton, Searchbar } from "react-native-paper"
import { Plus, Image as ImageIcon, Edit, Trash2, Apple, FileText, Search } from "lucide-react-native"
import { StatusBar } from "expo-status-bar"
import * as ImagePicker from "expo-image-picker"

interface NutritionCategory {
  id: string
  name: string
  imageUri: string
  description: string
  itemCount: number
  createdAt: string
}

export default function NutritionCategoryScreen() {
  const theme = useTheme()
  const [name, setName] = useState("")
  const [imageUri, setImageUri] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [categories, setCategories] = useState<NutritionCategory[]>([
    {
      id: "1",
      name: "Proteins",
      imageUri: "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Proteins",
      description:
        "High-protein foods including meat, fish, eggs, and plant-based proteins for muscle building and repair.",
      itemCount: 45,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Carbohydrates",
      imageUri: "https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Carbs",
      description: "Energy-providing carbohydrates including grains, fruits, and vegetables for sustained energy.",
      itemCount: 38,
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      name: "Healthy Fats",
      imageUri: "https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Fats",
      description: "Essential fatty acids from nuts, seeds, avocados, and oils for brain and heart health.",
      itemCount: 22,
      createdAt: "2024-01-08",
    },
    {
      id: "4",
      name: "Vitamins & Minerals",
      imageUri: "https://via.placeholder.com/300x200/F7DC6F/FFFFFF?text=Vitamins",
      description: "Micronutrients from fruits, vegetables, and supplements for optimal body function.",
      itemCount: 31,
      createdAt: "2024-01-05",
    },
    {
      id: "5",
      name: "Hydration",
      imageUri: "https://via.placeholder.com/300x200/85C1E9/FFFFFF?text=Hydration",
      description: "Water and hydrating beverages essential for body function and performance.",
      itemCount: 12,
      createdAt: "2024-01-03",
    },
  ])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [page, setPage] = useState<number>(0)
  const [itemsPerPage] = useState<number>(4)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCategories, setFilteredCategories] = useState<NutritionCategory[]>(categories)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredCategories(categories)
    } else {
      const filtered = categories.filter(
        (category) =>
          category.name.toLowerCase().includes(query.toLowerCase()) ||
          category.description.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredCategories(filtered)
    }
    setPage(0)
  }

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert("Validation Error", "Please enter category name")
      return false
    }
    if (!description.trim()) {
      Alert.alert("Validation Error", "Please enter description")
      return false
    }
    return true
  }

  const handleSave = () => {
    if (!validateForm()) return

    if (editingId) {
      // Update existing category
      const updatedCategories = categories.map((cat) =>
        cat.id === editingId
          ? {
              ...cat,
              name,
              imageUri: imageUri || cat.imageUri,
              description,
            }
          : cat,
      )
      setCategories(updatedCategories)
      setFilteredCategories(
        updatedCategories.filter(
          (cat) =>
            cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.description.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
      setEditingId(null)
      Alert.alert("Success", "Category updated successfully!")
    } else {
      // Add new category
      const newCategory: NutritionCategory = {
        id: Date.now().toString(),
        name,
        imageUri: imageUri || "https://via.placeholder.com/300x200/95A5A6/FFFFFF?text=New+Category",
        description,
        itemCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      }
      const updatedCategories = [...categories, newCategory]
      setCategories(updatedCategories)
      setFilteredCategories(
        updatedCategories.filter(
          (cat) =>
            cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.description.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
      Alert.alert("Success", "Category created successfully!")
    }

    // Reset form
    setName("")
    setImageUri(null)
    setDescription("")
  }

  const handleEdit = (category: NutritionCategory) => {
    setName(category.name)
    setImageUri(category.imageUri)
    setDescription(category.description)
    setEditingId(category.id)
  }

  const handleDelete = (category: NutritionCategory) => {
    Alert.alert(
      "Delete Category",
      `Are you sure you want to delete "${category.name}"? This will also remove all ${category.itemCount} nutrition items in this category.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedCategories = categories.filter((cat) => cat.id !== category.id)
            setCategories(updatedCategories)
            setFilteredCategories(
              updatedCategories.filter(
                (cat) =>
                  cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  cat.description.toLowerCase().includes(searchQuery.toLowerCase()),
              ),
            )
            if (editingId === category.id) {
              setName("")
              setImageUri(null)
              setDescription("")
              setEditingId(null)
            }
            Alert.alert("Success", "Category deleted successfully!")
          },
        },
      ],
    )
  }

  const handleReset = () => {
    setName("")
    setImageUri(null)
    setDescription("")
    setEditingId(null)
  }

  const from = page * itemsPerPage
  const to = Math.min((page + 1) * itemsPerPage, filteredCategories.length)

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
            <Title style={styles.title}>{editingId ? "Edit Category" : "Create New Category"}</Title>

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
                    {imageUri ? (
                      <Image source={{ uri: imageUri }} style={styles.previewImage} />
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
                  mode="outlined"
                  onPress={handleReset}
                  style={[styles.button, styles.resetButton]}
                  labelStyle={{ color: theme.colors.error }}
                >
                  {editingId ? "Cancel" : "Reset"}
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSave}
                  style={[styles.button, styles.saveButton]}
                  icon={({ size, color }) => <Plus size={size} color={color} />}
                >
                  {editingId ? "Update Category" : "Create Category"}
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Search and Stats */}
        {/* <Card style={styles.card}>
          <Card.Content>
            <View style={styles.searchContainer}>
              <Searchbar
                placeholder="Search categories..."
                onChangeText={handleSearch}
                value={searchQuery}
                style={styles.searchbar}
                icon={({ size, color }) => <Search size={size} color={color} />}
              />
            </View>
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>Total Categories: {categories.length}</Text>
              <Text style={styles.statsText}>
                Total Items: {categories.reduce((sum, cat) => sum + cat.itemCount, 0)}
              </Text>
            </View>
          </Card.Content>
        </Card> */}

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

              {filteredCategories.slice(from, to).map((category) => (
                <DataTable.Row key={category.id}>
                  <DataTable.Cell style={{ flex: 0.3 }}>
                    <Image source={{ uri: category.imageUri }} style={styles.tableImage} />
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1 }}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 0.8 }}>
                    <View style={styles.actionButtons}>
                      <IconButton
                        icon={({ size, color }) => <Edit size={16} color={theme.colors.primary} />}
                        size={20}
                        onPress={() => handleEdit(category)}
                        style={styles.actionButton}
                      />
                      <IconButton
                        icon={({ size, color }) => <Trash2 size={16} color={theme.colors.error} />}
                        size={20}
                        onPress={() => handleDelete(category)}
                        style={styles.actionButton}
                      />
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}

              {filteredCategories.length === 0 && (
                <DataTable.Row>
                  <DataTable.Cell style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={styles.noDataText}>No categories found</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              )}

              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(filteredCategories.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${filteredCategories.length}`}
                showFastPaginationControls
              />
            </DataTable>
          </Card.Content>
        </Card>

        {/* Category Summary */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.tableTitle}>Category Summary</Title>
            <View style={styles.summaryGrid}>
              {categories.slice(0, 4).map((category) => (
                <View key={category.id} style={styles.summaryItem}>
                  <Image source={{ uri: category.imageUri }} style={styles.summaryImage} />
                  <Text style={styles.summaryName}>{category.name}</Text>
                  <Text style={styles.summaryCount}>{category.itemCount} items</Text>
                </View>
              ))}
            </View>
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
