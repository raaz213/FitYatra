"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import {
  TextInput,
  Button,
  DataTable,
  Text,
  Card,
  Title,
  Divider,
  useTheme,
  Chip,
  IconButton,
} from "react-native-paper"
import { Plus, Edit, Trash2, Calendar, FileText, Tag } from "lucide-react-native"
import { StatusBar } from "expo-status-bar"

interface Subcategory {
  id: string
  name: string
  days: number
  description: string
  categoryName: string
}

export default function ExerciseSubcategoryScreen() {
  const theme = useTheme()
  const [name, setName] = useState("")
  const [days, setDays] = useState("")
  const [description, setDescription] = useState("")
  const [subcategories, setSubcategories] = useState<Subcategory[]>([
    {
      id: "1",
      name: "Chest & Triceps",
      days: 2,
      description: "Focus on upper body strength with chest press and tricep extensions",
      categoryName: "Strength Training",
    },
    {
      id: "2",
      name: "Back & Biceps",
      days: 2,
      description: "Pull exercises focusing on back muscles and bicep curls",
      categoryName: "Strength Training",
    },
    {
      id: "3",
      name: "Legs & Core",
      days: 2,
      description: "Lower body workout with squats, lunges and core exercises",
      categoryName: "Strength Training",
    },
    {
      id: "4",
      name: "HIIT Cardio",
      days: 1,
      description: "High intensity interval training for cardiovascular health",
      categoryName: "Cardio",
    },
  ])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [page, setPage] = useState<number>(0)
  const [itemsPerPage] = useState<number>(3)

  const handleSave = () => {
    if (!name.trim()) {
      alert("Please enter a subcategory name")
      return
    }

    if (!days || isNaN(Number(days)) || Number(days) <= 0) {
      alert("Please enter a valid number of days")
      return
    }

    if (!description.trim()) {
      alert("Please enter a description")
      return
    }

    if (editingId) {
      // Update existing subcategory
      setSubcategories(
        subcategories.map((subcat) =>
          subcat.id === editingId
            ? {
                ...subcat,
                name,
                days: Number(days),
                description,
              }
            : subcat,
        ),
      )
      setEditingId(null)
    } else {
      // Add new subcategory
      const newSubcategory: Subcategory = {
        id: Date.now().toString(),
        name,
        days: Number(days),
        description,
        categoryName: "New Category", // This would typically come from a dropdown or parent screen
      }
      setSubcategories([...subcategories, newSubcategory])
    }

    // Reset form
    setName("")
    setDays("")
    setDescription("")
  }

  const handleEdit = (subcategory: Subcategory) => {
    setName(subcategory.name)
    setDays(subcategory.days.toString())
    setDescription(subcategory.description)
    setEditingId(subcategory.id)
  }

  const handleDelete = (id: string) => {
    setSubcategories(subcategories.filter((subcat) => subcat.id !== id))
    if (editingId === id) {
      setName("")
      setDays("")
      setDescription("")
      setEditingId(null)
    }
  }

  const from = page * itemsPerPage
  const to = Math.min((page + 1) * itemsPerPage, subcategories.length)

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exercise Subcategories</Text>
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
           

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Tag size={20} color={theme.colors.primary} style={styles.inputIcon} />
                <TextInput
                  label="Subcategory Name"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                  mode="outlined"
                />
              </View>

              <View style={styles.inputContainer}>
                <Calendar size={20} color={theme.colors.primary} style={styles.inputIcon} />
                <TextInput
                  label="Number of Days"
                  value={days}
                  onChangeText={setDays}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                />
              </View>

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
                />
              </View>

              <Button
                mode="contained"
                onPress={handleSave}
                style={styles.button}
                icon={({ size, color }) => <Plus size={size} color={color} />}
              >
                {editingId ? "Update Subcategory" : "Add Subcategory"}
              </Button>
            </View>

            <Divider style={styles.divider} />

            <Title style={styles.tableTitle}>Subcategories</Title>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title numeric>Days</DataTable.Title>
                <DataTable.Title style={{ flex: 0.8 }}>Actions</DataTable.Title>
              </DataTable.Header>

              {subcategories.slice(from, to).map((subcategory) => (
                <DataTable.Row key={subcategory.id}>
                  <DataTable.Cell>{subcategory.name}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    <Chip mode="outlined" style={styles.daysChip}>
                      {subcategory.days}
                    </Chip>
                  </DataTable.Cell>
               
                  <DataTable.Cell style={{ flex: 0.8 }}>
                    <View style={styles.actionButtons}>
                      <IconButton
                        icon={({ size, color }) => <Edit size={16} color={theme.colors.primary} />}
                        size={20}
                        onPress={() => handleEdit(subcategory)}
                      />
                      <IconButton
                        icon={({ size, color }) => <Trash2 size={16} color={theme.colors.error} />}
                        size={20}
                        onPress={() => handleDelete(subcategory.id)}
                      />
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}

              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(subcategories.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${subcategories.length}`}
                showFastPaginationControls
              />
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
    backgroundColor: "#0047AB", // Dark blue header similar to the image
    paddingVertical: 8,
    paddingHorizontal: 20,
    elevation: 4,
  },
  headerTitle: {
    color: "white",
    fontSize: 14,
  
    letterSpacing: 1.5,
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 10,
    marginTop: 8,
  },
  input: {
    flex: 1,
  },
  textArea: {
    flex: 1,
    height: 80,
  },
  button: {
    marginTop: 16,
  },
  divider: {
    marginVertical: 16,
  },
  tableTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  daysChip: {
    height: 28,
    alignSelf: "center",
  },
})
