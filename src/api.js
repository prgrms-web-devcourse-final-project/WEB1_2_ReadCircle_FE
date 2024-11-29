// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000", // Express 서버 URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;

// 이커머스, 직거래 게시글 조회 API
import axios from "axios";

const API_BASE_URL = "/api"; // 기본 API URL

export const fetchBooks = (query = "") =>
  axios.get(`${API_BASE_URL}/books`, { params: { query } });

export const fetchDirectBooks = (query = "") =>
  axios.get(`${API_BASE_URL}/posts`, { params: { query } });
