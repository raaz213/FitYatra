import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  SafeAreaView,
} from "react-native";
import {
  Card,
  Button,
  Provider as PaperProvider,
  DefaultTheme,
} from "react-native-paper";
import DietCard from "../../../components/user/nutritionCategory/DietCard";

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
};

export interface DietOption {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
}
const dietOptions: DietOption[] = [
  {
    id: 1,
    title: "Vegetarian",
    description: "Plant-based choices",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop",
    color: "#F3E5F5",
  },
  {
    id: 2,
    title: "Non-Vegetarian",
    description: "Meat and protein-rich meals",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&h=200&fit=crop",
    color: "#FFE5E5",
  },
];

const NutritionCategoryScreen: React.FC = ({ navigation }: any) => {
  const viewDietPress = (id: number) => {
    navigation.navigate("Diet", { dietId: id });
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Diet</Text>
            <Text style={styles.headerSubtitle}>
              Which diet best suits with your personal tastes and preferences?
            </Text>
          </View>

          <View style={styles.cardsContainer}>
            {dietOptions.map((diet) => (
              <DietCard
                key={diet.id}
                diet={diet}
                viewDietPress={viewDietPress}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  time: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  statusIcons: {
    flexDirection: "row",
    gap: 6,
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
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 16,
  },
});

export default NutritionCategoryScreen;
