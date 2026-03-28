import { apiRequest } from "./Api";

export const registerUser = (userData) => {
  return apiRequest("/auth/register", "POST", userData);
};

export const loginUser = (userData) => {
  return apiRequest("/auth/login", "POST", userData);
};