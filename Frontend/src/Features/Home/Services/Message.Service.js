import axios from "axios";
import api from "../../../Services/Api";

// GET all messages
export const fetchMessages = async () => {
  const { data } = await api.get("/messages");
  return data.messages;
};

// CREATE message
export const createMessage = async (message) => {
  const { data } = await api.post("/messages", { message });
  return data;
};

// LIKE / UNLIKE
export const toggleLikeMessage = async (id) => {
  const { data } = await api.post(`/messages/${id}/like`);
  return data;
};

// GET my messages
export const fetchMyMessages = async () => {
  const { data } = await api.get("/messages/my");
  return data.messages;
};