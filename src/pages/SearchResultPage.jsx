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
  const [sortOrder, setSortOrder] = useState("newest");
  const [books, setBooks] = useState([]);

  const { isLoading, error } = useSelector((state) => state.posts);

  // 데이터 병합 로직
  const mergeBooks = (ecommerceBooks, directBooks) => {
    const bookMap = new Map();

    const processBooks = (books, countType) => {
      books.forEach((book) => {
        const {
          isbn,
          title,
          category,
          author,
          publisher,
          publishDate,
          forSale,
          thumbnailUrl,
        } = book;
        if (!bookMap.has(isbn)) {
          bookMap.set(isbn, {
            isbn,
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
        const current = bookMap.get(isbn);
        bookMap.set(isbn, {
          ...current,
          [countType]: current[countType] + (forSale ? 1 : 0),
        });
      });
    };

    processBooks(ecommerceBooks, "newCount");
    processBooks(directBooks, "usedCount");

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
          book.isbn.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilters.length > 0) {
      results = results.filter((book) =>
        categoryFilters.includes(book.category)
      );
    }

    results = results.sort((a, b) => {
      const dateA = new Date(a.publishDate);
      const dateB = new Date(b.publishDate);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return results;
  };

  const filteredBooks = filterBooks();

  const handleSearchSubmit = (query) => {
    setSearchTerm(query);
    setSearchParams({ query });
  };

  const handleCategoryFilterChange = (filters) => {
    setCategoryFilters(filters.category);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
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
            onFilterChange={(filters) => {
              handleCategoryFilterChange(filters);
              if (filters.sortOrder) {
                handleSortChange(filters.sortOrder);
              }
            }}
            isCondition={false}
            isTradeType={false}
            isForSale={false}
            isPrice={false}
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
