import axios from "axios";
import { API_URL } from "../../../constants/apiUrl";
import { Category } from "../../../types/both/exercise/Category";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addExerciseCategory = async (
  formData: FormData
): Promise<Category> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/api/exercise/categories/add`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const fetchAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/exercise/categories/list`);
    return response.data;
  } catch (e) {
    throw e;
  }
};
