import React from "react";
import { Link } from "react-router-dom";
import "../styles/scss/Header.scss";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        ReadCircle
      </Link>
      <nav className="header__nav">
        <Link to="/BookList">BookList</Link>
        <Link to="/sell">Sell</Link>
        <Link to="/buy">Buy</Link>
        <Link to="/exchange">Exchange</Link>
        <Link to="/mypage">Mypage</Link>
        <Link to="/login" className="header__login" style={{ color: "#fff" }}>
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
