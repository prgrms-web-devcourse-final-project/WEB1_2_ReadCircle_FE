import React, { useState, useEffect, useMemo } from "react";
import { fetchECommerceBooks } from "../api/bookApi";
import Header from "../components/Header";
import FilterSidebar from "../components/FilterSidebar";
import Search from "../components/Search";
import BookList from "../components/BookList";
import FloatingButton from "../components/FloatingButton";
import "../styles/scss/Shop_Market.scss";

const Shop = () => {
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  // 필터와 검색 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: [],
    condition: [],
    priceRange: { min: "", max: "" },
    showForSale: true, // 판매 중 (기본값: true)
    showSoldOut: true, // 판매 완료 (기본값: true)
    sortOrder: "newest", // 'newest' or 'oldest'
  });

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const books = await fetchECommerceBooks();
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

  const handleSearchSubmit = async (term) => {
    setSearchTerm(term.toLowerCase());
    await fetchBooks();
  };

  const handleFilterChange = async (newFilters) => {
    setFilters(newFilters);
    await fetchBooks();
  };

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

        // 카테고리 정렬
        if (
          filters.category.length &&
          !filters.category.includes(book.category)
        ) {
          return false;
        }

        // 상태 정렬
        if (
          filters.condition.length &&
          !filters.condition.includes(book.book_condition)
        ) {
          return false;
        }

        // // 판매 상태 필터링
        if (filters.showForSale && !filters.showSoldOut) {
          // 판매 중만 체크된 경우
          return book.isForSale;
        }
        if (!filters.showForSale && filters.showSoldOut) {
          // 판매 완료만 체크된 경우
          return !book.isForSale;
        }

        // 가격 정렬
        const price = book.price;
        const { min, max } = filters.priceRange;
        if ((min && price < min) || (max && price > max)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortOrder === "newest") {
          return new Date(b.publish_date) - new Date(a.publish_date);
        } else {
          return new Date(a.publish_date) - new Date(b.publish_date);
        }
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

      {/* shop page */}
      <div className="shop-page">
        <div className="filter-sidebar-container">
          <FilterSidebar
            books={booksData}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="book-list-container">
          <BookList
            books={filteredBooks}
            onCardClick={(bookId) =>
              // 이커머스 책 상세 페이지 경로
              (window.location.href = `/shopDetailPage/${bookId}`)
            }
            showDeliveryFee={true} // 배송비 표시
            showActions={true} // 장바구니, 구매 버튼 표시
            showNickname={false} // 닉네임 표시 안함
          />
        </div>
      </div>
      <FloatingButton />
    </>
  );
};

export default Shop;
