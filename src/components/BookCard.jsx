import React, { useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/scss/BookCard.scss";

const BookCard = ({ book }) => {
  const [isFavorite, setIsFavorite] = useState(book.isFavorite);

  const handleBookmarkClick = () => {
    setIsFavorite((prevState) => !prevState);
  };

  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`} className="book-link">
        <div
          className={`bookmark-button ${isFavorite ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault(); // 클릭 시 페이지 이동 방지
            handleBookmarkClick();
          }}
        >
          {isFavorite ? <FaBookmark /> : <FaRegBookmark />}
        </div>

        <img src={book.image} alt={book.title} className="book-image" />
        <h3 className="book-title">{book.title}</h3>
        <div className="book-info">
          <span className="category">{book.category}</span>
          <span className="condition">{book.condition}</span>
        </div>
        <div className="book-options">
          {book.forSale && <span className="option sale">판매</span>}
          {book.forExchange && <span className="option exchange">교환</span>}
        </div>
        <div className="book-price">{book.price}원</div>
      </Link>
    </div>
  );
};

export default BookCard;
