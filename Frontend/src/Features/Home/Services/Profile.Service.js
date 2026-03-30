import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

export const fetchProfile = async () => {
  const { data } = await axios.get(`${API_URL}/me`, { withCredentials: true });
  return data;
};
