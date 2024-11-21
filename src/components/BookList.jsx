import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "./BookCard";
import "../styles/scss/BookList.scss";
import Header from "./Header";
import SearchBar from "./SearchBar";
import FloatingButton from "./FloatingButton";
import FilterSidebar from "./FilterSidebar";

import { dummyData } from "../data";

const BookList = () => {
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
    let results = dummyData;

    // 검색어 필터링
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

  const filteredBooks = filterBooks();

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
        <div className="book-list">
          {filteredBooks.map((book) => (
            <BookCard key={book.postId} book={book} />
          ))}
        </div>
      </div>
      <FloatingButton />
    </>
  );
};

export default BookList;
