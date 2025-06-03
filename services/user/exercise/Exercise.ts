import axios from "axios";
import { Exercise } from "../../../types/user/exercise/Exercise";
import { API_URL } from "../../../constants/apiUrl";

export const addExercise = async (formData: FormData): Promise<Exercise> => {
  try {
    const response = await axios.post(
      `${API_URL}/api/exercise/workout/add`,
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

export const getAllExercises = async (): Promise<Exercise[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/exercise/workout/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getExerciseById = async (
  exerciseId: string
): Promise<Exercise> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/exercise/workout/${exerciseId}`
    );
    return response.data
  } catch (error) {
    throw error;
  }
};
