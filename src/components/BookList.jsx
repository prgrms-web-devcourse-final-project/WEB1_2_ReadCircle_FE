import React from "react";
import BookCard from "./BookCard";
import "../styles/scss/BookList.scss";

const BookList = () => {
  const books = [
    {
      id: 1,
      title: "Psychology of Money",
      image: "https://via.placeholder.com/150",
      category: "Novel",
      condition: "최상",
      forSale: true,
      forExchange: true,
      price: 17000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "https://via.placeholder.com/150",
      category: "Novel",
      condition: "최상",
      forSale: true,
      forExchange: false,
      price: 15000,
    },
  ];

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
