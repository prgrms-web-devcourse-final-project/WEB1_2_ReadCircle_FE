import React, { useState, useEffect, useMemo } from "react";
import { fetchDirectTradePosts } from "../api/bookApi";
import Header from "../components/Header";
import FilterSidebar from "../components/FilterSidebar";
import Search from "../components/Search";
import BookList from "../components/BookList";
import FloatingButton from "../components/FloatingButton";
import "../styles/scss/Shop_Market.scss";

const Market = () => {
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  // 필터와 검색 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: [],
    condition: [],
    priceRange: { min: "", max: "" },
    showForSale: true, // 판매 중
    showSoldOut: true, // 판매 완료
    sortOrder: "newest", // 출간년도: newset / oldset
    forSale: false, // 판매
    forExchange: false, // 교환
  });

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const books = await fetchDirectTradePosts();
      console.log("Fetched Books:", books);
      setBooksData(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      console.log("Detailed Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 검색 이벤트 핸들러
  const handleSearchSubmit = async (term) => {
    setSearchTerm(term.toLowerCase());
    await fetchBooks();
  };

  // 필터 변경 이벤트 핸들러
  const handleFilterChange = async (newFilters) => {
    setFilters(newFilters);
    await fetchBooks();
  };

  // 필터링된 책 목록
  const filteredBooks = useMemo(() => {
    return booksData
      .filter((book) => {
        // 검색
        if (
          searchTerm &&
          !book.title.toLowerCase().includes(searchTerm) &&
          !book.author.toLowerCase().includes(searchTerm) &&
          !book.isbn.toLowerCase().includes(searchTerm)
        ) {
          return false;
        }

        // 카테고리 필터링
        if (
          filters.category.length &&
          !filters.category.includes(book.category)
        ) {
          return false;
        }

        // 상태 필터링
        if (
          filters.condition.length &&
          !filters.condition.includes(book.book_condition)
        ) {
          return false;
        }

        // 판매-교환 필터링
        if (filters.forSale && book.tradeType !== "판매") return false;
        if (filters.forExchange && book.tradeType !== "교환") return false;

        // 판매 상태 필터링
        if (filters.showForSale && !filters.showSoldOut) {
          return book.isForSale;
        }
        if (!filters.showForSale && filters.showSoldOut) {
          return !book.isForSale;
        }

        // 가격 필터링
        const price = book.price;
        const { min, max } = filters.priceRange;
        if ((min && price < min) || (max && price > max)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // 최신순 정렬
        if (filters.sortOrder === "newest") {
          return new Date(b.publish_date) - new Date(a.publish_date);
        }
        return new Date(a.publish_date) - new Date(b.publish_date);
      });
  }, [booksData, filters, searchTerm]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchSubmit={handleSearchSubmit}
        onSubmitMode="filter"
      />

      <div className="shop-page">
        <div className="filter-sidebar-container">
          <FilterSidebar
            books={booksData}
            onFilterChange={handleFilterChange}
            isCondition={true}
            isTradeType={true}
            isForSale={true}
            isPrice={true}
          />
        </div>
        <div className="book-list-container">
          <BookList
            books={filteredBooks}
            onCardClick={(bookId) =>
              // 직거래 책 상세 페이지 경로
              (window.location.href = `/marketDetailPage/${bookId}`)
            }
            showDeliveryFee={false}
            showActions={false}
            showNickname={true}
          />
        </div>
      </div>
      <FloatingButton />
    </>
  );
};

export default Market;
