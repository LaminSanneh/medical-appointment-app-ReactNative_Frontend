import axios from 'axios';

import {API_URL} from '@env';
import authHeader from './authHeader';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {email, password});
    return response.data.token;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const logout = async () => {
  try {
    const headers = {headers: authHeader.getAuthHeader()};
    return await axios.post(`${API_URL}/logout`, null, headers);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

export const getUserData = async () => {
  try {
    const headers = {headers: authHeader.getAuthHeader()};
    const response = await axios.get(`${API_URL}/getUser`, headers);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error getting user data');
  }
};

export const register = async (
  name: string,
  email: string,
  password: string,
  role: string,
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      role,
    });
    return response.data.token;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const updateUserProfile = async formData => {
  try {
    const headers = {
      headers: {
        ...authHeader.getAuthHeader(),
        ...{
          'Content-Type': 'multipart/form-data',
        },
      },
    };

    const response = await axios.post(
      `${API_URL}/updateProfile`,
      formData,
      headers,
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message
        ? `${error.response?.data?.message} Failed to update profile`
        : 'Failed to update profile',
    );
  }
};
export const getUserRole = async (token: string) => {
  try {
    const response = await axios.post(`${API_URL}/userRoles`, token);
    return response.data.roles;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Cannot Fetch User Roles');
  }
};
