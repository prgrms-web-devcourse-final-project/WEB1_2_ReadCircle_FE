import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { loadDirectTradePosts, loadECommerceBooks } from "../redux/postSlice";
import SearchResult from "../components/SearchResult";
import Header from "../components/Header";
import Search from "../components/Search";
import FilterSidebar from "../components/FilterSidebar";
import "../styles/scss/SearchResultPage.scss";

const SearchResultPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [books, setBooks] = useState([]);

  // Redux 상태 값 가져오기
  const { directTradePosts, eCommerceBooks, isLoading, error } = useSelector(
    (state) => state.posts
  );

  // 데이터 병합 로직
  const mergeBooks = (ecommerceBooks, directBooks) => {
    const bookMap = new Map();

    // 이커머스 데이터 처리
    ecommerceBooks.forEach((book) => {
      const {
        isbn: ISBN,
        title,
        category,
        author,
        publisher,
        publishDate,
        forSale,
        thumbnailUrl,
      } = book;
      if (!bookMap.has(ISBN)) {
        bookMap.set(ISBN, {
          ISBN,
          title,
          category,
          author,
          publisher,
          publishDate,
          thumbnailUrl,
          newCount: 0,
          usedCount: 0,
        });
      }
      const current = bookMap.get(ISBN);
      bookMap.set(ISBN, {
        ...current,
        newCount: current.newCount + (forSale ? 1 : 0),
      });
    });

    // 직거래 데이터 처리
    directBooks.forEach((book) => {
      const {
        isbn: ISBN,
        title,
        category,
        author,
        publisher,
        publishDate,
        forSale,
        thumbnailUrl,
      } = book;
      if (!bookMap.has(ISBN)) {
        bookMap.set(ISBN, {
          ISBN,
          title,
          category,
          author,
          publisher,
          publishDate,
          thumbnailUrl,
          newCount: 0,
          usedCount: 0,
        });
      }
      const current = bookMap.get(ISBN);
      bookMap.set(ISBN, {
        ...current,
        usedCount: current.usedCount + (forSale ? 1 : 0),
      });
    });

    // 판매 완료된 데이터 제외 및 필터링
    return Array.from(bookMap.values()).filter(
      (book) => book.newCount > 0 || book.usedCount > 0
    );
  };

  // 데이터 로드 및 병합
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [directBooks, ecommerceBooks] = await Promise.all([
          dispatch(loadDirectTradePosts()).unwrap(),
          dispatch(loadECommerceBooks()).unwrap(),
        ]);

        const mergedBooks = mergeBooks(ecommerceBooks, directBooks);
        setBooks(mergedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  // 필터링 로직
  const filterBooks = () => {
    let results = books;

    if (searchTerm.trim()) {
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilters.length > 0) {
      results = results.filter((book) =>
        categoryFilters.includes(book.category)
      );
    }

    return results;
  };

  const filteredBooks = filterBooks();

  const handleSearchSubmit = (query, mode) => {
    if (mode === "navigate") {
      setSearchParams({ query });
      setSearchTerm(query);
    } else if (mode === "filter") {
      setSearchTerm(query);
    }
  };

  const handleCategoryFilterChange = (filters) => {
    setCategoryFilters(filters.category);
  };

  return (
    <>
      <Header />
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchSubmit={handleSearchSubmit}
        onSubmitMode="filter"
      />
      <div className="book-page">
        <div className="filter-sidebar-container">
          <FilterSidebar
            books={books}
            onFilterChange={handleCategoryFilterChange}
            isTradeType={false}
          />
        </div>
        <div className="book-list-container">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <SearchResult books={filteredBooks} />
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResultPage;
