import React from "react";
import BookCard from "./BookCard";
import "../styles/scss/BookList.scss";
import Header from "./Header";
import SearchBar from "./SearchBar";
import FloatingButton from "./FloatingButton";

const BookList = () => {
  const books = [
    {
      id: 1,
      title: "Psychology of Money",
      image: "src/assets/book1.png",
      category: "소설/시",
      condition: "최상",
      forSale: true,
      forExchange: true,
      price: 17000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "src/assets/book2.png",
      category: "자기계발",
      condition: "상",
      forSale: true,
      forExchange: true,
      price: 15000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "src/assets/book3.png",
      category: "경제경영",
      condition: "중",
      forSale: false,
      forExchange: true,
      price: 15000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "src/assets/book4.png",
      category: "인문학",
      condition: "하",
      forSale: true,
      isFavorite: true,
      forExchange: false,
      price: 15000,
    },
    {
      id: 2,
      title: "How Innovation Works",
      image: "src/assets/book5.png",
      category: "컴퓨터/모바일",
      condition: "최하",
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
      isFavorite: true,
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
      <SearchBar />
      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <FloatingButton />
    </>
  );
};

export default BookList;
