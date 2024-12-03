import React from "react";
import { Link } from "react-router-dom";
import "../styles/scss/SearchResultCard.scss";

const SearchResultCard = ({ book }) => {
  return (
    <div className="book-card__int">
      <Link to={`/searchmall/${book.isbn}`}>
        <div className="book-category">
          <span>{book.category}</span>
        </div>
        <div className="book-image">
          <img src={book.thumbnailUrl} alt={book.title} />
        </div>
        <div className="book-details">
          <h3 className="book-title">{book.title}</h3>
          <p className="isbn">ISBN {book.isbn}</p>
          <p className="book-author">{book.author}</p>
          <p className="book-year">{book.publishDate}</p>
          <p className="book-publisher">{book.publisher}</p>
          <div className="stock-info">
            <p>쇼핑: {book.newCount} </p>
            <p>직거래: {book.usedCount} </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchResultCard;

// 찜(관심) 관련 코드 [보류]
// import { FaRegBookmark } from "react-icons/fa";
// import { FaBookmark } from "react-icons/fa";
// {isFavorite ? <FaBookmark /> : <FaRegBookmark />}
