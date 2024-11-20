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

  // 카테고리 및 상태 클래스 변환
  const getCategoryClass = (category) => {
    switch (category) {
      case "소설/시":
        return "novel-poetry";
      case "자기계발":
        return "self-development";
      case "경제경영":
        return "business";
      case "인문학":
        return "humanities";
      case "컴퓨터/모바일":
        return "it";
      default:
        return "";
    }
  };

  const getConditionClass = (condition) => {
    switch (condition) {
      case "최상":
        return "best";
      case "상":
        return "good";
      case "중":
        return "fair";
      case "하":
        return "poor";
      case "최하":
        return "worst";
      default:
        return "";
    }
  };

  return (
    <div className="book-card">
      <Link to={`/book/${book.postId}`} className="book-link">
        <div
          className={`bookmark-button ${isFavorite ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault(); // 클릭 시 페이지 이동 방지
            handleBookmarkClick();
          }}
        >
          {isFavorite ? <FaBookmark /> : <FaRegBookmark />}
        </div>

        <img src={book.bookImage} alt={book.title} className="book-image" />
        <h3 className="book-title">{book.title}</h3>
        <div className="book-info">
          <span className={`category ${getCategoryClass(book.category)}`}>
            {book.category}
          </span>
          <span className={`condition ${getConditionClass(book.condition)}`}>
            {book.condition}
          </span>
        </div>
        <div className="book-options">
          {book.forSale && <span className="option sale">판매</span>}
          {book.forExchange && <span className="option exchange">교환</span>}
        </div>
        <div className="book-price">{book.price}원</div>
        <div className="book-user">{book.userId}</div>
      </Link>
    </div>
  );
};

export default BookCard;
