"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import {
  TextInput,
  Button,
  DataTable,
  Text,
  Card,
  Title,
  useTheme,
  IconButton,
  Searchbar,
  Menu,
  Chip,
  Divider,
} from "react-native-paper"
import { Plus, Edit, Trash2, Apple, ChevronDown, Search, Tag } from "lucide-react-native"
import { StatusBar } from "expo-status-bar"

interface NutritionSubcategory {
  id: string
  name: string
  parentCategory: string
  parentCategoryId: string
  itemCount: number
  createdAt: string
}

interface ParentCategory {
  id: string
  name: string
  color: string
}

const parentCategories: ParentCategory[] = [
  { id: "1", name: "Proteins", color: "#FF6B6B" },
  { id: "2", name: "Carbohydrates", color: "#4ECDC4" },
  { id: "3", name: "Healthy Fats", color: "#45B7D1" },
  { id: "4", name: "Vitamins & Minerals", color: "#F7DC6F" },
  { id: "5", name: "Hydration", color: "#85C1E9" },
]

export default function NutritionSubcategoryScreen() {
  const theme = useTheme()
  const [name, setName] = useState("")
  const [selectedParentCategory, setSelectedParentCategory] = useState<ParentCategory | null>(null)
  const [menuVisible, setMenuVisible] = useState(false)
  const [subcategories, setSubcategories] = useState<NutritionSubcategory[]>([
    {
      id: "1",
      name: "Lean Meats",
      parentCategory: "Proteins",
      parentCategoryId: "1",
      itemCount: 15,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Fish & Seafood",
      parentCategory: "Proteins",
      parentCategoryId: "1",
      itemCount: 12,
      createdAt: "2024-01-14",
    },
    {
      id: "3",
      name: "Plant Proteins",
      parentCategory: "Proteins",
      parentCategoryId: "1",
      itemCount: 18,
      createdAt: "2024-01-13",
    },
    {
      id: "4",
      name: "Whole Grains",
      parentCategory: "Carbohydrates",
      parentCategoryId: "2",
      itemCount: 14,
      createdAt: "2024-01-12",
    },
    {
      id: "5",
      name: "Fruits",
      parentCategory: "Carbohydrates",
      parentCategoryId: "2",
      itemCount: 24,
      createdAt: "2024-01-11",
    },
    {
      id: "6",
      name: "Vegetables",
      parentCategory: "Carbohydrates",
      parentCategoryId: "2",
      itemCount: 32,
      createdAt: "2024-01-10",
    },
    {
      id: "7",
      name: "Nuts & Seeds",
      parentCategory: "Healthy Fats",
      parentCategoryId: "3",
      itemCount: 16,
      createdAt: "2024-01-09",
    },
    {
      id: "8",
      name: "Oils & Avocados",
      parentCategory: "Healthy Fats",
      parentCategoryId: "3",
      itemCount: 6,
      createdAt: "2024-01-08",
    },
    {
      id: "9",
      name: "Water-Rich Foods",
      parentCategory: "Hydration",
      parentCategoryId: "5",
      itemCount: 8,
      createdAt: "2024-01-07",
    },
    {
      id: "10",
      name: "Electrolyte Drinks",
      parentCategory: "Hydration",
      parentCategoryId: "5",
      itemCount: 4,
      createdAt: "2024-01-06",
    },
  ])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [page, setPage] = useState<number>(0)
  const [itemsPerPage] = useState<number>(5)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredSubcategories, setFilteredSubcategories] = useState<NutritionSubcategory[]>(subcategories)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredSubcategories(subcategories)
    } else {
      const filtered = subcategories.filter(
        (subcategory) =>
          subcategory.name.toLowerCase().includes(query.toLowerCase()) ||
          subcategory.parentCategory.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredSubcategories(filtered)
    }
    setPage(0)
  }

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert("Validation Error", "Please enter subcategory name")
      return false
    }
    if (!selectedParentCategory) {
      Alert.alert("Validation Error", "Please select a parent category")
      return false
    }
    return true
  }

  const handleSave = () => {
    if (!validateForm()) return

    if (editingId) {
      // Update existing subcategory
      const updatedSubcategories = subcategories.map((subcat) =>
        subcat.id === editingId
          ? {
              ...subcat,
              name,
              parentCategory: selectedParentCategory!.name,
              parentCategoryId: selectedParentCategory!.id,
            }
          : subcat,
      )
      setSubcategories(updatedSubcategories)
      setFilteredSubcategories(
        updatedSubcategories.filter(
          (subcat) =>
            subcat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subcat.parentCategory.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
      setEditingId(null)
      Alert.alert("Success", "Subcategory updated successfully!")
    } else {
      // Add new subcategory
      const newSubcategory: NutritionSubcategory = {
        id: Date.now().toString(),
        name,
        parentCategory: selectedParentCategory!.name,
        parentCategoryId: selectedParentCategory!.id,
        itemCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      }
      const updatedSubcategories = [...subcategories, newSubcategory]
      setSubcategories(updatedSubcategories)
      setFilteredSubcategories(
        updatedSubcategories.filter(
          (subcat) =>
            subcat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subcat.parentCategory.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
      Alert.alert("Success", "Subcategory created successfully!")
    }

    // Reset form
    setName("")
    setSelectedParentCategory(null)
  }

  const handleEdit = (subcategory: NutritionSubcategory) => {
    setName(subcategory.name)
    const parentCat = parentCategories.find((cat) => cat.id === subcategory.parentCategoryId)
    setSelectedParentCategory(parentCat || null)
    setEditingId(subcategory.id)
  }

  const handleDelete = (subcategory: NutritionSubcategory) => {
    Alert.alert(
      "Delete Subcategory",
      `Are you sure you want to delete "${subcategory.name}"? This will also remove all ${subcategory.itemCount} nutrition items in this subcategory.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedSubcategories = subcategories.filter((subcat) => subcat.id !== subcategory.id)
            setSubcategories(updatedSubcategories)
            setFilteredSubcategories(
              updatedSubcategories.filter(
                (subcat) =>
                  subcat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  subcat.parentCategory.toLowerCase().includes(searchQuery.toLowerCase()),
              ),
            )
            if (editingId === subcategory.id) {
              setName("")
              setSelectedParentCategory(null)
              setEditingId(null)
            }
            Alert.alert("Success", "Subcategory deleted successfully!")
          },
        },
      ],
    )
  }

  const handleReset = () => {
    setName("")
    setSelectedParentCategory(null)
    setEditingId(null)
  }

  const getCategoryColor = (categoryId: string) => {
    const category = parentCategories.find((cat) => cat.id === categoryId)
    return category?.color || "#95A5A6"
  }

  const getSubcategoriesByParent = () => {
    const grouped = parentCategories.map((parent) => ({
      ...parent,
      subcategories: subcategories.filter((sub) => sub.parentCategoryId === parent.id),
    }))
    return grouped.filter((group) => group.subcategories.length > 0)
  }

  const from = page * itemsPerPage
  const to = Math.min((page + 1) * itemsPerPage, filteredSubcategories.length)

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
            <Title style={styles.title}>{editingId ? "Edit Subcategory" : "Create New Subcategory"}</Title>

            <View style={styles.form}>
              {/* Subcategory Name */}
              <View style={styles.inputContainer}>
                <Tag size={20} color={theme.colors.primary} style={styles.inputIcon} />
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
                <Apple size={20} color={theme.colors.primary} style={styles.inputIcon} />
                <View style={styles.dropdownContainer}>
                  <Text style={styles.inputLabel}>Parent Category</Text>
                  <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                      <TouchableOpacity
                        style={[styles.dropdown, { borderColor: theme.colors.outline }]}
                        onPress={() => setMenuVisible(true)}
                      >
                        <Text
                          style={[
                            styles.dropdownText,
                            !selectedParentCategory && { color: theme.colors.onSurfaceVariant },
                          ]}
                        >
                          {selectedParentCategory?.name || "Select parent category"}
                        </Text>
                        <ChevronDown size={20} color={theme.colors.onSurfaceVariant} />
                      </TouchableOpacity>
                    }
                  >
                    {parentCategories.map((category) => (
                      <Menu.Item
                        key={category.id}
                        onPress={() => {
                          setSelectedParentCategory(category)
                          setMenuVisible(false)
                        }}
                        title={category.name}
                      />
                    ))}
                  </Menu>
                  {selectedParentCategory && (
                    <Chip
                      mode="outlined"
                      style={[styles.selectedChip, { borderColor: selectedParentCategory.color }]}
                      textStyle={{ color: selectedParentCategory.color }}
                    >
                      {selectedParentCategory.name}
                    </Chip>
                  )}
                </View>
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
                  {editingId ? "Update Subcategory" : "Create Subcategory"}
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
                placeholder="Search subcategories..."
                onChangeText={handleSearch}
                value={searchQuery}
                style={styles.searchbar}
                icon={({ size, color }) => <Search size={size} color={color} />}
              />
            </View>
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>Total Subcategories: {subcategories.length}</Text>
              <Text style={styles.statsText}>
                Total Items: {subcategories.reduce((sum, subcat) => sum + subcat.itemCount, 0)}
              </Text>
            </View>
          </Card.Content>
        </Card> */}

        {/* Subcategories Table */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.tableTitle}>Nutrition Subcategories</Title>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{ flex: 1.2 }}>Name</DataTable.Title>
                <DataTable.Title style={{ flex: 1 }}>Parent Category</DataTable.Title>
                <DataTable.Title style={{ flex: 0.8 }}>Actions</DataTable.Title>
              </DataTable.Header>

              {filteredSubcategories.slice(from, to).map((subcategory) => (
                <DataTable.Row key={subcategory.id}>
                  <DataTable.Cell style={{ flex: 1.2 }}>
                    <Text style={styles.subcategoryName}>{subcategory.name}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1 }}>
                    <Chip
                      mode="outlined"
                      style={[styles.parentChip, { borderColor: getCategoryColor(subcategory.parentCategoryId) }]}
                      textStyle={{ color: getCategoryColor(subcategory.parentCategoryId) }}
                      compact
                    >
                      {subcategory.parentCategory}
                    </Chip>
                  </DataTable.Cell>
                 
                  <DataTable.Cell style={{ flex: 0.8 }}>
                    <View style={styles.actionButtons}>
                      <IconButton
                        icon={({ size, color }) => <Edit size={16} color={theme.colors.primary} />}
                        size={20}
                        onPress={() => handleEdit(subcategory)}
                        style={styles.actionButton}
                      />
                      <IconButton
                        icon={({ size, color }) => <Trash2 size={16} color={theme.colors.error} />}
                        size={20}
                        onPress={() => handleDelete(subcategory)}
                        style={styles.actionButton}
                      />
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}

              {filteredSubcategories.length === 0 && (
                <DataTable.Row>
                  <DataTable.Cell style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={styles.noDataText}>No subcategories found</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              )}

              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(filteredSubcategories.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${filteredSubcategories.length}`}
                showFastPaginationControls
              />
            </DataTable>
          </Card.Content>
        </Card>

        {/* Subcategories by Parent Category */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.tableTitle}>Subcategories by Parent Category</Title>
            {getSubcategoriesByParent().map((group) => (
              <View key={group.id} style={styles.groupContainer}>
                <View style={styles.groupHeader}>
                  <Chip
                    mode="flat"
                    style={[styles.groupChip, { backgroundColor: group.color + "20" }]}
                    textStyle={{ color: group.color, fontWeight: "600" }}
                  >
                    {group.name} ({group.subcategories.length})
                  </Chip>
                </View>
                <View style={styles.subcategoryList}>
                  {group.subcategories.map((subcategory) => (
                    <View key={subcategory.id} style={styles.subcategoryItem}>
                      <Text style={styles.subcategoryItemName}>{subcategory.name}</Text>
                      <Text style={styles.subcategoryItemCount}>{subcategory.itemCount} items</Text>
                    </View>
                  ))}
                </View>
                <Divider style={styles.groupDivider} />
              </View>
            ))}
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
})
