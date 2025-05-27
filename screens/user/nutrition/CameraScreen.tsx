"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from "react-native"
import { CameraView, type CameraType, useCameraPermissions } from "expo-camera"
import * as ImagePicker from "expo-image-picker"
import { Ionicons } from "@expo/vector-icons"
import { Button, Card, Provider as PaperProvider } from "react-native-paper"
import NutritionSummary from "../../../components/user/nutritionSummary/NutritionSummary"
const { width, height } = Dimensions.get("window")

interface NutritionData {
  calories: number
  protein: number
  fat: number
  carbs: number
  fiber: number
  sugar: number
  sodium: number
  foodName: string
  confidence: number
}

interface CameraScreenProps {
  navigation: any
}

const CameraScreen: React.FC<CameraScreenProps> = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions()
  const [facing, setFacing] = useState<CameraType>("back")
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null)
  const cameraRef = useRef<CameraView>(null)

  useEffect(() => {
    requestImagePickerPermission()
  }, [])

  const requestImagePickerPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Permission needed", "Sorry, we need camera roll permissions to make this work!")
    }
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        })
        if (photo?.uri) {
          setCapturedImage(photo.uri)
          analyzeImage(photo.uri)
        }
      } catch (error) {
        console.error("Error taking picture:", error)
        Alert.alert("Error", "Failed to take picture")
      }
    }
  }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      })

      if (!result.canceled && result.assets[0]) {
        setCapturedImage(result.assets[0].uri)
        analyzeImage(result.assets[0].uri)
      }
    } catch (error) {
      console.error("Error picking image:", error)
      Alert.alert("Error", "Failed to pick image")
    }
  }

  const analyzeImage = async (imageUri: string) => {
    setIsAnalyzing(true)

    try {
      // Simulate API call to nutrition analysis service
      // In a real app, you would call services like:
      // - Clarifai Food Model
      // - Google Vision API + Nutritionix
      // - Edamam Food Database API
      // - Custom ML model

      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API delay

      // Mock nutrition data - replace with actual API response
      const foodItems = [
        { name: "Apple", calories: 95, protein: 0.5, fat: 0.3, carbs: 25, fiber: 4, sugar: 19, sodium: 2 },
        { name: "Banana", calories: 105, protein: 1.3, fat: 0.4, carbs: 27, fiber: 3, sugar: 14, sodium: 1 },
        { name: "Chicken Breast", calories: 231, protein: 43.5, fat: 5, carbs: 0, fiber: 0, sugar: 0, sodium: 104 },
        { name: "Rice Bowl", calories: 206, protein: 4.3, fat: 0.4, carbs: 45, fiber: 0.6, sugar: 0.1, sodium: 2 },
        { name: "Mixed Salad", calories: 33, protein: 2.9, fat: 0.3, carbs: 6.3, fiber: 2.6, sugar: 3.1, sodium: 65 },
      ]

      const randomFood = foodItems[Math.floor(Math.random() * foodItems.length)]

      const mockNutritionData: NutritionData = {
        ...randomFood,
        foodName: randomFood.name,
        confidence: 0.85 + Math.random() * 0.15,
      }

      setNutritionData(mockNutritionData)
    } catch (error) {
      console.error("Error analyzing image:", error)
      Alert.alert("Error", "Failed to analyze image")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const retakePhoto = () => {
    setCapturedImage(null)
    setNutritionData(null)
  }

  const saveNutritionData = () => {
    if (nutritionData) {
      // Save to your app's database/storage
      Alert.alert("Success", "Nutrition data saved!", [{ text: "OK", onPress: () => navigation.goBack() }])
    }
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"))
  }

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading camera...</Text>
      </View>
    )
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera-outline" size={64} color="#ccc" />
        <Text style={styles.permissionText}>We need your permission to show the camera</Text>
        <Button mode="contained" onPress={requestPermission} style={styles.permissionButton}>
          Grant Permission
        </Button>
      </View>
    )
  }

  if (capturedImage) {
    return (
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Nutrition Analysis</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
          </View>

          {isAnalyzing ? (
            <View style={styles.analyzingContainer}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.analyzingText}>Analyzing nutrition content...</Text>
              <Text style={styles.analyzingSubtext}>This may take a few seconds</Text>
            </View>
          ) : nutritionData ? (
            <View style={styles.nutritionContainer}>
              <Card style={styles.nutritionCard}>
                <Card.Content>
                  <View style={styles.foodHeader}>
                    <Text style={styles.foodName}>{nutritionData.foodName}</Text>
                    <View style={styles.confidenceContainer}>
                      <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                      <Text style={styles.confidence}>{(nutritionData.confidence * 100).toFixed(1)}% confident</Text>
                    </View>
                  </View>

                  <NutritionSummary
                    calories={nutritionData.calories}
                    protein={nutritionData.protein}
                    fat={nutritionData.fat}
                    carbs={nutritionData.carbs}
                    fiber={nutritionData.fiber}
                    sugar={nutritionData.sugar}
                    sodium={nutritionData.sodium}
                  />
                </Card.Content>
              </Card>

              <View style={styles.buttonContainer}>
                <Button mode="outlined" onPress={retakePhoto} style={styles.button} icon="camera-retake">
                  Retake Photo
                </Button>
                <Button mode="contained" onPress={saveNutritionData} style={styles.button} icon="content-save">
                  Save Data
                </Button>
              </View>
            </View>
          ) : null}
        </SafeAreaView>
      </PaperProvider>
    )
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.cameraHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.cameraTitle}>Scan Food</Text>
          <TouchableOpacity onPress={toggleCameraFacing} style={styles.flipButton}>
            <Ionicons name="camera-reverse" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.cameraOverlay}>
          <View style={styles.scanArea}>
            <View style={styles.scanCorners}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
            <Text style={styles.scanText}>Position food within the frame</Text>
          </View>
        </View>

        <View style={styles.cameraControls}>
          <TouchableOpacity onPress={pickImage} style={styles.galleryButton}>
            <Ionicons name="images" size={24} color="#fff" />
            <Text style={styles.galleryText}>Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>

          <View style={styles.placeholder} />
        </View>
      </CameraView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingText: {
    color: "#666",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 40,
  },
  permissionText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
    color: "#666",
    lineHeight: 24,
  },
  permissionButton: {
    marginTop: 10,
  },
  camera: {
    flex: 1,
  },
  cameraHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  cameraTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  flipButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    width: 280,
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  scanCorners: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#4CAF50",
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 8,
    borderRadius: 8,
  },
  cameraControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 40,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  galleryButton: {
    alignItems: "center",
    padding: 10,
  },
  galleryText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.3)",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50",
  },
  placeholder: {
    width: 50,
    height: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 20,
    color: "#2E2E2E",
  },
  imageContainer: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  capturedImage: {
    width: width - 40,
    height: 300,
    borderRadius: 15,
    resizeMode: "cover",
  },
  analyzingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 40,
  },
  analyzingText: {
    marginTop: 20,
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
  analyzingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  nutritionContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  nutritionCard: {
    margin: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  foodHeader: {
    marginBottom: 20,
  },
  foodName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2E2E2E",
    marginBottom: 8,
  },
  confidenceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  confidence: {
    fontSize: 14,
    color: "#4CAF50",
    marginLeft: 4,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    flex: 1,
  },
})

export default CameraScreen
