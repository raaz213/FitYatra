import axios from "axios";
import { API_URL } from "../../../constants/apiUrl";
import {
  AdminCardStats,
  BodyMeasurement,
  CalorieData,
  TotalUserCalories,
} from "../../../types/both/exercise/Workout";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserMeasurements = async (): Promise<BodyMeasurement> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/auth/get-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userCaloriesStatsAnalytics = async (): Promise<CalorieData> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `${API_URL}/api/stats/get-total-user-calories`,
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

export const totalAllUserCalories = async (): Promise<TotalUserCalories[]> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `${API_URL}/api/stats/get-total-all-user-calories`,
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

export const getAdminCardStats = async (): Promise<AdminCardStats> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `${API_URL}/api/stats/get-admin-card-stats`,
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
