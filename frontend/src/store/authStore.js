import { create } from "zustand";
import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = "https://library-32a5.onrender.com/api";

export const useAuthStore = create((set) => ({
    // initial state
    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetchingUser: true,

    // debug helper
    debug: () => {
        const state = useAuthStore.getState();
        console.log("AuthStore State:", state);
        return state;
    },

    // functions
    signup: async (username, email, password) => {
        set({ isLoading: true, message: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { username, email, password });
            set({ user: response.data.user, isLoading: false, message: response.data.message });
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || "Error signing up" });

            throw error;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, message: null , error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            const {user , message} = response.data;
            set({ user, isLoading: false, message });
            return {user , message};
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || "Error logging in" });
            throw error;
        }
    } ,

    fetchUser: async () => {
        set({ fetchingUser: true , error: null  });    
        try {
           const response = await axios.get(`${API_URL}/user`);

            const { user } = response.data;
            set({ user, fetchingUser: false });
        } catch (error) {
            set({ fetchingUser: false, error: null , user:null});

            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, message: null , error: null });
        try {
            const response = await axios.post(`${API_URL}/logout`);
            const { message } = response.data;
            set({ user: null, isLoading: false, message , error: null });
            return { message };
        }  catch (error) {
            set({ 
                isLoading: false, error: error.response?.data?.message || "Error logging out" });
            throw error;
        }
    }
}));

