import { apiRequest } from "../Services/Auth.Api";

export const loginUser = async (formData) => {
  const data = await apiRequest("/auth/login", "POST", formData);
  return data;
};

export const registerUser = async (formData) => {
  const data = await apiRequest("/auth/register", "POST", formData);
  return data;
};