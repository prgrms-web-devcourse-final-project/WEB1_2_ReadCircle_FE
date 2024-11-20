import React from "react";
import { Link } from "react-router-dom";
import "../styles/scss/BookCard.scss";

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`} className="book-link">
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
        <button className="add-to-cart">Add to Cart</button>
      </Link>
    </div>
  );
};

export default BookCard;
