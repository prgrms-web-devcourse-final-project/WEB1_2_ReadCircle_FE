import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookList from "../components/BookList";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FloatingButton from "../components/FloatingButton";
import FilterSidebar from "../components/FilterSidebar";

import "../styles/scss/BookList.scss";
import { dummyData } from "../data";

const BookListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [filters, setFilters] = useState({
    category: [],
    condition: [],
    forSale: false,
    forExchange: false,
    isFavorite: false,
  });

  const filterBooks = () => {
    if (!dummyData || dummyData.length === 0) {
      return []; // 데이터가 없으면 빈 배열 반환
    }

    let results = dummyData;

    if (searchTerm.trim()) {
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.userId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 필터 조건 적용
    results = results.filter((book) => {
      if (
        filters.category.length > 0 &&
        !filters.category.includes(book.category)
      )
        return false;
      if (
        filters.condition.length > 0 &&
        !filters.condition.includes(book.condition)
      )
        return false;
      if (filters.forSale && !book.forSale) return false;
      if (filters.forExchange && !book.forExchange) return false;
      if (filters.isFavorite && !book.isFavorite) return false;
      return true;
    });

    // 최신순 정렬
    return results.sort(
      (a, b) => new Date(b.postCreatedAt) - new Date(a.postCreatedAt)
    );
  };

  const filteredBooks = filterBooks() || [];

  const handleSearchSubmit = (query) => {
    setSearchParams({ query });
    setSearchTerm(query);
  };

  return (
    <>
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchSubmit={handleSearchSubmit}
      />
      <div className="book-page">
        <FilterSidebar onFilterChange={setFilters} />
        <BookList books={filteredBooks} filters={filters} />
      </div>
      <FloatingButton />
    </>
  );
};

export default BookListPage;
