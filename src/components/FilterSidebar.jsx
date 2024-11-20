import React, { useState } from "react";
import "../styles/scss/FilterSidebar.scss";

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: "",
    condition: "",
    forSale: null, // true, false, or null (null for no preference)
    forExchange: null,
    isFavorite: null,
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters); // 부모로 필터 상태 전달
  };

  return (
    <div className="filter-sidebar">
      <h3>필터</h3>
      <div className="filter-group">
        <label>카테고리</label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          <option value="">전체</option>
          <option value="소설/시">소설/시</option>
          <option value="자기계발">자기계발</option>
          <option value="경제경영">경제경영</option>
          <option value="인문학">인문학</option>
          <option value="컴퓨터/모바일">컴퓨터/모바일</option>
        </select>
      </div>

      <div className="filter-group">
        <label>상태</label>
        <select
          value={filters.condition}
          onChange={(e) => handleFilterChange("condition", e.target.value)}
        >
          <option value="">전체</option>
          <option value="최상">최상</option>
          <option value="상">상</option>
          <option value="중">중</option>
          <option value="하">하</option>
          <option value="최하">최하</option>
        </select>
      </div>

      <div className="filter-group">
        <label>판매 여부</label>
        <select
          value={filters.forSale}
          onChange={(e) =>
            handleFilterChange(
              "forSale",
              e.target.value === "true"
                ? true
                : e.target.value === "false"
                ? false
                : null
            )
          }
        >
          <option value="">전체</option>
          <option value="true">판매 가능</option>
          <option value="false">판매 불가</option>
        </select>
      </div>

      <div className="filter-group">
        <label>교환 여부</label>
        <select
          value={filters.forExchange}
          onChange={(e) =>
            handleFilterChange(
              "forExchange",
              e.target.value === "true"
                ? true
                : e.target.value === "false"
                ? false
                : null
            )
          }
        >
          <option value="">전체</option>
          <option value="true">교환 가능</option>
          <option value="false">교환 불가</option>
        </select>
      </div>

      <div className="filter-group">
        <label>찜 목록</label>
        <input
          type="checkbox"
          checked={filters.isFavorite || false}
          onChange={(e) => handleFilterChange("isFavorite", e.target.checked)}
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
