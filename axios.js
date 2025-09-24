// src/axios.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.render.com/deploy/srv-d39m3qje5dus73bitoeg?key=3PJqY7aFozo/api/v1", // adjust for production later
  withCredentials: true, // if using cookies/auth
});

