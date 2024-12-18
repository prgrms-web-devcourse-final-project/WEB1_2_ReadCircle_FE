import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadDirectTradePosts, loadECommerceBooks } from "../redux/postSlice";
import BookList from "../components/BookList";
import Header from "../components/Header";
import "../styles/scss/SearchMallPage.scss";

const SearchMallPage = () => {
  const navigate = useNavigate();
  const { isbn } = useParams();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("new");
  const { isLoading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(loadDirectTradePosts());
    dispatch(loadECommerceBooks());
  }, [dispatch]);

  const sortByUpdatedAt = (items) => {
    return items
      .slice()
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  };

  // 직거래 게시글 필터링 및 정렬
  const filteredDirectTradePosts = sortByUpdatedAt(
    useSelector((state) => state.posts.directTradePosts)
  ).filter((post) => post.isbn === isbn && post.forSale);

  // 이커머스 게시글 필터링 및 정렬
  const filteredECommerceBooks = sortByUpdatedAt(
    useSelector((state) => state.posts.eCommerceBooks)
  ).filter((book) => book.isbn === isbn && book.forSale);

  // 판매 상태 및 업데이트(updatedAt)순 정렬 로직 (판매 완료 상품도 출력)
  // const sortBooks = (books) => {
  //   return books.slice().sort((a, b) => {
  //     if (a.forSale !== b.forSale) {
  //       // 판매 중 상품이 우선
  //       return a.forSale ? -1 : 1;
  //     }
  //     // 같은 판매 상태에서는 최신 업데이트 순
  //     return new Date(b.updatedAt) - new Date(a.updatedAt);
  //   });
  // };

  // 대표책 선택
  const representativeBook =
    filteredECommerceBooks.length > 0
      ? filteredECommerceBooks[0]
      : filteredDirectTradePosts[0];

  // 이커머스 책 상세 페이지로 이동
  const handleCardClickECommerce = (id) => {
    navigate(`/purchase-view`);
  };

  // 직거래 책 상세 페이지로 이동
  const handleCardClickDirect = (id) => {
    navigate(`/view`);
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
            <h1 className="book-title">{representativeBook.title}</h1>
            <p className="book-meta">
              {representativeBook.author} (지은이) {representativeBook.category}{" "}
              {representativeBook.publisher} {representativeBook.publishDate}
            </p>
          </div>

          <div className="book-content">
            <img
              src={representativeBook.thumbnailUrl}
              alt={representativeBook.title}
              className="book-thumbnail"
            />
            <p className="book-description">{representativeBook.content}</p>
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

        <div className="book-list__mall">
          {selectedCategory === "new" ? (
            <BookList
              books={filteredECommerceBooks}
              onCardClick={handleCardClickECommerce}
              showDeliveryFee={true}
              showActions={true}
              showNickname={false}
            />
          ) : (
            <BookList
              books={filteredDirectTradePosts}
              onCardClick={handleCardClickDirect}
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
