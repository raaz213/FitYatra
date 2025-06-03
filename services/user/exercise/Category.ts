import axios from "axios";
import { API_URL } from "../../../constants/apiUrl";
import { Category } from "../../../types/user/exercise/Category";


export const addExerciseCategoryResponse = async (formData: FormData): Promise<Category> => {
  try {
    console.log(formData)
    const response = await axios.post(
      `${API_URL}/api/exercise/categories/add`,
      formData,
      {
        headers:{
          'Content-Type': 'multipart/form-data',
        }
      }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const fetchAllCategories = async (): Promise<Category[]> => {
  try{
    const response = await axios.get(`${API_URL}/api/exercise/categories/list`);
    return response.data;
  }catch(e){
    throw e;
  } 
}