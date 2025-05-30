// api call file
import axios from "axios";
import { API_URL } from "../../../constants/apiUrl";

export const addExerciseCategoryResponse = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/api/exercise/categories`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Response from addExerciseCategoryResponse:", response);
    return response.data;
  } catch (e) {
    console.log(e);
    console.error("Error in addExerciseCategoryResponse:", e);
    throw e; // Re-throw to allow caller to catch
  }
};
