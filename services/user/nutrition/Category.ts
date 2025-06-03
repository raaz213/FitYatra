import axios from "axios";
import { API_URL } from "../../../constants/apiUrl";
import { Category } from "../../../types/user/nutrition/Category";

export const addNutritionCategory = async(formData:FormData):Promise<Category> => {
    try{
        const response = await axios.post(`${API_URL}/api/nutrition/categories/add`,formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;

    }
    catch(e){
        throw e;
    }
}

export const fetchNutritionCategories = async():Promise<Category[]> => {
    try{
        const response = await axios.get(`${API_URL}/api/nutrition/categories/list`);
        return response.data;
    }catch(e){
        throw e;
    }
}