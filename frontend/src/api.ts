import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const API = axios.create({ baseURL: `${BACKEND_URL}/api` });

interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: 'buyer' | 'seller';
}

interface LoginUser {
  email: string;
  password: string;
}

export interface Property {
  userId: number,
  id: number;
  place: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  nearbyFacilities: string[];
  price: number;
  sellerId: number;
}

export const registerUser = (formData: RegisterUser) => API.post('/auth/register', formData);
export const loginUser = (formData: LoginUser) => API.post('/auth/login', formData);