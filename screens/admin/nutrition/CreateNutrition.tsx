"use client";

import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Card,
  Title,
  useTheme,
  Divider,
  Chip,
} from "react-native-paper";
import {
  Plus,
  Apple,
  Hash,
  Zap,
  Star,
  FileText,
  ImageIcon,
  Tag,
} from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { fetchNutritionCategories } from "../../../services/user/nutrition/Category";
import {
  fetchNutritionSubcategories,
  fetchNutritionSubcategoriesByCategory,
} from "../../../services/user/nutrition/Subcategory";
import { addNutritionDiet } from "../../../services/user/nutrition/Diet";
import { Toast } from "toastify-react-native";

export default function CreateNutrition() {
  const theme = useTheme();
  // const [image, setImage] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryItems, setCategoryItems] = useState<
    { label: string; value: string }[]
  >([]);
  const [openSubcategory, setOpenSubcategory] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [subcategoryItems, setSubcategoryItems] = useState<
    { label: string; value: string }[]
  >([]);
  const [dietFormData, setDietFormData] = useState<{
    name: string;
    totalIntake: number;
    proteinPer1g: number;
    carbsPer1g: number;
    fatsPer1g: number;
    feature1: string;
    feature2: string;
    benefits: string;
    category: string;
    subcategory: string;
    image: string | null;
  }>({
    name: "",
    totalIntake: 0,
    proteinPer1g: 0,
    carbsPer1g: 0,
    fatsPer1g: 0,
    feature1: "",
    feature2: "",
    benefits: "",
    category: "",
    subcategory: "",
    image: null,
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setDietFormData({ ...dietFormData, image: result.assets[0].uri });
    }
  };

  const getMacroColor = (macro: string) => {
    switch (macro) {
      case "protein":
        return "#FF6B6B";
      case "carbs":
        return "#4ECDC4";
      case "fats":
        return "#45B7D1";
      default:
        return "#95A5A6";
    }
  };
  const handleChange = (field: string, value: string) => {
    setDietFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const calcProtein = (): {
    proteinPercentage: number;
    proteinAmount: number;
  } => {
    const { proteinPer1g, totalIntake } = dietFormData;
    if (totalIntake === 0) return { proteinPercentage: 0, proteinAmount: 0 };
    const proteinAmount = proteinPer1g * totalIntake;
    const proteinPercentage = (proteinAmount / totalIntake) * 100;
    return { proteinPercentage, proteinAmount };
  };
  const calcCarbs = (): { carbsPercentage: number; carbsAmount: number } => {
    const { carbsPer1g, totalIntake } = dietFormData;
    if (totalIntake === 0) return { carbsPercentage: 0, carbsAmount: 0 };
    const carbsAmount = carbsPer1g * totalIntake;
    const carbsPercentage = (carbsAmount / totalIntake) * 100;
    return { carbsPercentage, carbsAmount };
  };
  const calcFats = (): { fatsPercentage: number; fatsAmount: number } => {
    const { fatsPer1g, totalIntake } = dietFormData;
    if (totalIntake === 0) return { fatsPercentage: 0, fatsAmount: 0 };
    const fatsAmount = fatsPer1g * totalIntake;
    const fatsPercentage = (fatsAmount / totalIntake) * 100;
    return { fatsPercentage, fatsAmount };
  };
  const totalCalories = (): number => {
    const { proteinAmount } = calcProtein();
    const { carbsAmount } = calcCarbs();
    const { fatsAmount } = calcFats();
    return Math.round(proteinAmount * 4 + carbsAmount * 4 + fatsAmount * 9);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetchNutritionCategories();
      const dropDownCategoryItems = response.map((category) => ({
        label: category.name,
        value: category._id,
      }));
      setCategoryItems(dropDownCategoryItems);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const fetchSubCategoriesByCategory = async () => {
    try {
      const response = await fetchNutritionSubcategoriesByCategory(
        selectedCategory!
      );
      const dropDownSubCategoryItems = response.map((subCategory) => ({
        label: subCategory.name,
        value: subCategory._id,
      }));
      setSubcategoryItems(dropDownSubCategoryItems);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchCategories();
    if (selectedCategory) {
      fetchSubCategoriesByCategory();
    }
  }, [selectedCategory]);

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("name", dietFormData.name);
    formData.append("intake", dietFormData.totalIntake.toString());
    formData.append(
      "macronutrient",
      JSON.stringify({
        protein: dietFormData.proteinPer1g * dietFormData.totalIntake,
        carbohydrates: dietFormData.carbsPer1g * dietFormData.totalIntake,
        fats: dietFormData.fatsPer1g * dietFormData.totalIntake,
      })
    );
    formData.append(
      "features",
      JSON.stringify([dietFormData.feature1, dietFormData.feature2])
    );
    formData.append("benefits", dietFormData.benefits);
    formData.append("subcategory", selectedSubcategory ?? "");
    if (dietFormData.image) {
      formData.append("image", {
        uri: dietFormData.image,
        name: dietFormData.image.split("/").pop() || "image.jpg",
        type: `image/${dietFormData.image.split(".").pop()}`,
      } as any);
    }
    try {
      await addNutritionDiet(formData);
      Toast.success("Nutrition created successfully!");
      setDietFormData({
        name: "",
        totalIntake: 0,
        proteinPer1g: 0,
        carbsPer1g: 0,
        fatsPer1g: 0,
        feature1: "",
        feature2: "",
        benefits: "",
        category: "",
        subcategory: "",
        image: null,
      });

      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setCategoryItems([]);
      setSubcategoryItems([]);
    } catch (error: any) {
      Toast.error(`Error: ${error.message}`);
    }
  };
  const { proteinPercentage, proteinAmount } = calcProtein();
  const { carbsPercentage, carbsAmount } = calcCarbs();
  const { fatsPercentage, fatsAmount } = calcFats();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FitYatra</Text>
        <Text style={styles.headerSubtitle}>Create Nutrition</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Basic Information */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Basic Information</Text>
            <View style={[styles.inputContainer, { zIndex: 1000 }]}>
              <Tag
                size={20}
                color={theme.colors.primary}
                style={styles.inputIcon}
              />
              <DropDownPicker
                open={openCategory}
                value={selectedCategory}
                items={categoryItems}
                setOpen={setOpenCategory}
                setValue={setSelectedCategory}
                setItems={setCategoryItems}
                placeholder="Select a category"
                style={{ width: "90%" }}
                dropDownContainerStyle={{ width: "90%" }}
                dropDownDirection="BOTTOM"
              />
            </View>
            <View style={[styles.inputContainer, { zIndex: 500 }]}>
              <Tag
                size={20}
                color={theme.colors.primary}
                style={styles.inputIcon}
              />
              <DropDownPicker
                open={openSubcategory}
                value={selectedSubcategory}
                items={subcategoryItems}
                setOpen={setOpenSubcategory}
                setValue={setSelectedSubcategory}
                setItems={setSubcategoryItems}
                placeholder="Select a subcategory"
                style={{ width: "90%" }}
                dropDownContainerStyle={{ width: "90%" }}
                dropDownDirection="BOTTOM"
              />
            </View>
            {/* Nutrition Name */}
            <View style={styles.inputContainer}>
              <Apple
                size={20}
                color={theme.colors.primary}
                style={styles.inputIcon}
              />
              <TextInput
                label="Nutrition Name"
                value={dietFormData.name}
                onChangeText={(text) => handleChange("name", text)}
                style={styles.input}
                mode="outlined"
                placeholder="e.g., Chicken Breast, Brown Rice"
              />
            </View>

            {/* Image Picker */}
            <View style={styles.inputContainer}>
              <ImageIcon
                size={20}
                color={theme.colors.primary}
                style={styles.inputIcon}
              />
              <View style={styles.imageSection}>
                <Text style={styles.inputLabel}>Nutrition Image</Text>
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.imagePicker}
                >
                  {dietFormData.image ? (
                    <Image
                      source={{ uri: dietFormData.image }}
                      style={styles.previewImage}
                    />
                  ) : (
                    <View
                      style={[
                        styles.placeholderImage,
                        { backgroundColor: theme.colors.surfaceVariant },
                      ]}
                    >
                      <ImageIcon
                        size={32}
                        color={theme.colors.onSurfaceVariant}
                      />
                      <Text
                        style={{
                          color: theme.colors.onSurfaceVariant,
                          marginTop: 8,
                        }}
                      >
                        Tap to select image
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Total Intake */}
            <View style={styles.inputContainer}>
              <Hash
                size={20}
                color={theme.colors.primary}
                style={styles.inputIcon}
              />
              <TextInput
                label="Total Intake (grams)"
                value={dietFormData.totalIntake.toString()}
                onChangeText={(text) => handleChange("totalIntake", text)}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="e.g., 100, 150, 200"
              />
            </View>
          </Card.Content>
        </Card>

        {/* Macronutrient Composition */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>
              Macronutrient Composition (per 1g)
            </Title>
            <Text style={styles.subtitle}>
              Enter the amount of each macronutrient in 1 gram of this food
            </Text>

            {/* Protein per 1g */}
            <View style={styles.inputContainer}>
              <View
                style={[
                  styles.macroIcon,
                  { backgroundColor: getMacroColor("protein") },
                ]}
              >
                <Text style={styles.macroIconText}>Protein</Text>
              </View>
              <TextInput
                label="Protein (g per 1g)"
                value={dietFormData.proteinPer1g.toString()}
                onChangeText={(text) => handleChange("proteinPer1g", text)}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="e.g., 0.25, 0.31"
              />
            </View>

            {/* Carbs per 1g */}
            <View style={styles.inputContainer}>
              <View
                style={[
                  styles.macroIcon,
                  { backgroundColor: getMacroColor("carbs") },
                ]}
              >
                <Text style={styles.macroIconText}>C</Text>
              </View>
              <TextInput
                label="Carbohydrates (g per 1g)"
                value={dietFormData.carbsPer1g.toString()}
                onChangeText={(text) => handleChange("carbsPer1g", text)}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="e.g., 0.72, 0.45"
              />
            </View>

            {/* Fats per 1g */}
            <View style={styles.inputContainer}>
              <View
                style={[
                  styles.macroIcon,
                  { backgroundColor: getMacroColor("fats") },
                ]}
              >
                <Text style={styles.macroIconText}>F</Text>
              </View>
              <TextInput
                label="Fats (g per 1g)"
                value={dietFormData.fatsPer1g.toString()}
                onChangeText={(text) => handleChange("fatsPer1g", text)}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="e.g., 0.03, 0.15"
              />
            </View>
          </Card.Content>
        </Card>

        {/* Calculated Values */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Nutritional Breakdown</Title>

            {/* Total Macronutrients */}
            <View style={styles.calculationSection}>
              <Text style={styles.sectionTitle}>Total Macronutrients</Text>
              <View style={styles.macroGrid}>
                <View style={styles.macroCard}>
                  <Text
                    style={[
                      styles.macroValue,
                      { color: getMacroColor("protein") },
                    ]}
                  >
                    {proteinAmount}g
                  </Text>
                  <Text style={styles.macroLabel}>Protein</Text>
                </View>
                <View style={styles.macroCard}>
                  <Text
                    style={[
                      styles.macroValue,
                      { color: getMacroColor("carbs") },
                    ]}
                  >
                    {carbsAmount}g
                  </Text>
                  <Text style={styles.macroLabel}>Carbs</Text>
                </View>
                <View style={styles.macroCard}>
                  <Text
                    style={[
                      styles.macroValue,
                      { color: getMacroColor("fats") },
                    ]}
                  >
                    {fatsAmount}g
                  </Text>
                  <Text style={styles.macroLabel}>Fats</Text>
                </View>
              </View>
            </View>

            <Divider style={styles.divider} />

            {/* Macronutrient Percentages */}
            <View style={styles.calculationSection}>
              <Text style={styles.sectionTitle}>Macronutrient Breakdown</Text>
              <View style={styles.percentageContainer}>
                <Chip
                  mode="flat"
                  style={[
                    styles.percentageChip,
                    { backgroundColor: getMacroColor("protein") + "20" },
                  ]}
                  textStyle={{
                    color: getMacroColor("protein"),
                    fontWeight: "600",
                  }}
                >
                  Protein: {proteinPercentage}%
                </Chip>
                <Chip
                  mode="flat"
                  style={[
                    styles.percentageChip,
                    { backgroundColor: getMacroColor("carbs") + "20" },
                  ]}
                  textStyle={{
                    color: getMacroColor("carbs"),
                    fontWeight: "600",
                  }}
                >
                  Carbs: {carbsPercentage}%
                </Chip>
                <Chip
                  mode="flat"
                  style={[
                    styles.percentageChip,
                    { backgroundColor: getMacroColor("fats") + "20" },
                  ]}
                  textStyle={{
                    color: getMacroColor("fats"),
                    fontWeight: "600",
                  }}
                >
                  Fats: {fatsPercentage}%
                </Chip>
              </View>
            </View>

            <Divider style={styles.divider} />

            {/* Total Calories */}
            <View style={styles.caloriesSection}>
              <Zap size={24} color="#FF9800" />
              <View style={styles.caloriesContent}>
                <Text style={styles.caloriesValue}>{totalCalories()}kal</Text>
                <Text style={styles.caloriesLabel}>Total Calories</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Features and Benefits */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Features & Benefits</Title>

            {/* Feature 1 */}
            <View style={styles.inputContainer}>
              <Star size={20} color="#FFD700" style={styles.inputIcon} />
              <TextInput
                label="Feature 1"
                value={dietFormData.feature1}
                onChangeText={(text) => handleChange("feature1", text)}
                style={styles.input}
                mode="outlined"
                placeholder="e.g., High in protein"
              />
            </View>

            {/* Feature 2 */}
            <View style={styles.inputContainer}>
              <Star size={20} color="#FFD700" style={styles.inputIcon} />
              <TextInput
                label="Feature 2"
                value={dietFormData.feature2}
                onChangeText={(text) => handleChange("feature2", text)}
                style={styles.input}
                mode="outlined"
                placeholder="e.g., Low in saturated fat"
              />
            </View>

            {/* Key Benefits */}
            <View style={styles.inputContainer}>
              <FileText
                size={20}
                color={theme.colors.primary}
                style={styles.inputIcon}
              />
              <TextInput
                label="Key Benefits"
                value={dietFormData.benefits}
                onChangeText={(text) => handleChange("benefits", text)}
                multiline
                numberOfLines={3}
                style={styles.textArea}
                mode="outlined"
                placeholder="Describe the key health benefits of this nutrition item..."
              />
            </View>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleSave}
                style={[styles.button, styles.saveButton]}
                icon={({ size, color }) => <Plus size={size} color={color} />}
              >
                Create Nutrition
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
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
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    fontStyle: "italic",
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
  macroIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 12,
  },
  macroIconText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  input: {
    flex: 1,
  },
  textArea: {
    flex: 1,
    height: 80,
  },
  warningText: {
    color: "#D32F2F",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "500",
  },
  calculationSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  macroGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  macroCard: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  macroValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  divider: {
    marginVertical: 16,
  },
  percentageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  percentageChip: {
    marginBottom: 8,
  },
  caloriesSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FFF3E0",
    borderRadius: 8,
  },
  caloriesContent: {
    marginLeft: 12,
    alignItems: "center",
  },
  caloriesValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF9800",
  },
  caloriesLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
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
  recentItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  recentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  recentDetails: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
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
    height: 120,
    borderRadius: 8,
    resizeMode: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#ccc",
  },
});
