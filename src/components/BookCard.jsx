import React from "react";
import "./../styles/scss/BookCard.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookCard = ({
  id,
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
  const token = localStorage.getItem('accessToken');

  const addCart = async() => {
      try {
        const response = await axios.post(
          `http://3.37.35.134:8080/api/cart/add/${id}`,
          {},
          {
              headers: {
                  Authorization: `Bearer ${token}`
              },
          }
        )
        console.log(response.data);
        navigate('/cart')
      } catch (error) {
          console.log(error);
      }
  }

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
        <img className="card-image" src={thumbnail} alt='' />
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
                  addCart();
                }}
              >
                장바구니
              </button>
              <button
                className="secondary-button"
                onClick={(e) => {
                  e.stopPropagation();
                  addCart();
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
