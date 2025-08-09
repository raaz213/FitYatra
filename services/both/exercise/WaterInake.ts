import axios from "axios";
import { API_URL } from "../../../constants/apiUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetWaterIntake } from "../../../types/both/exercise/WaterIntake";


export const addWaterIntake = async (water: number): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem("token");
    await axios.post(
      `${API_URL}/api/water-intake/add`,
      { water: water },
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

export const getWaterIntakeLog = async (): Promise<GetWaterIntake[]> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/water-intake/get-log`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
