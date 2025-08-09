import axios from "axios";
import { API_URL } from "../../../constants/apiUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GetGoalResponse,
  StepCounterStatsResponse,
} from "../../../types/both/exercise/StepCounter";

export const setGoal = async (goal: number): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem("token");
    await axios.post(
      `${API_URL}/api/step-counter/add-goal`,
      { goal: goal },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const getGoal = async (): Promise<GetGoalResponse> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/step-counter/get-goal`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const addStepCounterStats = async (
  goalId: string,
  steps: number,
  distance: number,
  calories: number
): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem("token");
    await axios.post(
      `${API_URL}/api/step-counter/add-counter-stats`,
      {
        goalId: goalId,
        steps: steps,
        distance: distance,
        calories: calories,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const getStepCounterStats =
  async (): Promise<StepCounterStatsResponse[]> => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${API_URL}/api/step-counter/get-counter-stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };
