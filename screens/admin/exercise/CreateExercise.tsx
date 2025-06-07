import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  Card,
  useTheme,
  Divider,
} from "react-native-paper";
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
import { Exercise } from "../../../types/user/exercise/Exercise";
import DropDownPicker from "react-native-dropdown-picker";
import { fetchAllCategories } from "../../../services/user/exercise/Category";
import { Category } from "../../../types/user/exercise/Category";
import {
  getExerciseSubcategories,
  getExerciseSubcategoriesByCategory,
} from "../../../services/user/exercise/Subcategory";
import { Subcategory } from "../../../types/user/exercise/Subcategory";
import { addExercise } from "../../../services/user/exercise/Exercise";
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
  const theme = useTheme();
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
      Toast.success("exercise added successfully");
    } catch (error) {
      Toast.error("Error adding exercise");
    }
  };

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
            <Text style={styles.title}>Exercise Details</Text>

            {/* Exercise Name */}
            <View style={styles.inputContainer}>
              <User
                size={20}
                color={theme.colors.primary}
                style={styles.inputIcon}
              />
              <TextInput
                label="Exercise Name"
                value={data.name}
                onChangeText={(text) => handleChange("name", text)}
                style={styles.input}
                mode="outlined"
                placeholder="e.g., Push-ups, Squats"
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
                <Text style={styles.inputLabel}>Exercise Image</Text>
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.imagePicker}
                >
                  {data.image ? (
                    <Image
                      source={{ uri: data.image }}
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
            <View style={[styles.inputContainer, { zIndex: 1000 }]}>
              <DropDownPicker
                open={openCategories}
                value={selectedCategory}
                items={categories}
                setOpen={setOpenCategories}
                setValue={setSelectedCategory}
                setItems={setCategories}
                placeholder="Category"
                style={styles.dropdown}
                dropDownDirection="BOTTOM"
                textStyle={styles.dropdownText}
                ArrowDownIconComponent={() => (
                  <ChevronDown size={20} color={theme.colors.onSurface} />
                )}
                ArrowUpIconComponent={() => (
                  <ChevronDown size={20} color={theme.colors.onSurface} />
                )}
              />
            </View>

            <View style={[styles.inputContainer, { zIndex: 500 }]}>
              <DropDownPicker
                open={openSubCategories}
                value={selectedSubCategory}
                items={subCategories}
                setOpen={setOpenSubCategories}
                setValue={setSelectedSubCategory}
                setItems={setSubCategories}
                placeholder="Subcategory"
                dropDownDirection="BOTTOM"
                style={
                  selectedCategory
                    ? styles.dropdown
                    : { backgroundColor: "#f5f5f5", borderColor: "#e0e0e0" }
                }
                textStyle={
                  selectedCategory ? styles.dropdownText : { color: "#ccc" }
                }
                disabled={!selectedCategory}
                placeholderStyle={
                  selectedCategory ? styles.dropdownText : { color: "#ccc" }
                }
                ArrowDownIconComponent={() => (
                  <ChevronDown size={20} color={theme.colors.onSurface} />
                )}
                ArrowUpIconComponent={() => (
                  <ChevronDown size={20} color={theme.colors.onSurface} />
                )}
              />
            </View>

            {/* Sets */}
            <View style={styles.inputContainer}>
              <Hash
                size={20}
                color={theme.colors.primary}
                // placeholderStyle={styles.dropdownPlaceholder}
                style={styles.inputIcon}
              />
              <TextInput
                label="Number of Sets"
                value={data.sets.toString()}
                onChangeText={(text) => handleChange("sets", text)}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
                placeholder="e.g., 3, 4, 5"
              />
            </View>

            {/* Duration */}
            <View style={styles.inputContainer}>
              <Clock
                size={20}
                color={theme.colors.primary}
                style={styles.inputIcon}
              />
              <TextInput
                label="Duration"
                value={data.duration.toString()}
                onChangeText={(text) => handleChange("duration", text)}
                style={styles.input}
                mode="outlined"
                placeholder="e.g., 30 seconds, 2 minutes"
              />
            </View>

            {/* MET value */}
            <View style={styles.inputContainer}>
              <Clock
                size={20}
                color={theme.colors.primary}
                style={styles.inputIcon}
              />
              <TextInput
                label="MET Value"
                value={data.metValue.toString()}
                onChangeText={(text) => handleChange("metValue", text)}
                style={styles.input}
                mode="outlined"
              />
            </View>

            {/* Focus Area */}
            <View style={{ zIndex: 1000 }}>
              {" "}
              {/* Use View instead of ScrollView for zIndex container */}
              <DropDownPicker
                dropDownContainerStyle={{
                  alignItems: "flex-start",
                  zIndex: 3000, // Higher than parent for visibility
                  elevation: 3000, // For Android
                }}
                listMode="MODAL" // Use modal for better visibility
                open={openFocusArea}
                value={selectedFocusArea}
                items={focusArea}
                setOpen={setOpenFocusArea}
                setValue={setSelectedFocusArea}
                setItems={setFocusArea}
                placeholder="Focus Area"
                multiple={true}
                mode="BADGE"
                style={styles.dropdown}
                dropDownDirection="BOTTOM"
                textStyle={styles.dropdownText}
                ArrowDownIconComponent={() => (
                  <ChevronDown size={20} color={theme.colors.onSurface} />
                )}
                ArrowUpIconComponent={() => (
                  <ChevronDown size={20} color={theme.colors.onSurface} />
                )}
              />
            </View>

            {/* Instructions */}
            <View style={styles.inputContainer}>
              <FileText
                size={20}
                color={theme.colors.primary}
                style={styles.inputIcon}
              />
              <TextInput
                label="Instructions"
                value={data.instructions}
                onChangeText={(text) => handleChange("instructions", text)}
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
                value={data.videoUrl}
                onChangeText={(text) => handleChange("videoUrl", text)}
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
                onPress={handleSubmit}
                mode="contained"
                style={[styles.button, styles.saveButton]}
                icon={({ size, color }) => <Plus size={size} color={color} />}
              >
                Create Exercise
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
    marginRight: 8,
    marginTop: 12,
  },
  input: {
    flex: 1,
  },
  textArea: {
    flex: 1,
    minHeight: 80,
  },
  imageSection: {
    flex: 1,
    flexDirection: "column",
  },
  imagePicker: {
    marginTop: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  placeholderImage: {
    height: 180,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  dropdown: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 14,
  },
  divider: {
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  saveButton: {
    backgroundColor: "#0047AB",
  },
});
