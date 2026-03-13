import { create } from "zustand";
import api from "../services/api";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const response = await api.get("/message/users");
      set({ users: response.data });
    } catch (e) {
      toast.error(e.response.data.message || "Get users failed");
    } finally {
      set({ isUserLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const response = await api.post(
        "/message/send/" + selectedUser._id,
        messageData,
      );
      set({ messages: [...messages, response.data] });
    } catch (e) {
      toast.error(e.response.data.message || "Send message failed");
    }
  },

  getMessage: async () => {
    set({ isMessageLoading: true });
    const { selectedUser } = get();
    try {
      const response = await api.get("/message/" + selectedUser._id);
      set({ messages: response.data });
    } catch (e) {
      toast.error(e.response.data.message || "Getting message failed");
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

    subscribeToMessages: () => {
      const socket = useAuthStore.getState().socket;
      socket.on("newMessage", (newMessage) => {
          const { selectedUser } = get();
          if (!selectedUser) return;
          const isMessageSendFromSelectedUser = newMessage.sender === selectedUser._id;
          if(!isMessageSendFromSelectedUser) return;
          set({
            messages: [...get().messages, newMessage],
          });
      });
    },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
