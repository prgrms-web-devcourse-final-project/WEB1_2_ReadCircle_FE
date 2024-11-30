// 더미 데이터 테스트
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadDirectTradePosts, loadECommerceBooks } from "../redux/postSlice";
import BookList from "../components/BookList";
import Header from "../components/Header";
import "../styles/scss/SearchMallPage.scss";

const SearchMallPage = () => {
  const { ISBN } = useParams();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("new");
  const { directTradePosts, eCommerceBooks, isLoading, error } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(loadDirectTradePosts());
    dispatch(loadECommerceBooks());
  }, [dispatch]);

  const filteredDirectTradePosts = directTradePosts.filter(
    (post) => post.isbn === ISBN && post.forSale
  );

  const filteredECommerceBooks = eCommerceBooks.filter(
    (book) => book.isbn === ISBN && book.forSale
  );

  // 대표책 선택
  const representativeBook =
    filteredECommerceBooks.length > 0
      ? filteredECommerceBooks[0]
      : filteredDirectTradePosts[0];

  // 이커머스 / 직거래 상세 페이지 이동
  const handleCardClick = (id) => {
    navigator(`/shopDetail/${id}`);
    navigator(`/marketDetail/${id}`);
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !representativeBook) {
    return (
      <div>
        <Header />
        <p>{error || "No data found for this book."}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="book-details-container">
        <div className="book-header">
          <div className="book-info">
            <h1 className="book-title">{bookData.representative.title}</h1>
            <p className="book-meta">
              {bookData.representative.author} (지은이){" "}
              {bookData.representative.category}{" "}
              {bookData.representative.publisher}{" "}
              {bookData.representative.publishDate}
            </p>
          </div>

          <div className="book-content">
            <img
              src={bookData.representative.thumbnailUrl}
              alt={bookData.representative.title}
              className="book-thumbnail"
            />
            <p className="book-description">
              {bookData.representative.content}
            </p>
          </div>
        </div>
        <div className="category-buttons">
          <button
            className={`category-button ${
              selectedCategory === "new" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("new")}
          >
            New
          </button>
          <button
            className={`category-button ${
              selectedCategory === "used" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("used")}
          >
            Used
          </button>
        </div>

        <div className="book-list">
          {selectedCategory === "new" ? (
            <BookList
              books={filteredECommerceBooks}
              onCardClick={handleCardClick}
              showDeliveryFee={true}
              showActions={true}
              showNickname={false}
            />
          ) : (
            <BookList
              books={filteredDirectTradePosts}
              onCardClick={handleCardClick}
              showDeliveryFee={false}
              showActions={false}
              showNickname={true}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SearchMallPage;
