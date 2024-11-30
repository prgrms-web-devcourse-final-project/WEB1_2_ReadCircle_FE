import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadECommerceBooks } from "../redux/postSlice";
import Header from "../components/Header";
import FilterSidebar from "../components/FilterSidebar";
import Search from "../components/Search";
import BookList from "../components/BookList";
import FloatingButton from "../components/FloatingButton";
import "../styles/scss/Shop_Market.scss";

const Shop = () => {
  const dispatch = useDispatch();
  const { eCommerceBooks, isLoading, error } = useSelector(
    (state) => state.posts
  );

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

  useEffect(() => {
    dispatch(loadECommerceBooks());
  }, [dispatch]);

  const handleSearchSubmit = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredBooks = useMemo(() => {
    return eCommerceBooks
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

        console.log(book);
        // 상태 정렬
        if (
          filters.condition.length &&
          !filters.condition.includes(book.condition)
        ) {
          return false;
        }

        // // 판매 상태 필터링
        if (filters.showForSale && !filters.showSoldOut) {
          // 판매 중만 체크된 경우
          return book.forSale;
        }
        if (!filters.showForSale && filters.showSoldOut) {
          // 판매 완료만 체크된 경우
          return !book.forSale;
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
          return new Date(b.publishDate) - new Date(a.publishDate);
        } else {
          return new Date(a.publishDate) - new Date(b.publishDate);
        }
      });
  }, [eCommerceBooks, filters, searchTerm]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
            books={eCommerceBooks}
            onFilterChange={handleFilterChange}
            isCondition={true}
            isTradeType={false}
            isForSale={true}
            isPrice={true}
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
