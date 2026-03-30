import api from "../../../Services/Api";

export const fetchProfile = async () => {
  const { data } = await api.get("/users/me");
  return data.user; 
};