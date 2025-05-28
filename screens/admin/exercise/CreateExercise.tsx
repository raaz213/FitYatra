"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from "react-native"
import { TextInput, Button, Text, Card, Title, useTheme, Chip, Menu, Divider } from "react-native-paper"
import {
  Plus,
  Image as ImageIcon,
  Hash,
  Clock,
  FileText,
  Target,
  Youtube,
  User,
  ChevronDown,
} from "lucide-react-native"
import { StatusBar } from "expo-status-bar"
import * as ImagePicker from "expo-image-picker"

interface Exercise {
  id: string
  name: string
  imageUri: string
  sets: number
  duration: string
  instruction: string
  focusArea: string
  youtubeUrl: string
}

const focusAreas = ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core", "Cardio", "Full Body", "Glutes", "Calves"]

export default function CreateExercise() {
  const theme = useTheme()
  const [name, setName] = useState("")
  const [imageUri, setImageUri] = useState<string | null>(null)
  const [sets, setSets] = useState("")
  const [duration, setDuration] = useState("")
  const [instruction, setInstruction] = useState("")
  const [focusArea, setFocusArea] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [menuVisible, setMenuVisible] = useState(false)
  const [exercises, setExercises] = useState<Exercise[]>([])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri)
    }
  }

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert("Validation Error", "Please enter exercise name")
      return false
    }
    if (!sets || isNaN(Number(sets)) || Number(sets) <= 0) {
      Alert.alert("Validation Error", "Please enter a valid number of sets")
      return false
    }
    if (!duration.trim()) {
      Alert.alert("Validation Error", "Please enter duration")
      return false
    }
    if (!instruction.trim()) {
      Alert.alert("Validation Error", "Please enter instructions")
      return false
    }
    if (!focusArea) {
      Alert.alert("Validation Error", "Please select a focus area")
      return false
    }
    if (youtubeUrl && !isValidYouTubeUrl(youtubeUrl)) {
      Alert.alert("Validation Error", "Please enter a valid YouTube URL")
      return false
    }
    return true
  }

  const isValidYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
    return youtubeRegex.test(url)
  }

  const handleSave = () => {
    if (!validateForm()) return

    const newExercise: Exercise = {
      id: Date.now().toString(),
      name,
      imageUri: imageUri || "https://via.placeholder.com/300x200",
      sets: Number(sets),
      duration,
      instruction,
      focusArea,
      youtubeUrl,
    }

    setExercises([...exercises, newExercise])

    // Reset form
    setName("")
    setImageUri(null)
    setSets("")
    setDuration("")
    setInstruction("")
    setFocusArea("")
    setYoutubeUrl("")

    Alert.alert("Success", "Exercise created successfully!", [
      {
        text: "OK",
        onPress: () => console.log("Exercise saved:", newExercise),
      },
    ])
  }

  const handleReset = () => {
    setName("")
    setImageUri(null)
    setSets("")
    setDuration("")
    setInstruction("")
    setFocusArea("")
    setYoutubeUrl("")
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FitYatra</Text>
        <Text style={styles.headerSubtitle}>Create Exercise</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Exercise Details</Title>

            {/* Exercise Name */}
            <View style={styles.inputContainer}>
              <User size={20} color={theme.colors.primary} style={styles.inputIcon} />
              <TextInput
                label="Exercise Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
                mode="outlined"
                placeholder="e.g., Push-ups, Squats"
              />
            </View>

            {/* Image Picker */}
            <View style={styles.inputContainer}>
              <ImageIcon size={20} color={theme.colors.primary} style={styles.inputIcon} />
              <View style={styles.imageSection}>
                <Text style={styles.inputLabel}>Exercise Image</Text>
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

            {/* Sets */}
            <View style={styles.inputContainer}>
              <Hash size={20} color={theme.colors.primary} style={styles.inputIcon} />
              <TextInput
                label="Number of Sets"
                value={sets}
                onChangeText={setSets}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="e.g., 3, 4, 5"
              />
            </View>

            {/* Duration */}
            <View style={styles.inputContainer}>
              <Clock size={20} color={theme.colors.primary} style={styles.inputIcon} />
              <TextInput
                label="Duration"
                value={duration}
                onChangeText={setDuration}
                style={styles.input}
                mode="outlined"
                placeholder="e.g., 30 seconds, 2 minutes"
              />
            </View>

            {/* Focus Area */}
            <View style={styles.inputContainer}>
              <Target size={20} color={theme.colors.primary} style={styles.inputIcon} />
              <View style={styles.dropdownContainer}>
                <Text style={styles.inputLabel}>Focus Area</Text>
                <Menu
                  visible={menuVisible}
                  onDismiss={() => setMenuVisible(false)}
                  anchor={
                    <TouchableOpacity
                      style={[styles.dropdown, { borderColor: theme.colors.outline }]}
                      onPress={() => setMenuVisible(true)}
                    >
                      <Text style={[styles.dropdownText, !focusArea && { color: theme.colors.onSurfaceVariant }]}>
                        {focusArea || "Select focus area"}
                      </Text>
                      <ChevronDown size={20} color={theme.colors.onSurfaceVariant} />
                    </TouchableOpacity>
                  }
                >
                  {focusAreas.map((area) => (
                    <Menu.Item
                      key={area}
                      onPress={() => {
                        setFocusArea(area)
                        setMenuVisible(false)
                      }}
                      title={area}
                    />
                  ))}
                </Menu>
                {focusArea && (
                  <Chip mode="outlined" style={styles.selectedChip}>
                    {focusArea}
                  </Chip>
                )}
              </View>
            </View>

            {/* Instructions */}
            <View style={styles.inputContainer}>
              <FileText size={20} color={theme.colors.primary} style={styles.inputIcon} />
              <TextInput
                label="Instructions"
                value={instruction}
                onChangeText={setInstruction}
                multiline
                numberOfLines={4}
                style={styles.textArea}
                mode="outlined"
                placeholder="Detailed step-by-step instructions for performing the exercise..."
              />
            </View>

            {/* YouTube URL */}
            <View style={styles.inputContainer}>
              <Youtube size={20} color="#FF0000" style={styles.inputIcon} />
              <TextInput
                label="YouTube URL (Optional)"
                value={youtubeUrl}
                onChangeText={setYoutubeUrl}
                style={styles.input}
                mode="outlined"
                placeholder="https://youtube.com/watch?v=..."
                keyboardType="url"
              />
            </View>

            <Divider style={styles.divider} />

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={handleReset}
                style={[styles.button, styles.resetButton]}
                labelStyle={{ color: theme.colors.error }}
              >
                Reset Form
              </Button>
              <Button
                mode="contained"
                onPress={handleSave}
                style={[styles.button, styles.saveButton]}
                icon={({ size, color }) => <Plus size={size} color={color} />}
              >
                Create Exercise
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Preview Section */}
        {exercises.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Recently Created</Title>
              {exercises.slice(-2).map((exercise) => (
                <View key={exercise.id} style={styles.exercisePreview}>
                  <Image source={{ uri: exercise.imageUri }} style={styles.previewThumb} />
                  <View style={styles.previewContent}>
                    <Text style={styles.previewName}>{exercise.name}</Text>
                    <Text style={styles.previewDetails}>
                      {exercise.sets} sets • {exercise.duration} • {exercise.focusArea}
                    </Text>
                  </View>
                </View>
              ))}
            </Card.Content>
          </Card>
        )}
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
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
    height: 100,
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
    height: 150,
    borderRadius: 8,
    resizeMode: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#ccc",
  },
  dropdownContainer: {
    flex: 1,
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
  divider: {
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
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
  exercisePreview: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  previewThumb: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  previewContent: {
    flex: 1,
  },
  previewName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  previewDetails: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
})
