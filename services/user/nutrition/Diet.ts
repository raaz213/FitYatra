import axios from "axios";
import { API_URL } from "../../../constants/apiUrl";
import { Diet } from "../../../types/user/nutrition/diet";

export const addNutritionDiet = async (formData: FormData): Promise<Diet> => {
  try {
    const response = await axios.post(
      `${API_URL}/api/nutrition/diet/add`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const fetchNutritionDiets = async (
  page: number,
  limit: number
): Promise<{
  data: Diet[];
  totalCounts: number;
  totalPages: number;
  currentPage: number;
}> => {
  try {
    const response = await axios.get(`${API_URL}/api/nutrition/diet/list`, {
      params: { page, limit },
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const fetchNutritionDietById = async (dietId: string): Promise<Diet> => {
  try {
    const response = await axios.get(`${API_URL}/api/nutrition/diet/${dietId}`);
    return response.data;

  } catch (e) {
    throw e;
  }
};

export const getNutritionBySubcategory = async (subcategoryId: string): Promise<Diet[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/nutrition/diet/subcategory/${subcategoryId}`
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}


export const getSearchNutritions = async (
  searchQuery: string,
  page: number,
  limit: number
): Promise<{
  data: Diet[];
  totalCounts: number;
  totalPages: number;
  currentPage: number;
}> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/nutrition/diet/list?searchTerm=${searchQuery}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
