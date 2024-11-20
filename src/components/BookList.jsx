import React, { useState } from "react";
import BookCard from "./BookCard";
import "../styles/scss/BookList.scss";
import Header from "./Header";
import SearchBar from "./SearchBar";
import FloatingButton from "./FloatingButton";
import FilterSidebar from "./FilterSidebar";

import { dummyData } from "../data";

const BookList = () => {
  // 필터 초기 상태 정의
  const [filters, setFilters] = useState({
    category: [], // 빈 배열로 초기화
    condition: "",
    forSale: false,
    forExchange: false,
    isFavorite: false,
  });

  const filteredBooks = dummyData
    .filter((book) => {
      if (
        filters.category?.length > 0 &&
        !filters.category.includes(book.category)
      )
        return false;
      if (filters.condition && book.condition !== filters.condition)
        return false;
      if (filters.forSale && !book.forSale) return false;
      if (filters.forExchange && !book.forExchange) return false;
      if (filters.isFavorite && !book.isFavorite) return false;

      return true;
    })
    .sort((a, b) => new Date(b.postCreatedAt) - new Date(a.postCreatedAt));

  return (
    <>
      <Header />
      <SearchBar />
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
