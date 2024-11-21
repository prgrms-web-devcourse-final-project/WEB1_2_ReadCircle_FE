import React from "react";
import BookCard from "./BookCard";
import "../styles/scss/BookList.scss";

const BookList = ({ books = [] }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.postId} book={book} />
      ))}
    </div>
  );
};

export default BookList;
