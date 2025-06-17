import axios from "axios";
import { API_URL } from "../../constants/apiUrl";
import { LoginReq, LoginRes,UpdateUserReq,User } from "../../types/auth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const register = async (userData: User): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const login = async (userData: LoginReq): Promise<LoginRes> => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, userData);
    return response.data;
  } catch (e) {
    throw e;
  }
};


export const logoutUser = async (navigation: any) => {
  try {
    // Clear stored user session/token
    await AsyncStorage.removeItem("token"); // or 'token' or whatever key you used

    // Navigate to login screen
    navigation.navigate('Auth');
  } catch (error) {
    throw error;
  }
};

export const getUser = async(): Promise<User> =>{
  try{
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${API_URL}/api/auth/get-user`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    return response.data;
  }catch(e){
    throw e;
  }
}

export const updateUser = async(userData:UpdateUserReq) :Promise<User> =>{
  try{
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(`${API_URL}/api/auth/update-user`,userData,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    return response.data;

  }catch(e){
    throw e;
  }
}

export const updateUserImage = async(image:string) :Promise<string> =>{
  try{
    console.log(image);
    const token = await AsyncStorage.getItem('token');
   const response = await axios.post(`${API_URL}/api/auth/update-user-image`,{image},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    return response.data;
  }catch(e){
    throw e;
  }
}
