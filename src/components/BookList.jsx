import React, { useState } from "react";
import BookCard from "./BookCard";
import "../styles/scss/BookList.scss";
import Header from "./Header";
import SearchBar from "./SearchBar";
import FloatingButton from "./FloatingButton";
import FilterSidebar from "./FilterSidebar";

const BookList = () => {
  const [filters, setFilters] = useState({});

  const filteredBooks = books.filter((book) => {
    if (filters.category && book.category !== filters.category) return false;
    if (filters.condition && book.condition !== filters.condition) return false;
    if (filters.forSale !== null && book.forSale !== filters.forSale)
      return false;
    if (
      filters.forExchange !== null &&
      book.forExchange !== filters.forExchange
    )
      return false;
    if (filters.isFavorite !== null && book.isFavorite !== filters.isFavorite)
      return false;
    return true;
  });

  return (
    <>
      <Header />
      <SearchBar />
      <div className="book-page">
        <FilterSidebar onFilterChange={setFilters} />
        <div className="book-list">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
      <FloatingButton />
    </>
  );
};

export default BookList;
