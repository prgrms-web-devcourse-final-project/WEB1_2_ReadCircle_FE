import React from "react";
import BookCard from "./BookCard";
import "../styles/scss/BookList.scss";
import Header from "./Header";

const BookList = () => {
  const books = [
    {
      id: 1,
      title: "Psychology of Money",
      image: "src/assets/book1.png",
      category: "Novel",
      condition: "최상",
      forSale: true,
      forExchange: true,
      price: 17000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "src/assets/book2.png",
      category: "Novel",
      condition: "최상",
      forSale: true,
      forExchange: true,
      price: 15000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "src/assets/book3.png",
      category: "Novel",
      condition: "최상",
      forSale: false,
      forExchange: true,
      price: 15000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "src/assets/book4.png",
      category: "Novel",
      condition: "최상",
      forSale: true,
      forExchange: false,
      price: 15000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "src/assets/book5.png",
      category: "Novel",
      condition: "최상",
      forSale: true,
      forExchange: true,
      price: 15000,
    },
    {
      id: 1,
      title: "Psychology of Money",
      image: "src/assets/book1.png",
      category: "Novel",
      condition: "최상",
      forSale: true,
      forExchange: true,
      price: 17000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "src/assets/book2.png",
      category: "Novel",
      condition: "최상",
      forSale: true,
      forExchange: false,
      price: 15000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "src/assets/book3.png",
      category: "Novel",
      condition: "최상",
      forSale: true,
      forExchange: false,
      price: 15000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "src/assets/book4.png",
      category: "Novel",
      condition: "최상",
      forSale: true,
      forExchange: false,
      price: 15000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "src/assets/book5.png",
      category: "Novel",
      condition: "최상",
      forSale: true,
      forExchange: false,
      price: 15000,
    },
    {
      id: 1,
      title: "Psychology of Money",
      image: "src/assets/book1.png",
      category: "Novel",
      condition: "최상",
      forSale: true,
      forExchange: true,
      price: 17000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "src/assets/book2.png",
      category: "Novel",
      condition: "최상",
      forSale: true,
      forExchange: false,
      price: 15000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "src/assets/book3.png",
      category: "Novel",
      condition: "최상",
      forSale: true,
      forExchange: false,
      price: 15000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "src/assets/book4.png",
      category: "Novel",
      condition: "최상",
      forSale: true,
      forExchange: false,
      price: 15000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "src/assets/book5.png",
      category: "Novel",
      condition: "최상",
      forSale: true,
      forExchange: false,
      price: 15000,
    },
  ];

  return (
    <>
      <Header />
      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
};

export default BookList;
