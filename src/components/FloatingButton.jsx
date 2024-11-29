import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/scss/FloatingButton.scss";

const FloatingButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname.includes("/shop")) {
      navigate("/createShop");
    } else if (location.pathname.includes("/market")) {
      navigate("/createMarket");
    }
  };

  return (
    <button className="floating-button" onClick={handleClick}>
      +
    </button>
  );
};

export default FloatingButton;
