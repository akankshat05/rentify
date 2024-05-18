import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

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
export const createProperty = (propertyData: Property) => API.post('/properties', propertyData);
export const getProperties = (userid: number) => API.get(`/properties/${userid}`);
export const getProperty = (id: number) => API.get<Property>(`/properties/${id}`);