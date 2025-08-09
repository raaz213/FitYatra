
import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native"
import { TextInput, DataTable, Text, useTheme } from "react-native-paper"
import { Plus, Edit, Trash2, Calendar, FileText, Tag } from "lucide-react-native"
import { StatusBar } from "expo-status-bar"
import DropDownPicker from "react-native-dropdown-picker"
import { addExerciseSubcategory, getExerciseSubcategories } from "../../../services/both/exercise/Subcategory"
import { fetchAllCategories } from "../../../services/both/exercise/Category"
import type { Subcategory } from "../../../types/both/exercise/Subcategory"

export default function ExerciseSubcategoryScreen() {

  const [name, setName] = useState("")
  const [dayNumber, setDayNumber] = useState<number>(1)
  const [description, setDescription] = useState("")
  const [page, setPage] = useState<number>(0)
  const [itemsPerPage] = useState<number>(10)
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [items, setItems] = useState<{ label: string; value: string }[]>([])
  const [open, setOpen] = useState(false)
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])

  const handleAddSubcategory = async () => {
    setLoading(true)
    try {
      await addExerciseSubcategory({
        name: name.trim(),
        dayNumber,
        description: description.trim(),
        category: selectedCategory,
      })
      Alert.alert("Subcategory added successfully")
      setName("")
      setDayNumber(1)
      setDescription("")
      setSelectedCategory("")
      fetchSubcategories()
    } catch (error) {
      Alert.alert("Failed to add subcategory")
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetchAllCategories()
      const dropdownItems = response.map((category) => ({
        label: category.name,
        value: category._id,
      }))
      setItems(dropdownItems)
    } catch (error) {
      Alert.alert("Failed to load categories")
    }
  }

  const fetchSubcategories = async () => {
    try {
      const response = await getExerciseSubcategories()
      setSubcategories(response)
    } catch (error) {
      Alert.alert("Failed to load subcategories")
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchSubcategories()
  }, [])

  const isFormValid = name.trim() && selectedCategory && dayNumber >= 1

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Exercise Subcategories</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Add Subcategory Section */}
        <View style={styles.addSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Add New Subcategory</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <Tag size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Subcategory Name *</Text>
              </View>
              <TextInput
                value={name}
                onChangeText={setName}
                style={styles.textInput}
                mode="outlined"
                placeholder="Enter subcategory name"
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <Tag size={18} color="#6366F1" />
                </View>
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
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownList}
                  textStyle={styles.dropdownText}
                  placeholderStyle={styles.dropdownPlaceholder}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <Calendar size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Number of Days *</Text>
              </View>
              <TextInput
                value={dayNumber.toString()}
                onChangeText={(text) => setDayNumber(Number(text))}
                keyboardType="numeric"
                style={styles.textInput}
                mode="outlined"
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <FileText size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Description</Text>
              </View>
              <TextInput
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                style={[styles.textInput, styles.textArea]}
                mode="outlined"
                placeholder="Enter description (optional)"
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>

            <TouchableOpacity
              onPress={handleAddSubcategory}
              style={[styles.addButton, (!isFormValid || loading) && styles.addButtonDisabled]}
              disabled={!isFormValid || loading}
            >
              <Plus size={18} color="white" />
              <Text style={styles.addButtonText}>{loading ? "Adding..." : "Add Subcategory"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Subcategories List Section */}
        <View style={styles.listSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Subcategories</Text>
            <View style={styles.countChip}>
              <Text style={styles.countText}>{subcategories.length}</Text>
            </View>
          </View>

          {subcategories.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No subcategories yet</Text>
            </View>
          ) : (
            <View style={styles.tableContainer}>
              <DataTable>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title style={styles.tableHeaderCell}>
                    <Text style={styles.tableHeaderText}>Name</Text>
                  </DataTable.Title>
                  <DataTable.Title numeric style={styles.tableHeaderCell}>
                    <Text style={styles.tableHeaderText}>Days</Text>
                  </DataTable.Title>
                  <DataTable.Title style={styles.tableHeaderCell}>
                    <Text style={styles.tableHeaderText}>Actions</Text>
                  </DataTable.Title>
                </DataTable.Header>

                {subcategories.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((sub, index) => (
                  <DataTable.Row key={index} style={styles.tableRow}>
                    <DataTable.Cell style={styles.tableCell}>
                      <Text style={styles.subcategoryName}>{sub.name}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell numeric style={styles.tableCell}>
                      <Text style={styles.dayNumber}>{sub.dayNumber}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell}>
                      <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
                          <Edit size={18} color="#6366F1" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
                          <Trash2 size={18} color="#EF4444" />
                        </TouchableOpacity>
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
                      subcategories.length,
                    )} of ${subcategories.length}`}
                    style={styles.pagination}
                  />
                )}
              </DataTable>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
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
  dropdownContainer: {
    zIndex: 1000,
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
  addButtonDisabled: {
    backgroundColor: "#9CA3AF",
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
  dayNumber: {
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
  pagination: {
    backgroundColor: "white",
    paddingVertical: 8,
  },
})
