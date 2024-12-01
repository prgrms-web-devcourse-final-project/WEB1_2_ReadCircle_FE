import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/scss/FloatingButton.scss";

const FloatingButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname.includes("/shop")) {
      // 이커머스 상품 판매 페이지(판매 게시글)로 이동
      navigate("/purchase-create");
    } else if (location.pathname.includes("/market")) {
      // 직거래 상품 판매 페이지(판매 게시글)로 이동
      navigate("/create");
    }
  };

  return (
    <button className="floating-button" onClick={handleClick}>
      +
    </button>
  );
};

export default FloatingButton;
