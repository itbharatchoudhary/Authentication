import { useState, useEffect } from "react";
import { useAuth } from "../../Auth/Context/AuthContext";
import {
  fetchMessages,
  createMessage,
  toggleLikeMessage,
} from "../Services/Message.Service";

export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const loadMessages = async () => {
    setLoading(true);
    try {
      const msgs = await fetchMessages();
      setMessages(msgs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addMessage = async (msg) => {
    try {
      const newMsg = await createMessage(msg);
      setMessages((prev) => [newMsg, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleLike = async (id) => {
    try {
      const data = await toggleLikeMessage(id);
      setMessages((prev) =>
        prev.map((m) =>
          m._id === id ? { ...m, likes: Array(data.likes).fill("user") } : m,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) return; 

    loadMessages();
  }, [token]);

  return { messages, loading, addMessage, toggleLike, loadMessages };
};
