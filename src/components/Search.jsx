import React from "react";
import { FiSearch } from "react-icons/fi";
import "../styles/scss/Search.scss";

const Search = ({
  searchTerm,
  setSearchTerm,
  onSearchSubmit,
  onSubmitMode = "navigate",
}) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearchSubmit(searchTerm.trim(), onSubmitMode);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearchSubmit} className="search-input">
        <FiSearch className="search-input__icon" />
        <input
          type="text"
          placeholder="Search by book title, author, or ISBN"
          className="search-input__field"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>
    </div>
  );
};

export default Search;
