import React from "react";
import SearchResultCard from "./SearchResultCard";
import "../styles/scss/SearchResult.scss";

const SearchResult = ({ books = [] }) => {
  return (
    <div className="book-list">
      {books.length ? (
        books.map((book) => <SearchResultCard key={book.ISBN} book={book} />)
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResult;
