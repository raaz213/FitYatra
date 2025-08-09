import axios from "axios";
import { API_URL } from "../../../constants/apiUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AdminCardStats,
  BodyMeasurement,
  CalorieData,
  TotalUserCalories,
  Workout,
  WorkoutHistory,
} from "../../../types/both/exercise/Workout";

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

export const getWorkoutHistory = async (): Promise<WorkoutHistory[]> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/exercise/workout/user-workout-history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      });
    return response.data;
  } catch (error) {
    throw error;
  }
};
