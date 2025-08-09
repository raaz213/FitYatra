"use client";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { TextInput, Text, useTheme } from "react-native-paper";
import {
  Plus,
  Apple,
  Hash,
  Zap,
  Star,
  FileText,
  ImageIcon,
  Tag,
  ChevronDown,
} from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { fetchNutritionCategories } from "../../../services/both/nutrition/Category";
import { fetchNutritionSubcategoriesByCategory } from "../../../services/both/nutrition/Subcategory";
import { addNutritionDiet } from "../../../services/both/nutrition/Diet";


export default function CreateNutrition() {
 
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
        return "#EF4444"; // Red-500
      case "carbs":
        return "#F59E0B"; // Amber-500
      case "fats":
        return "#10B981"; // Emerald-500
      default:
        return "#6B7280"; // Gray-500
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
    return {
      proteinPercentage: Number.parseFloat(proteinPercentage.toFixed(1)),
      proteinAmount: Number.parseFloat(proteinAmount.toFixed(1)),
    };
  };

  const calcCarbs = (): { carbsPercentage: number; carbsAmount: number } => {
    const { carbsPer1g, totalIntake } = dietFormData;
    if (totalIntake === 0) return { carbsPercentage: 0, carbsAmount: 0 };
    const carbsAmount = carbsPer1g * totalIntake;
    const carbsPercentage = (carbsAmount / totalIntake) * 100;
    return {
      carbsPercentage: Number.parseFloat(carbsPercentage.toFixed(1)),
      carbsAmount: Number.parseFloat(carbsAmount.toFixed(1)),
    };
  };

  const calcFats = (): { fatsPercentage: number; fatsAmount: number } => {
    const { fatsPer1g, totalIntake } = dietFormData;
    if (totalIntake === 0) return { fatsPercentage: 0, fatsAmount: 0 };
    const fatsAmount = fatsPer1g * totalIntake;
    const fatsPercentage = (fatsAmount / totalIntake) * 100;
    return {
      fatsPercentage: Number.parseFloat(fatsPercentage.toFixed(1)),
      fatsAmount: Number.parseFloat(fatsAmount.toFixed(1)),
    };
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
      if (selectedCategory) {
        const response = await fetchNutritionSubcategoriesByCategory(
          selectedCategory
        );
        const dropDownSubCategoryItems = response.map((subCategory) => ({
          label: subCategory.name,
          value: subCategory._id,
        }));
        setSubcategoryItems(dropDownSubCategoryItems);
      } else {
        setSubcategoryItems([]);
        setSelectedSubcategory(null);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubCategoriesByCategory();
  }, [selectedCategory]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", dietFormData.name);
    formData.append("intake", dietFormData.totalIntake.toString());
    formData.append(
      "macronutrient",
      JSON.stringify({
        protein: calcProtein().proteinAmount,
        carbohydrates: calcCarbs().carbsAmount,
        fats: calcFats().fatsAmount,
      })
    );
    formData.append(
      "macronutrientPercent",
      JSON.stringify({
        protein: calcProtein().proteinPercentage,
        carbohydrates: calcCarbs().carbsPercentage,
        fats: calcFats().fatsPercentage,
      })
    );
    formData.append(
      "features",
      JSON.stringify([dietFormData.feature1, dietFormData.feature2])
    );
    formData.append("totalCalories", totalCalories().toString());
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
      Alert.alert("Nutrition created successfully!");
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
      setCategoryItems([]); // Re-fetch categories to clear dropdown
      setSubcategoryItems([]); // Re-fetch subcategories to clear dropdown
      fetchCategories(); // Re-fetch categories after successful submission
    } catch (error: any) {
      Alert.alert(`Error: ${error.message}`);
    }
  };

  const { proteinPercentage, proteinAmount } = calcProtein();
  const { carbsPercentage, carbsAmount } = calcCarbs();
  const { fatsPercentage, fatsAmount } = calcFats();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Create Nutrition</Text>
   
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Basic Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <Tag size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Category</Text>
              </View>
              <View style={styles.dropdownContainer}>
                <DropDownPicker
                  open={openCategory}
                  value={selectedCategory}
                  items={categoryItems}
                  setOpen={setOpenCategory}
                  setValue={setSelectedCategory}
                  setItems={setCategoryItems}
                  placeholder="Select a category"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownList}
                  textStyle={styles.dropdownText}
                  placeholderStyle={styles.dropdownPlaceholder}
                  ArrowDownIconComponent={() => (
                    <ChevronDown size={20} color="#6B7280" />
                  )}
                  ArrowUpIconComponent={() => (
                    <ChevronDown size={20} color="#6B7280" />
                  )}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <Tag size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Subcategory</Text>
              </View>
              <View style={styles.dropdownContainer}>
                <DropDownPicker
                  open={openSubcategory}
                  value={selectedSubcategory}
                  items={subcategoryItems}
                  setOpen={setOpenSubcategory}
                  setValue={setSelectedSubcategory}
                  setItems={setSubcategoryItems}
                  placeholder="Select a subcategory"
                  style={[
                    styles.dropdown,
                    !selectedCategory && styles.dropdownDisabled,
                  ]}
                  dropDownContainerStyle={styles.dropdownList}
                  textStyle={styles.dropdownText}
                  placeholderStyle={styles.dropdownPlaceholder}
                  disabled={!selectedCategory}
                  ArrowDownIconComponent={() => (
                    <ChevronDown size={20} color="#6B7280" />
                  )}
                  ArrowUpIconComponent={() => (
                    <ChevronDown size={20} color="#6B7280" />
                  )}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <Apple size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Nutrition Name</Text>
              </View>
              <TextInput
                value={dietFormData.name}
                onChangeText={(text) => handleChange("name", text)}
                style={styles.textInput}
                mode="outlined"
                placeholder="e.g., Chicken Breast, Brown Rice"
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <ImageIcon size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Nutrition Image</Text>
              </View>
              <TouchableOpacity
                onPress={pickImage}
                style={styles.imageUploadContainer}
              >
                {dietFormData.image ? (
                  <Image
                    source={{ uri: dietFormData.image }}
                    style={styles.previewImage}
                  />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <View style={styles.imagePlaceholderIconContainer}>
                      <ImageIcon size={32} color="#6B7280" />
                    </View>
                    <Text style={styles.placeholderText}>
                      Tap to select image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <Hash size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Total Intake (grams)</Text>
              </View>
              <TextInput
                value={dietFormData.totalIntake.toString()}
                onChangeText={(text) => handleChange("totalIntake", text)}
                keyboardType="numeric"
                style={styles.textInput}
                mode="outlined"
                placeholder="e.g., 100, 150, 200"
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>
          </View>
        </View>

        {/* Macronutrient Composition */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Macronutrient Composition (per 1g)
            </Text>
            <Text style={styles.sectionSubtitle}>
              Enter the amount of each macronutrient in 1 gram of this food
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View
              style={[styles.inputContainer, { flex: 1, flexDirection: "row" }]}
            >
              <View
                style={[
                  styles.macroIconContainer,
                  { backgroundColor: getMacroColor("protein") },
                ]}
              >
                <Text style={styles.macroIconText}>P</Text>
              </View>
              <TextInput
                label="Protein (g per 1g)"
                value={dietFormData.proteinPer1g.toString()}
                onChangeText={(text) => handleChange("proteinPer1g", text)}
                keyboardType="numeric"
                style={styles.textInput}
                mode="outlined"
                placeholder="e.g., 0.25, 0.31"
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1, flexDirection: "row" }]}>
              <View
                style={[
                  styles.macroIconContainer,
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
                style={styles.textInput}
                mode="outlined"
                placeholder="e.g., 0.72, 0.45"
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1, flexDirection: "row" }]}>
              <View
                style={[
                  styles.macroIconContainer,
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
                style={styles.textInput}
                mode="outlined"
                placeholder="e.g., 0.03, 0.15"
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>
          </View>
        </View>

        {/* Nutritional Breakdown */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nutritional Breakdown</Text>
          </View>

          <View style={styles.macroGrid}>
            <View style={styles.macroCard}>
              <Text
                style={[styles.macroValue, { color: getMacroColor("protein") }]}
              >
                {proteinAmount}g
              </Text>
              <Text style={styles.macroLabel}>Protein</Text>
            </View>
            <View style={styles.macroCard}>
              <Text
                style={[styles.macroValue, { color: getMacroColor("carbs") }]}
              >
                {carbsAmount}g
              </Text>
              <Text style={styles.macroLabel}>Carbs</Text>
            </View>
            <View style={styles.macroCard}>
              <Text
                style={[styles.macroValue, { color: getMacroColor("fats") }]}
              >
                {fatsAmount}g
              </Text>
              <Text style={styles.macroLabel}>Fats</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.percentageContainer}>
            <View
              style={[
                styles.percentageChip,
                { backgroundColor: getMacroColor("protein") + "20" },
              ]}
            >
              <Text
                style={{ color: getMacroColor("protein"), fontWeight: "600" }}
              >
                Protein: {proteinPercentage}%
              </Text>
            </View>
            <View
              style={[
                styles.percentageChip,
                { backgroundColor: getMacroColor("carbs") + "20" },
              ]}
            >
              <Text
                style={{ color: getMacroColor("carbs"), fontWeight: "600" }}
              >
                Carbs: {carbsPercentage}%
              </Text>
            </View>
            <View
              style={[
                styles.percentageChip,
                { backgroundColor: getMacroColor("fats") + "20" },
              ]}
            >
              <Text style={{ color: getMacroColor("fats"), fontWeight: "600" }}>
                Fats: {fatsPercentage}%
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.caloriesSection}>
            <Zap size={24} color="#FF9800" />
            <View style={styles.caloriesContent}>
              <Text style={styles.caloriesValue}>{totalCalories()}kcal</Text>
              <Text style={styles.caloriesLabel}>Total Calories</Text>
            </View>
          </View>
        </View>

        {/* Features and Benefits */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Features & Benefits</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <Star size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Feature 1</Text>
              </View>
              <TextInput
                value={dietFormData.feature1}
                onChangeText={(text) => handleChange("feature1", text)}
                style={styles.textInput}
                mode="outlined"
                placeholder="e.g., High in protein"
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <Star size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Feature 2</Text>
              </View>
              <TextInput
                value={dietFormData.feature2}
                onChangeText={(text) => handleChange("feature2", text)}
                style={styles.textInput}
                mode="outlined"
                placeholder="e.g., Low in saturated fat"
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <FileText size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Key Benefits</Text>
              </View>
              <TextInput
                value={dietFormData.benefits}
                onChangeText={(text) => handleChange("benefits", text)}
                multiline
                numberOfLines={3}
                style={[styles.textInput, styles.textArea]}
                mode="outlined"
                placeholder="Describe the key health benefits of this nutrition item..."
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.submitSection}>
          <TouchableOpacity onPress={handleSave} style={styles.submitButton}>
            <Plus size={20} color="white" />
            <Text style={styles.submitButtonText}>Create Nutrition</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
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
  section: {
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
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
    flex: 1,
   
  },
  textArea: {
    minHeight: 100,
  },
  imageUploadContainer: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
  },
  previewImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  imagePlaceholder: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  imagePlaceholderIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B7280",
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
  dropdownDisabled: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
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
  macroIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginTop: 12,
  },
  macroIconText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  macroGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  macroCard: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  macroValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  percentageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  percentageChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  caloriesSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FFF7ED",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  caloriesContent: {
    marginLeft: 12,
    alignItems: "center",
  },
  caloriesValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F97316",
  },
  caloriesLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  submitSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  submitButton: {
    backgroundColor: "#06407a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
