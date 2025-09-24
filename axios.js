// src/axios.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://alumnet-s.onrender.com/api/v1", // adjust for production later
  withCredentials: true, // if using cookies/auth
});

