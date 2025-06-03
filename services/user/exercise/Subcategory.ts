import axios from "axios";
import {
  formData,
  Subcategory,
} from "../../../types/user/exercise/Subcategory";
import { API_URL } from "../../../constants/apiUrl";

export const addExerciseSubcategory = async (
  formData: formData
): Promise<Subcategory> => {
  try {
    const response = await axios.post(
      `${API_URL}/api/exercise/subcategories/add`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getExerciseSubcategories = async (): Promise<Subcategory[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/exercise/subcategories/list`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getExerciseSubcategoriesByCategory = async (
  categoryId: string
): Promise<Subcategory[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/exercise/subcategories/${categoryId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
