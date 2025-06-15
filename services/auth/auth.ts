import axios from "axios";
import { API_URL } from "../../constants/apiUrl";
import { LoginReq, User } from "../../types/auth/auth";

export const register = async (userData: User): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const login = async (userData: LoginReq): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, userData);
    return response.data;
  } catch (e) {
    throw e;
  }
};
