import React, { useState } from "react";
import "../styles/scss/FilterSidebar.scss";

const FilterSidebar = ({
  books,
  onFilterChange,
  categories = [], // 사전 순 정렬
  isCondition, // 책 상태
  isTradeType, // 판매 교환
  isForSale, // 판매 상태
  isPrice,
}) => {
  const [filters, setFilters] = useState({
    category: [],
    condition: [],
    priceRange: { min: "", max: "" },
    forSale: false, // 판매 옵션
    forExchange: false, // 교환 옵션
    showForSale: true, // 판매 중
    showSoldOut: true, // 핀매 완료
    sortOrder: "newest", // 'newest' or 'oldest' (출간연도 기준)
  });

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [key]: value };
      onFilterChange(newFilters); // 부모에게 전달
      return newFilters;
    });
  };

  const handleCheckboxChange = (key) => {
    const newValue = !filters[key];
    handleFilterChange(key, newValue);
  };

  const handlePriceChange = (key, value) => {
    const newPriceRange = { ...filters.priceRange, [key]: value };
    handleFilterChange("priceRange", newPriceRange);
  };

  return (
    <div className="filter-sidebar">
      {/* 카테고리 */}
      <div className="filter-group">
        <div className="filter-header">카테고리</div>
        <div className="filter-options">
          {categories.map((cat) => (
            <label key={cat}>
              <input
                type="checkbox"
                checked={filters.category.includes(cat)}
                onChange={() => {
                  const updatedCategory = filters.category.includes(cat)
                    ? filters.category.filter((item) => item !== cat)
                    : [...filters.category, cat];
                  handleFilterChange("category", updatedCategory);
                }}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* 상태 */}
      {isCondition && (
        <div className="filter-group">
          <div className="filter-header">상태</div>
          <div className="filter-options">
            {["상", "중", "하"].map((cond) => (
              <label key={cond}>
                <input
                  type="checkbox"
                  checked={filters.condition.includes(cond)}
                  onChange={() => {
                    const updatedCondition = filters.condition.includes(cond)
                      ? filters.condition.filter((item) => item !== cond)
                      : [...filters.condition, cond];
                    handleFilterChange("condition", updatedCondition);
                  }}
                />
                {cond}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 판매-교환 */}
      {isTradeType && (
        <div className="filter-group">
          <div className="filter-header">거래 유형</div>
          <div className="filter-options">
            <label>
              <input
                type="checkbox"
                checked={filters.forSale}
                onChange={() => handleFilterChange("forSale", !filters.forSale)}
              />
              판매
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.forExchange}
                onChange={() =>
                  handleFilterChange("forExchange", !filters.forExchange)
                }
              />
              교환
            </label>
          </div>
        </div>
      )}

      {/* 판매 상태 필터 */}
      {isForSale && (
        <div className="filter-group">
          <div className="filter-header">판매 상태</div>
          <div className="filter-options">
            <label>
              <input
                type="checkbox"
                checked={filters.showForSale}
                onChange={() => handleCheckboxChange("showForSale")}
              />
              판매 중
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.showSoldOut}
                onChange={() => handleCheckboxChange("showSoldOut")}
              />
              판매 완료
            </label>
          </div>
        </div>
      )}

      {/* 가격 */}
      {isPrice && (
        <div className="filter-group">
          <div className="filter-header">가격 범위</div>
          <div className="filter-options">
            <input
              type="number"
              placeholder="최소 가격"
              value={filters.priceRange.min}
              onChange={(e) => handlePriceChange("min", e.target.value)}
            />
            <input
              type="number"
              placeholder="최대 가격"
              value={filters.priceRange.max}
              onChange={(e) => handlePriceChange("max", e.target.value)}
            />
          </div>
        </div>
      )}

      {/* 출간연도 */}
      <div className="filter-group">
        <div className="filter-header">출간연도 정렬</div>
        <div className="filter-options">
          <label>
            <input
              type="radio"
              value="newest"
              checked={filters.sortOrder === "newest"}
              onChange={() => handleFilterChange("sortOrder", "newest")}
            />
            최신순
          </label>
          <label>
            <input
              type="radio"
              value="oldest"
              checked={filters.sortOrder === "oldest"}
              onChange={() => handleFilterChange("sortOrder", "oldest")}
            />
            오래된순
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
