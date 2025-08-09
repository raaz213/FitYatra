import axios from "axios";
import {
  formData,
  Subcategory,
} from "../../../types/both/exercise/Subcategory";
import { API_URL } from "../../../constants/apiUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addExerciseSubcategory = async (
  formData: formData
): Promise<Subcategory> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/api/exercise/subcategories/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getExerciseSubcategories = async (): Promise<Subcategory[]> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `${API_URL}/api/exercise/subcategories/list`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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

// export const getUserExerciseSubcategories = async (
//   categoryId: string
// ): Promise<Subcategory[]> => {
//   try {
//     const response = await axios.get(
//       `${API_URL}/api/exercise/subcategories/user-subcategories/${categoryId}`
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
