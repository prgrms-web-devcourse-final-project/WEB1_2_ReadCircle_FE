import axios from "axios";

const BASE_URL = "http://13.209.5.86:5000";

// 로컬 스토리지에서 토큰 가져오기
const getAuthToken = () => {
  return localStorage.getItem("auth_token");
};

// axios 인스턴스 설정
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 전송 허용
});

// 이커머스(Shop) 게시글 조회
export const fetchECommerceBooks = async () => {
  const response = await api.get("/api/books");
  return response.data.data.content.map((book) => ({
    id: book.id,
    isbn: book.isbn,
    title: book.title,
    // content: post.content,
    category: book.category,
    author: book.author,
    publisher: book.publisher,
    publishDate: book.publishDate,
    condition: book.bookCondition,
    price: book.price,
    forSale: book.forSale,
    thumbnailUrl: book.thumbnailUrl,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt,
  }));
};

// 직거래(Market) 게시글 조회
export const fetchDirectTradePosts = async () => {
  const token = getAuthToken();
  const config = token
    ? {
        headers: { Authorization: `Bearer ${token}` },
      }
    : {};

  const response = await api.get("/api/posts", config);
  return response.data.content.map((post) => ({
    id: post.postId,
    isbn: post.isbn,
    title: post.title,
    content: post.content,
    category: post.bookCategory,
    author: post.author,
    publisher: post.publisher,
    publishDate: post.publishDate,
    condition: post.bookCondition,
    forSale: post.tradeStatus, // 판매 상태 (판매 완료, 판매 교환)
    price: post.price,
    tradeType: post.tradeType,
    thumbnailUrl: post.bookAPIImage,
    ninkname: post.ninkname,
    createdAt: post.postCreatedAt,
    updatedAt: post.postUpdatedAt,
  }));
};
