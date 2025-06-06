import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { Appbar, Card, Text, Chip, useTheme } from "react-native-paper";
import { fetchNutritionSubcategoriesByCategory } from "../../../services/user/nutrition/Subcategory";
import { Subcategory } from "../../../types/user/nutrition/Subcategory";
import { getNutritionBySubcategory } from "../../../services/user/nutrition/Diet";
import { Diet } from "../../../types/user/nutrition/diet";
import { window } from "../../../constants/sizes";
import { API_URL } from "../../../constants/apiUrl";
import { SafeAreaProvider } from "react-native-safe-area-context";

const CARD_WIDTH = (window.width - 48) / 2;
const COLORS = {
  background: '#FAFAFA',
  white: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  primary: '#2563EB',
  primaryLight: '#EFF6FF',
  shadow: 'rgba(0, 0, 0, 0.08)',
};

const NutritionFoodsScreen: React.FC = ({ navigation, route }: any) => {
  const theme = useTheme();
  const [subCategories, setSubCategories] = useState<Subcategory[]>([]);
  const [diets, setDiets] = useState<Diet[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const { categoryId } = route.params;

  const fetchNutritionSubcategories = async () => {
    const response = await fetchNutritionSubcategoriesByCategory(categoryId);
    setSubCategories(response);
  };

  const fetchNutrition = async () => {
    const response = await getNutritionBySubcategory(selectedSubcategory);
    setDiets(response);
  };

  useEffect(() => {
    if (subCategories.length > 0) {
      setSelectedSubcategory(subCategories[0]._id);
    }
  }, [subCategories]);

  useEffect(() => {
    if (categoryId) {
      fetchNutritionSubcategories();
    }
  }, [categoryId]);

  useEffect(() => {
    if (selectedSubcategory) {
      fetchNutrition();
    }
  }, [selectedSubcategory]);

  const handleNutritionDetails = (dietId: string) => {
    navigation.navigate("NutritionDetails", { dietId: dietId });
  };

  const renderFoodCard = (diet: Diet) => (
    <TouchableOpacity
      key={diet._id}
      style={styles.cardContainer}
      onPress={() => handleNutritionDetails(diet._id)}
      activeOpacity={0.7}
    >
      <Card style={styles.foodCard}>
        <Image
          source={{ uri: `${API_URL}/uploads/${diet.image}` }}
          style={styles.foodImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.foodName} numberOfLines={2}>
            {diet.name}
          </Text>
          <View style={styles.calorieContainer}>
            <Text style={styles.calorieText}>
              {diet.totalCalories} kcal
            </Text>
          </View>
          <Text style={styles.benefitText} numberOfLines={2}>
            {diet.benefits}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction 
          iconColor={COLORS.text} 
          onPress={() => navigation.goBack()} 
        />
        <Appbar.Content
          title="Nutrition Foods"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.chipContainer}>
          {subCategories.map((subcategory) => (
            <Chip
              key={subcategory._id}
              selected={subcategory._id === selectedSubcategory}
              onPress={() => setSelectedSubcategory(subcategory._id)}
              style={[
                styles.chip,
                subcategory._id === selectedSubcategory && styles.chipSelected
              ]}
              textStyle={[
                styles.chipText,
                subcategory._id === selectedSubcategory && styles.chipTextSelected
              ]}
            >
              {subcategory.name}
            </Chip>
          ))}
        </View>

        <View style={styles.gridContainer}>
          {diets.map(renderFoodCard)}
        </View>
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    elevation: 0,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  chipContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  chip: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: COLORS.white,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 4,
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: CARD_WIDTH,
  },
  foodCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    marginBottom: 4,
  },
  foodImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  cardContent: {
    padding: 16,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  calorieContainer: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  calorieText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  benefitText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});

export default NutritionFoodsScreen;