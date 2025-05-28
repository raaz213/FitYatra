"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native"
import { TextInput, Button, DataTable, Text, Card, Title, Divider, useTheme } from "react-native-paper"
import { Plus, Image as ImageIcon, Edit, Trash2 } from "lucide-react-native"
import * as ImagePicker from "expo-image-picker"

interface Category {
  id: string
  name: string
  imageUri: string
}

export default function ExerciseCategoryScreen() {
  const theme = useTheme()
  const [name, setName] = useState("")
  const [imageUri, setImageUri] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Cardio", imageUri: "https://via.placeholder.com/50" },
    { id: "2", name: "Strength", imageUri: "https://via.placeholder.com/50" },
    { id: "3", name: "Flexibility", imageUri: "https://via.placeholder.com/50" },
  ])
  const [editingId, setEditingId] = useState<string | null>(null)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri)
    }
  }

  const handleSave = () => {
    if (!name.trim()) {
      alert("Please enter a category name")
      return
    }

    if (editingId) {
      // Update existing category
      setCategories(
        categories.map((cat) => (cat.id === editingId ? { ...cat, name, imageUri: imageUri || cat.imageUri } : cat)),
      )
      setEditingId(null)
    } else {
      // Add new category
      const newCategory: Category = {
        id: Date.now().toString(),
        name,
        imageUri: imageUri || "https://via.placeholder.com/50",
      }
      setCategories([...categories, newCategory])
    }

    // Reset form
    setName("")
    setImageUri(null)
  }

  const handleEdit = (category: Category) => {
    setName(category.name)
    setImageUri(category.imageUri)
    setEditingId(category.id)
  }

  const handleDelete = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
    if (editingId === id) {
      setName("")
      setImageUri(null)
      setEditingId(null)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Exercise Categories</Title>

          <View style={styles.form}>
            <TextInput label="Category Name" value={name} onChangeText={setName} style={styles.input} mode="outlined" />

            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.previewImage} />
              ) : (
                <View style={[styles.placeholderImage, { backgroundColor: theme.colors.surfaceVariant }]}>
                  <ImageIcon size={24} color={theme.colors.onSurfaceVariant} />
                  <Text style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}>Select Image</Text>
                </View>
              )}
            </TouchableOpacity>

            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.button}
              icon={() => <Plus size={18} color="white" />}
            >
              {editingId ? "Update Category" : "Add Category"}
            </Button>
          </View>

          <Divider style={styles.divider} />

          <Title style={styles.tableTitle}>Categories</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ flex: 0.2 }}>Image</DataTable.Title>
              <DataTable.Title style={{ flex: 0.5 }}>Name</DataTable.Title>
              <DataTable.Title style={{ flex: 0.3 }}>Actions</DataTable.Title>
            </DataTable.Header>

            {categories.map((category) => (
              <DataTable.Row key={category.id}>
                <DataTable.Cell style={{ flex: 0.2 }}>
                  <Image source={{ uri: category.imageUri }} style={styles.tableImage} />
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 0.5 }}>{category.name}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 0.3 }}>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity onPress={() => handleEdit(category)} style={styles.iconButton}>
                      <Edit size={18} color={theme.colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(category.id)} style={styles.iconButton}>
                      <Trash2 size={18} color={theme.colors.error} />
                    </TouchableOpacity>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  imagePicker: {
    marginBottom: 16,
  },
  previewImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  placeholderImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
  },
  divider: {
    marginVertical: 16,
  },
  tableTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  tableImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    marginHorizontal: 4,
  },
})
