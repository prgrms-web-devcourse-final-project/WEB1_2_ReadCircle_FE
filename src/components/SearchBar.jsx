import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "../styles/scss/SearchBar.scss";

const SearchBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="search-bar">
      <button
        className="search-bar__hamburger"
        onClick={toggleDropdown}
        style={{ fontWeight: "700" }}
      >
        ☰
      </button>
      <div className="search-input">
        <FiSearch className="search-input__icon" />
        <input
          type="text"
          placeholder="Book name or writer name"
          className="search-input__field"
        />
      </div>
      {dropdownOpen && (
        <div className="search-bar__dropdown">
          <a href="#">소설 / 시</a>
          <a href="#">자기계발</a>
          <a href="#">경제경영</a>
          <a href="#">인문학</a>
          <a href="#">컴퓨터 / 모바일</a>
        </div>
      )}
    </div>
  );
};

export default SearchBar;