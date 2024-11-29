import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Express 서버 URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
