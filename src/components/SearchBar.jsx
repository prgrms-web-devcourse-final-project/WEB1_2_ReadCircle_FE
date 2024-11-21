import React from "react";
import { FiSearch } from "react-icons/fi";
import "../styles/scss/SearchBar.scss";

const SearchBar = ({ searchTerm, setSearchTerm, onSearchSubmit }) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(searchTerm.trim());
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearchSubmit} className="search-input">
        <FiSearch className="search-input__icon" />
        <input
          type="text"
          placeholder="Book name or writer name"
          className="search-input__field"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;

// 햄버거 아이콘 있는 코드 (보류)
// import React, { useState } from "react";
// import { FiSearch } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import "../styles/scss/SearchBar.scss";

// const SearchBar = ({ onSearch, redirectTo = null }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     // onSearch(value.trim());
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (redirectTo && searchTerm.trim()) {
//       navigate(`${redirectTo}?query=${encodeURIComponent(searchTerm.trim())}`);
//     }
//   };

//   // const [dropdownOpen, setDropdownOpen] = useState(false);
//   // const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   return (
//     <div className="search-bar">
//       {/* <button
//         className="search-bar__hamburger"
//         onClick={toggleDropdown}
//         style={{ fontWeight: "700" }}
//       >
//         ☰
//       </button> */}
//       <form onSubmit={handleSearchSubmit} className="search-input">
//         <FiSearch className="search-input__icon" />
//         <input
//           type="text"
//           placeholder="Book name or writer name"
//           className="search-input__field"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//       </form>
//       {/* {dropdownOpen && (
//         <div className="search-bar__dropdown">
//           <a href="#">소설 / 시</a>
//           <a href="#">자기계발</a>
//           <a href="#">경제경영</a>
//           <a href="#">인문학</a>
//           <a href="#">컴퓨터 / 모바일</a>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default SearchBar;
