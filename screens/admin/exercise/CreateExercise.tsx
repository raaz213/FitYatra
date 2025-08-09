"use client";

import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput, Text, useTheme } from "react-native-paper";
import {
  Plus,
  Image as ImageIcon,
  Hash,
  Clock,
  FileText,
  Youtube,
  User,
  ChevronDown,
} from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { fetchAllCategories } from "../../../services/both/exercise/Category";
import type { Category } from "../../../types/both/exercise/Category";
import { getExerciseSubcategoriesByCategory } from "../../../services/both/exercise/Subcategory";
import type { Subcategory } from "../../../types/both/exercise/Subcategory";
import { addExercise } from "../../../services/both/exercise/Exercise";
import { Toast } from "toastify-react-native";

const focusAreas = [
  { label: "Legs", value: "legs" },
  { label: "Arms", value: "arms" },
  { label: "Core", value: "core" },
  { label: "Back", value: "back" },
  { label: "Chest", value: "chest" },
  { label: "Shoulders", value: "shoulders" },
  { label: "Glutes", value: "glutes" },
  { label: "Full Body", value: "full_body" },
  { label: "Cardio", value: "cardio" },
  { label: "Upper Body", value: "upper_body" },
  { label: "Lower Body", value: "lower_body" },
  { label: "Abs", value: "abs" },
  { label: "Biceps", value: "biceps" },
  { label: "Triceps", value: "triceps" },
  { label: "Quads", value: "quads" },
  { label: "Hamstrings", value: "hamstrings" },
  { label: "Calves", value: "calves" },
  { label: "Mobility", value: "mobility" },
  { label: "Balance", value: "balance" },
  { label: "Flexibility", value: "flexibility" },
  { label: "Endurance", value: "endurance" },
  { label: "Strength", value: "strength" },
];

