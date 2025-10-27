import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE
});

export const getBooks = (params) => api.get("/books", { params }).then(r => r.data);
export const createBook = (payload) => api.post("/books", payload).then(r => r.data);
export const updateBook = (id, payload) => api.put(`/books/${id}`, payload).then(r => r.data);
export const deleteBook = (id) => api.delete(`/books/${id}`).then(r => r.status);
export const getBook = (id) => api.get(`/books/${id}`).then(r => r.data);