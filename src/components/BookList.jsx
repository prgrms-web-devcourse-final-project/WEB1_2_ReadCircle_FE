import React from "react";
import BookCard from "../components/BookCard";

const BookList = ({
  books,
  onCardClick,
  showDeliveryFee, // 배송료
  showActions, // 장바구니, 구매
  showNickname, // 닉네임
}) => {
  return (
    <div className="book-list__ind">
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          details={`${book.author}, ${book.publisher} | ${book.category} | ${book.publishDate}`} // 작가, 출판사, 카테고리, 출판날짜
          thumbnail={book.thumbnailUrl} // 책 사진
          condition={book.condition}
          price={`${book.price}원`}
          isForSale={book.forSale} // 판매여부
          showActions={showActions} // 장바구니, 구매 버튼 show
          onClick={() => onCardClick(book.id)} // 페이지 이동(상세 정보)
          nickname={showNickname ? book.nickname : null} // 닉네임 추가
          tradeType={book.tradeType} // 판매/교환 추가
          deliveryFee={showDeliveryFee ? "2500원" : null} // 배송료 추가
        />
      ))}
    </div>
  );
};

export default BookList;
