import axios from "axios";

const API_URL = "http://localhost:3000/api/messages";

export const fetchMessages = async () => {
  const { data } = await axios.get(API_URL, { withCredentials: true });
  return data.messages;
};

export const createMessage = async (messages) => {
  const { data } = await axios.post(
    API_URL,
    { messages },
    { withCredentials: true },
  );
  return data;
};

export const toggleLikeMessage = async (id) => {
  const { data } = await axios.post(`${API_URL}/${id}/like`, {}, { withCredentials: true });
  return data;
};

export const fetchMyMessages = async () => {
  const { data } = await axios.get(`${API_URL}/my`, { withCredentials: true });
  return data.messages;
};