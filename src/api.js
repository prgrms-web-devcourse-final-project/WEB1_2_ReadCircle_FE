import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;


const NAVER_CLIENT_ID = 'UEp1O0x__f6k8Sl2VAkS'; // 네이버에서 발급받은 클라이언트 ID
const NAVER_CLIENT_SECRET = 'FKbOaPwC31'; // 네이버에서 발급받은 클라이언트 Secret

// 책 검색 API 호출 함수
export const searchBooks = async (query) => {
    try {
        const response = await axios.get(`/api/v1/search/book.json`, {
            params: { query, display: 10 },
            headers: {
                'X-Naver-Client-Id': NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
            },
        });

        return response.data.items; // 검색 결과 리스트 반환
    } catch (error) {
        console.error('책 검색 오류:', error);
        throw error;
    }
};
