import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Beast } from '../types';


const API_URL = 'http://192.168.1.166:3000'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signInWithApple = async (identityToken: string) => {
  try {
    const response = await api.post('/auth/apple', { identityToken }, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
    
    const res = response.data as { token: string, beast: Beast};
    await AsyncStorage.setItem('jwt_token', res.token);
    await AsyncStorage.setItem('beast_id', res.beast.id.toString());
    return res;
  } catch (error) {
    console.error('Apple Sign In failed:', error);
    throw error;
  }
};

export const getBeastProfile = async (id: number) => {
  try {
    const response = await api.get(`/beast/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get beast profile:', error);
    throw error;
  }
};

export const updateBeastProfile = async (id: number, data: { gamerTag?: string, email?: string }) => {
  try {
    const response = await api.patch(`/beast/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update beast profile:', error);
    throw error;
  }
};