export default function CreateExercise() {
  const [data, setData] = useState<{
    name: string;
    focusArea: string;
    instructions: string;
    videoUrl: string;
    sets: number;
    duration: number;
    metValue: number;
    image: string;
  }>({
    name: "",
    focusArea: "",
    instructions: "",
    videoUrl: "",
    sets: 0,
    duration: 0,
    metValue: 0,
    image: "",
  });

  const [openCategories, setOpenCategories] = useState(false);
  const [openSubCategories, setOpenSubCategories] = useState(false);
  const [openFocusArea, setOpenFocusArea] = useState(false);
  const [selectedFocusArea, setSelectedFocusArea] = useState<string[]>([]);
  const [focusArea, setFocusArea] =
    useState<{ label: string; value: string }[]>(focusAreas);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [subCategories, setSubCategories] = useState<
    { label: string; value: string }[]
  >([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setData((prev) => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  const handleChange = (fieldName: any, value: any) => {
    setData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const getCategories = async () => {
    const response = await fetchAllCategories();
    const dropdownItems = response.map((category: Category) => {
      return {
        label: category.name,
        value: category._id,
      };
    });
    setCategories(dropdownItems);
  };

  const getSubCategories = async () => {
    const response = await getExerciseSubcategoriesByCategory(selectedCategory);
    const dropdownItems = response.map((subcategory: Subcategory) => {
      return {
        label: subcategory.name,
        value: subcategory._id,
      };
    });
    setSubCategories(dropdownItems);
  };

  useEffect(() => {
    getCategories();
    if (selectedCategory) {
      getSubCategories();
    }
  }, [selectedCategory]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("sets", data.sets.toString());
    formData.append("duration", data.duration.toString());
    formData.append("metValue", data.metValue.toString());
    formData.append("subcategory", selectedSubCategory);
    formData.append("videoUrl", data.videoUrl);
    formData.append("instructions", data.instructions);
    formData.append("focusArea", JSON.stringify(selectedFocusArea));

    if (data.image) {
      const fileName = data.image.split("/").pop() || "photo.jpg";
      const fileType = fileName.split(".").pop();
      formData.append("image", {
        uri: data.image,
        name: fileName,
        type: `image/${fileType}`,
      } as any);
    }

    try {
      await addExercise(formData);
      Alert.alert("exercise added successfully");
    } catch (error) {
      Alert.alert("Error adding exercise");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerSubtitle}>Create Exercise</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Exercise Image Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exercise Image</Text>
          </View>

          <TouchableOpacity
            onPress={pickImage}
            style={styles.imageUploadContainer}
          >
            {data.image ? (
              <Image source={{ uri: data.image }} style={styles.previewImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <View style={styles.imageIconContainer}>
                  <ImageIcon size={32} color="#6B7280" />
                </View>
                <Text style={styles.placeholderText}>Tap to select image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Basic Information Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <User size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Exercise Name</Text>
              </View>
              <TextInput
                value={data.name}
                onChangeText={(text) => handleChange("name", text)}
                style={styles.textInput}
                mode="outlined"
                placeholder="e.g., Push-ups, Squats"
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>

            <View
              style={{
                zIndex: openCategories ? 3000 : openSubCategories ? 1000 : 1000,
              }}
            >
              <View style={styles.inputContainer}>
                <View style={styles.inputHeader}>
                  <View style={styles.inputIconContainer}>
                    <Hash size={18} color="#6366F1" />
                  </View>
                  <Text style={styles.inputLabel}>Category</Text>
                </View>
                <View style={styles.dropdownContainer}>
                  <DropDownPicker
                    open={openCategories}
                    value={selectedCategory}
                    items={categories}
                    setOpen={setOpenCategories}
                    setValue={setSelectedCategory}
                    setItems={setCategories}
                    placeholder="Select Category"
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownList}
                    textStyle={styles.dropdownText}
                    placeholderStyle={styles.dropdownPlaceholder}
                    dropDownDirection="TOP"
                    listMode="SCROLLVIEW"
                    ArrowDownIconComponent={() => (
                      <ChevronDown size={20} color="#6B7280" />
                    )}
                    ArrowUpIconComponent={() => (
                      <ChevronDown size={20} color="#6B7280" />
                    )}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                zIndex: openSubCategories ? 3000 : openCategories ? 1000 : 1000,
                marginTop: 10,
              }}
            >
              <View style={styles.inputContainer}>
                <View style={styles.inputHeader}>
                  <View style={styles.inputIconContainer}>
                    <Hash size={18} color="#6366F1" />
                  </View>
                  <Text style={styles.inputLabel}>Subcategory</Text>
                </View>
                <View style={styles.dropdownContainer}>
                  <DropDownPicker
                    open={openSubCategories}
                    value={selectedSubCategory}
                    items={subCategories}
                    setOpen={setOpenSubCategories}
                    setValue={setSelectedSubCategory}
                    setItems={setSubCategories}
                    placeholder="Select Subcategory"
                    style={[
                      styles.dropdown,
                      !selectedCategory && styles.dropdownDisabled,
                    ]}
                    dropDownContainerStyle={styles.dropdownList}
                    textStyle={styles.dropdownText}
                    placeholderStyle={styles.dropdownPlaceholder}
                    disabled={!selectedCategory}
                    dropDownDirection="TOP"
                    listMode="SCROLLVIEW"
                    ArrowDownIconComponent={() => (
                      <ChevronDown size={20} color="#6B7280" />
                    )}
                    ArrowUpIconComponent={() => (
                      <ChevronDown size={20} color="#6B7280" />
                    )}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Exercise Details Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exercise Details</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.row}>
              <View
                style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}
              >
                <View style={styles.inputHeader}>
                  <View style={styles.inputIconContainer}>
                    <Hash size={18} color="#6366F1" />
                  </View>
                  <Text style={styles.inputLabel}>Sets</Text>
                </View>
                <TextInput
                  value={data.sets.toString()}
                  onChangeText={(text) => handleChange("sets", text)}
                  keyboardType="numeric"
                  style={styles.textInput}
                  mode="outlined"
                  placeholder="3"
                  outlineColor="#E5E7EB"
                  activeOutlineColor="#6366F1"
                />
              </View>

              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                <View style={styles.inputHeader}>
                  <View style={styles.inputIconContainer}>
                    <Clock size={18} color="#6366F1" />
                  </View>
                  <Text style={styles.inputLabel}>Duration</Text>
                </View>
                <TextInput
                  value={data.duration.toString()}
                  onChangeText={(text) => handleChange("duration", text)}
                  keyboardType="numeric"
                  style={styles.textInput}
                  mode="outlined"
                  placeholder="30"
                  outlineColor="#E5E7EB"
                  activeOutlineColor="#6366F1"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <Hash size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>MET Value</Text>
              </View>
              <TextInput
                value={data.metValue.toString()}
                onChangeText={(text) => handleChange("metValue", text)}
                keyboardType="numeric"
                style={styles.textInput}
                mode="outlined"
                placeholder="5.0"
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <Hash size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Focus Areas</Text>
              </View>
              <View style={styles.dropdownContainer}>
                <DropDownPicker
                  open={openFocusArea}
                  value={selectedFocusArea}
                  items={focusArea}
                  setOpen={setOpenFocusArea}
                  setValue={setSelectedFocusArea}
                  setItems={setFocusArea}
                  placeholder="Select Focus Areas"
                  multiple={true}
                  mode="BADGE"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownList}
                  textStyle={styles.dropdownText}
                  placeholderStyle={styles.dropdownPlaceholder}
                  listMode="MODAL"
                  ArrowDownIconComponent={() => (
                    <ChevronDown size={20} color="#6B7280" />
                  )}
                  ArrowUpIconComponent={() => (
                    <ChevronDown size={20} color="#6B7280" />
                  )}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Instructions & Media Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Instructions & Media</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <FileText size={18} color="#6366F1" />
                </View>
                <Text style={styles.inputLabel}>Instructions</Text>
              </View>
              <TextInput
                value={data.instructions}
                onChangeText={(text) => handleChange("instructions", text)}
                multiline
                numberOfLines={4}
                style={[styles.textInput, styles.textArea]}
                mode="outlined"
                placeholder="Detailed step-by-step instructions..."
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <View style={styles.inputIconContainer}>
                  <Youtube size={18} color="#EF4444" />
                </View>
                <Text style={styles.inputLabel}>YouTube URL (Optional)</Text>
              </View>
              <TextInput
                value={data.videoUrl}
                onChangeText={(text) => handleChange("videoUrl", text)}
                style={styles.textInput}
                mode="outlined"
                placeholder="https://youtube.com/watch?v=..."
                keyboardType="url"
                outlineColor="#E5E7EB"
                activeOutlineColor="#6366F1"
              />
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.submitSection}>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Plus size={20} color="white" />
            <Text style={styles.submitButtonText}>Create Exercise</Text>
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
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    marginTop: 4,
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
  imageUploadContainer: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
  },
  previewImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  imagePlaceholder: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  imageIconContainer: {
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
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    position: "relative",
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
  },
  textArea: {
    minHeight: 100,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  dropdownContainer: {
    zIndex: 10,
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
    zIndex: 5000,
    elevation: 5,
  },
  dropdownText: {
    fontSize: 16,
    color: "#111827",
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: "#6B7280",
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
