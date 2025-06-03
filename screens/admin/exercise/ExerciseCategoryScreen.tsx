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
  DataTable,
  Text,
  Card,
  Divider,
  useTheme,
} from "react-native-paper";
import { Plus, Image as ImageIcon, Edit, Trash2 } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";
import { addExerciseCategoryResponse, fetchAllCategories  } from "../../../services/user/exercise/Category";
import { Category } from "../../../types/user/exercise/Category";
import { API_URL } from "../../../constants/apiUrl";


export default function ExerciseCategoryScreen() {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };
  
  const handleAddCategory = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      const fileName = image.split("/").pop() || "photo.jpg";
      const fileType = fileName.split(".").pop();
      formData.append("image", {
        uri: image,
        name: fileName,
        type: `image/${fileType}`,
      } as any);
    }
    try {
      
      await addExerciseCategoryResponse(formData);
      Toast.success("Category added successfully!");
      setName("");
      setImage(null);
    } catch (error) {
      Toast.error("Failed to add category. Please try again.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchAllCategories();
      setCategories(response);
    };
    fetchCategories();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Exercise Categories</Text>

          <View style={styles.form}>
            <TextInput
              label="Category Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              mode="outlined"
            />

            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
              ) : (
                <View
                  style={[
                    styles.placeholderImage,
                    { backgroundColor: theme.colors.surfaceVariant },
                  ]}
                >
                  <ImageIcon size={24} color={theme.colors.onSurfaceVariant} />
                  <Text
                    style={{
                      color: theme.colors.onSurfaceVariant,
                      marginTop: 8,
                    }}
                  >
                    Select Image
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <Button
              onPress={handleAddCategory}
              mode="contained"
              style={styles.button}
              icon={() => <Plus size={18} color="white" />}
            >
              Add Category{" "}
            </Button>
          </View>

          <Divider style={styles.divider} />

          <Text style={styles.tableTitle}>Categories</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ flex: 0.2 }}>Image</DataTable.Title>
              <DataTable.Title style={{ flex: 0.5 }}>Name</DataTable.Title>
              <DataTable.Title style={{ flex: 0.3 }}>Actions</DataTable.Title>
            </DataTable.Header>

            {categories.map((category, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell style={{ flex: 0.2 }}>
                  <Image
                    source={{ uri: `${API_URL}/uploads/${category.image}` }}
                    style={styles.tableImage}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 0.5 }}>
                  {category.name}
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 0.3 }}>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                     
                      style={styles.iconButton}
                    >
                      <Edit size={18} color={theme.colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      
                      style={styles.iconButton}
                    >
                      <Trash2 size={18} color={theme.colors.error} />
                    </TouchableOpacity>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}

          </DataTable>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: "#0047AB",
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

  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  imagePicker: {
    marginBottom: 16,
  },
  previewImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  placeholderImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
  },
  divider: {
    marginVertical: 16,
  },
  tableTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  tableImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    marginHorizontal: 4,
  },
});
