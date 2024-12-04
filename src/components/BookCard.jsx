import React from "react";
import "./../styles/scss/BookCard.scss";
import { useNavigate } from "react-router-dom";

const BookCard = ({
  title,
  details,
  condition,
  tradeType,
  price,
  deliveryFee,
  thumbnail,
  nickname,
  onClick,
  showActions,
  isForSale,
}) => {
  const navigate = useNavigate();
  console.log(thumbnail);

  return (
    <div
      className={`book-card__ind ${isForSale ? "" : "sold-out"}`}
      onClick={onClick}
    >
      {!isForSale && (
        <div className="overlay">
          <span className="sold-out-text">판매 완료</span>
        </div>
      )}

      <div className="card-left">
        <img className="card-image" src={thumbnail} alt={`${title} 썸네일`} />
      </div>

      <div className="card-center">
        <h2 className="card-title">{title}</h2>
        <p className="card-details">{details}</p>
      </div>

      <div className="card-right">
        <div className="horizontal-info">
          <p className="condition">{condition}</p>

          <div className="price-delivery">
            <p className="price">{price}</p>
            {deliveryFee && (
              <p className="delivery-fee">배송료: {deliveryFee}</p>
            )}
          </div>

          {tradeType && (
            <div className="trade-type">
              <p>{tradeType}</p>
            </div>
          )}

          {nickname && (
            <div className="nickname">
              <p>{nickname}</p>
            </div>
          )}

          {showActions && (
            <div className="action-buttons">
              <button
                className="primary-button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/cart"); // 장바구니 페이지로 이동
                }}
              >
                장바구니
              </button>
              <button
                className="secondary-button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/buy"); // 구매 페이지로 이동
                }}
              >
                구매
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
