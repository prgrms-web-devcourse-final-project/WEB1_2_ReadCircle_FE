import React, { useState } from "react";
import "../styles/scss/FilterSidebar.scss";

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: [],
    condition: [],
    // priceRange: "",
    forSale: false,
    forExchange: false,
    isFavorite: false,
  });

  const [isExpanded, setIsExpanded] = useState({
    category: false,
    condition: false,
    price: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters); // 부모로 필터 상태 전달
  };

  const toggleExpand = (key) => {
    setIsExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCategorySelection = (category) => {
    const updatedCategory = filters.category.includes(category)
      ? filters.category.filter((item) => item !== category)
      : [...filters.category, category];

    handleFilterChange("category", updatedCategory);
  };

  const handleConditionSelection = (condition) => {
    const updatedCondition = filters.condition.includes(condition)
      ? filters.condition.filter((item) => item !== condition)
      : [...filters.condition, condition];

    handleFilterChange("condition", updatedCondition);
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-group">
        <div className="filter-header" onClick={() => setIsModalOpen(true)}>
          카테고리
          <span className="toggle-button">
            {filters.category.length > 0 ? `(${filters.category.length})` : "+"}
          </span>
        </div>
      </div>

      <div className="filter-group">
        <div
          className="filter-header"
          onClick={() => toggleExpand("condition")}
        >
          상태
          <span className="toggle-button">
            {isExpanded.condition ? "-" : "+"}
          </span>
        </div>
        {isExpanded.condition && (
          <div className="filter-options">
            {["최상", "상", "중", "하", "최하"].map((cond) => (
              <label key={cond}>
                <input
                  type="checkbox"
                  name="condition"
                  value={cond}
                  checked={filters.cond}
                  onChange={() => handleConditionSelection(cond)}
                />
                {cond}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* <div className="filter-group">
        <div className="filter-header" onClick={() => toggleExpand("price")}>
          가격 {isExpanded.price ? "-" : "+"}
        </div>
        {isExpanded.price && (
          <div className="filter-options">
            {["~1만원", "1만원~3만원", "3만원~5만원"].map((range) => (
              <label key={range}>
                <input
                  type="checkbox"
                  name="priceRange"
                  value={range}
                  checked={filters.priceRange.includes(range)}
                  onChange={() => handleCheckboxChange("priceRange", range)}
                />
                {range}
              </label>
            ))}
            <div>
              <input
                type="text"
                placeholder="직접 입력"
                onBlur={(e) => handleManualPriceInput(e.target.value)}
              />
              <button>적용</button>
            </div>
          </div>
        )}
      </div> */}

      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            checked={filters.forSale}
            onChange={(e) => handleFilterChange("forSale", e.target.checked)}
          />
          판매
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.forExchange}
            onChange={(e) =>
              handleFilterChange("forExchange", e.target.checked)
            }
          />
          교환
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.isFavorite}
            onChange={(e) => handleFilterChange("isFavorite", e.target.checked)}
          />
          찜
        </label>
      </div>

      {isModalOpen && (
        <div className="category-modal">
          <button
            className="close-button"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close"
          >
            ✖
          </button>
          <div className="categories-grid">
            {[
              "소설",
              "시/에세이",
              "희곡",
              "인문",
              "가정/육아",
              "요리",
              "건강",
              "취미/실용/스포츠",
              "경제경영",
              "자기계발",
              "정치/사회",
              "역사/문화",
              "종교",
              "예술/대중문화",
              "중/고등참고서",
              "기술/공학",
              "외국어",
              "과학",
              "취업/수험서",
              "여행/지리",
              "컴퓨터/IT",
              "잡지",
              "청소년",
              "초등참고서",
              "유아",
              "어린이",
              "만화",
              "대학교재",
              "의학/건강",
              "사회과학",
              "인물/평전",
              "부모",
            ].map((cat) => (
              <label key={cat}>
                <input
                  type="checkbox"
                  checked={filters.category.includes(cat)}
                  onChange={() => handleCategorySelection(cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;
