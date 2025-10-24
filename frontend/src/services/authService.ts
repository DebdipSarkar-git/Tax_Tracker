import axios from 'axios';
import { UserLogin, UserRegister } from '../models/User';

const API_URL = 'http://localhost:9001/api/v1/auth';

export const register = async (payload: UserRegister): Promise<string> => {
  try {
    const response = await axios.post<string>(`${API_URL}/register`, payload);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const login = async (payload:UserLogin): Promise<any> => {
  try {
    const response = await axios.post<any>(`${API_URL}/login`, payload);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
