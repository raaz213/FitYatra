import axios from "axios";
import { API_URL } from "../../../constants/apiUrl";
import {
  formData,
  Subcategory,
} from "../../../types/both/nutrition/Subcategory";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addNutritionSubcategory = async (
  formData: formData
): Promise<Subcategory> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/api/nutrition/subcategories/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const fetchNutritionSubcategories = async (): Promise<Subcategory[]> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `${API_URL}/api/nutrition/subcategories/list`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};
export const fetchNutritionSubcategoriesByCategory = async (
  categoryId: string
): Promise<Subcategory[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/nutrition/subcategories/${categoryId}`
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};
