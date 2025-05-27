import type React from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native"
import { Provider as PaperProvider, DefaultTheme, FAB } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"
import DietCard from "../../../components/user/nutritionCategory/DietCard"

// Custom theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4CAF50",
    accent: "#FF9800",
    background: "#F8F9FA",
    surface: "#FFFFFF",
    text: "#2E2E2E",
  },
}

export interface DietOption {
  id: number
  title: string
  description: string
  image: string
  color: string
}

const dietOptions: DietOption[] = [
  {
    id: 1,
    title: "Vegetarian",
    description: "Plant-based choices",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop",
    color: "#F3E5F5",
  },
  {
    id: 2,
    title: "Non-Vegetarian",
    description: "Meat and protein-rich meals",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&h=200&fit=crop",
    color: "#FFE5E5",
  },
]

interface NutritionCategoryScreenProps {
  navigation: any
}

const NutritionCategoryScreen: React.FC<NutritionCategoryScreenProps> = ({ navigation }) => {
  const viewDietPress = (id: number) => {
    navigation.navigate("NutritionFoods", { dietId: id })
  }

  const openCamera = () => {
    navigation.navigate("Camera")
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Diet</Text>
            <Text style={styles.headerSubtitle}>Which diet best suits with your personal tastes and preferences?</Text>

            {/* Camera Feature Card */}
            <TouchableOpacity style={styles.cameraCard} onPress={openCamera}>
              <View style={styles.cameraCardContent}>
                <View style={styles.cameraIconContainer}>
                  <Ionicons name="camera" size={24} color="#4CAF50" />
                </View>
                <View style={styles.cameraTextContainer}>
                  <Text style={styles.cameraTitle}>Scan Food</Text>
                  <Text style={styles.cameraSubtitle}>Take a photo to get instant nutrition analysis</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.cardsContainer}>
            {dietOptions.map((diet) => (
              <DietCard key={diet.id} diet={diet} viewDietPress={viewDietPress} />
            ))}
          </View>
        </ScrollView>

        {/* Floating Action Button for Camera */}
        <FAB style={styles.fab} icon="camera" onPress={openCamera} color="#fff" />
      </SafeAreaView>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2E2E2E",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 22,
    marginBottom: 20,
  },
  cameraCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cameraCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cameraIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F5E8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cameraTextContainer: {
    flex: 1,
  },
  cameraTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2E2E2E",
    marginBottom: 4,
  },
  cameraSubtitle: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 18,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#4CAF50",
  },
})

export default NutritionCategoryScreen
