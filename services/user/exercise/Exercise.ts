import axios from "axios";
import { Exercise } from "../../../types/user/exercise/Exercise";
import { API_URL } from "../../../constants/apiUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CalorieData, Workout } from "../../../types/user/exercise/Workout";


export const addExercise = async (formData: FormData): Promise<Exercise> => {
  try {
    const response = await axios.post(
      `${API_URL}/api/exercise/exercises/add`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllExercises = async (
  page: number,
  limit: number
): Promise<{
  data: Exercise[];
  totalCounts: number;
  totalPages: number;
  currentPage: number;
}> => {
  try {
    const response = await axios.get(`${API_URL}/api/exercise/exercises/list`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error in getAllExercises API:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getExerciseById = async (
  exerciseId: string
): Promise<Exercise> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/exercise/exercises/${exerciseId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getSearchExercises = async (
  searchQuery: string,
  page: number,
  limit: number
): Promise<{
  data: Exercise[];
  totalCounts: number;
  totalPages: number;
  currentPage: number;
}> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/exercise/exercises/list?searchTerm=${searchQuery}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchExercisesBySubcategory = async (subcategoryId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/exercise/exercises/subcategory/${subcategoryId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const startWorkout = async (exerciseId: string): Promise<Workout> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/api/exercise/workout/start`,
      { exerciseId: exerciseId },
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

export const stopWorkout = async (
  workoutId: string,
  activeSeconds: number
): Promise<Workout> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/api/exercise/workout/stop/${workoutId}`,
      { durationSeconds: activeSeconds },
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

export const userCaloriesStatsAnalytics = async() : Promise<CalorieData> =>{
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/exercise/workout/get-total-user-calories`,
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
}