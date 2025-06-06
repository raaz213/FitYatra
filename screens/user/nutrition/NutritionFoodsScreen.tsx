import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Image, Dimensions } from "react-native";
import {
  Appbar,
  Card,
  Text,
  Chip,
  Surface,
  useTheme,
} from "react-native-paper";
import { ChevronLeft } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { fetchNutritionSubcategoriesByCategory } from "../../../services/user/nutrition/Subcategory";
import { Subcategory } from "../../../types/user/nutrition/Subcategory";
import { getNutritionBySubcategory } from "../../../services/user/nutrition/Diet";
import { Diet } from "../../../types/user/nutrition/diet";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // 2 columns with padding


const NutritionFoodsScreen: React.FC = ({ navigation , route}: any) => {

  const theme = useTheme();
  const [subCategories, setSubCategories] = useState<Subcategory[]>([]);
  const [diets, setDiets] = useState<Diet[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const { categoryId } = route.params;
  console.log("Category ID:", categoryId);

  const fetchNutritionSubcategories = async () => {
    const response = await fetchNutritionSubcategoriesByCategory(categoryId);
    setSubCategories(response);
  };

  const fetchNutrition = async () => {
    const response = await getNutritionBySubcategory(selectedSubcategory);
    setDiets(response);
  }

  useEffect(() => {
    if (categoryId) {
      fetchNutritionSubcategories();
    }
  }, [categoryId]);

useEffect(() => {
  if (selectedSubcategory) {
    fetchNutrition();
  }
}
, [selectedSubcategory]);


  // const filteredFoods = nutritionFoods.filter((food) => {
  //   if (selectedGoal === "all") {
  //     return true;
  //   }
  //   return food.goals.includes(selectedGoal);
  // });

  const handleNutritionDetails = (foodId: string) => {
    navigation.navigate("NutritionDetails", { foodId });
  };

  const renderFoodCard = (food: Diet) => (
    <Card key={food._id} style={[styles.foodCard, { width: cardWidth }]}>
      <TouchableOpacity onPress={() => handleNutritionDetails(food._id)}>
        <Image source={{ uri: food.image }} style={styles.foodImage} />
        <Card.Content style={styles.cardContent}>
          <Text variant="titleMedium" style={styles.foodName}>
            {food.name}
          </Text>
          <View style={styles.nutritionInfo}>
            <Surface
              style={[
                styles.nutritionChip,
                { backgroundColor: theme.colors.primaryContainer },
              ]}
            >
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onPrimaryContainer }}
              >
                {food.macronutrient.protein}
              </Text>
            </Surface>
            <Surface
              style={[
                styles.nutritionChip,
                { backgroundColor: theme.colors.secondaryContainer },
              ]}
            >
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onSecondaryContainer }}
              >
                {food.totalCalories} kcal
              </Text>
            </Surface>
          </View>
          <View style={styles.benefitsContainer}>
              <Text variant="bodySmall" style={styles.benefitText}>
                • {food.benefits}
              </Text>
          </View>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );

  const getFilteredCount = () => {
    return diets.length;
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#FFF" }}>
        <Appbar.BackAction iconColor="black" onPress={() => {}} />
        <Appbar.Content
          title="Nutrition Foods"
          titleStyle={{ color: "black" }}
        />
      </Appbar.Header>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* <View style={styles.header}>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {selectedSubcategory === "all"
              ? `Showing all ${getFilteredCount()} nutrition foods`
              : selectedSubcategory === "muscle-gain"
              ? `${getFilteredCount()} foods for muscle gain`
              : `${getFilteredCount()} foods for weight loss`}
          </Text>
        </View> */}

        <View style={styles.chipContainer}>
          {subCategories.map((subcategory) => (
            <Chip
            selected={subcategory._id === selectedSubcategory}
            key={subcategory._id}
            onPress={() => setSelectedSubcategory(subcategory._id)}
            style={[
              styles.chip,
              selectedSubcategory && {
                backgroundColor: theme.colors.primary,
              },
            ]}
            textStyle={selectedSubcategory ? { color: "white" } : {}}
          >
           {subcategory.name}
          </Chip>
            ))}
        </View>

        <View style={styles.gridContainer}>
          {diets.map(renderFoodCard)}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    color: "#666",
    marginTop: 4,
  },
  chipContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  chip: {
    marginRight: 0,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    gap: 16,
  },
  foodCard: {
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
  },
  foodImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 12,
  },
  foodName: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  nutritionInfo: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 8,
  },
  nutritionChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  benefitsContainer: {
    gap: 2,
  },
  benefitText: {
    color: "#666",
    fontSize: 11,
  },
});

export default NutritionFoodsScreen;
