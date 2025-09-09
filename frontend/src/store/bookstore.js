import { create } from "zustand";
import axios from "axios";

const API_URL = "https://library-32a5.onrender.com/api";
axios.defaults.withCredentials = true;


export const useBookStore = create((set) => ({
    // initial state
    book : null , 
    books : [],
    isLoading: false,
    error: null,
    message: null,

    // functions 
    addBook : async (title, author, cover, link, rating, description) => {
        set({ isLoading: true, message: null , error: null });
        try {
            const response = await axios.post(`${API_URL}/books`, { title, author, cover, link, rating, description });
            const {book , message} = response.data;
            set({ book, isLoading: false, message });
            return {book , message};

        }catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || "Error adding book" });
            throw error;

        }
    } ,

    fetchBooks : async () => {
        set({ isLoading: true, message: null , error: null });
        try {
            const response = await axios.get(`${API_URL}/fetch-books`);
            const { books } = response.data;
            set({ books, isLoading: false });
            return { books };
        }
        catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || "Error fetching books" });
            throw error;
        }
    } ,

    
    

    searchBooks : async (searchTerm) => {
        set({ isLoading: true, message: null , error: null });
        try {
            const response = await axios.get(`${API_URL}/search?searchTerm=${searchTerm}`);
            const { books } = response.data;
            set({ books, isLoading: false });
            return { books };
        }
    catch (error) {
        set({ isLoading: false, error: error.response?.data?.message || "Error searching books" });
        throw error;
    }
    } , 
    fetchBook : async (id) => {
        set({ isLoading: true, message: null , error: null });
        try {
            const response = await axios.get(`${API_URL}/fetch-book/${id}`);
            const { book } = response.data;
            set({ book, isLoading: false });
            return { book };
        } catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || "Error fetching book" });
            throw error;
        }
    } ,
    deleteBook : async (id) => {
        set({ isLoading: true, message: null , error: null });
        try {
            const response = await axios.delete(`${API_URL}/delete-book/${id}`);
            const { message } = response.data;
            set({ isLoading: false, message });
            return { message };
        }
    catch (error) {
            set({ isLoading: false, error: error.response?.data?.message || "Error deleting book" });
            throw error;
        }
    } ,
    updateBook: async (id, title, author, cover, link, rating, description) => {
  set({ isLoading: true, message: null, error: null });
  try {
    const response = await axios.put(`${API_URL}/update-book/${id}`, {
      title,
      author,
      cover,
      link,
      rating,
      description,
    });
    const { book, message } = response.data;
    set({ book, isLoading: false, message });
    return { book, message };
  } catch (error) {
    set({ isLoading: false, error: error.response?.data?.message || "Error updating book" });
    throw error;
  }
},

 }));