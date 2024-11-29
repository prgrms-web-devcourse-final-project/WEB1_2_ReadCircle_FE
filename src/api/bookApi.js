import axios from "axios";

const BASE_URL = "http://13.209.5.86:5000";

// 직거래 게시글 조회
export const fetchDirectTradePosts = async (token) => {
  const response = await axios.get(`${BASE_URL}/api/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.map((post) => ({
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

// 이커머스 게시글 조회
export const fetchECommerceBooks = async () => {
  const response = await axios.get(`${BASE_URL}/api/books`);
  return response.data.content.map((book) => ({
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
