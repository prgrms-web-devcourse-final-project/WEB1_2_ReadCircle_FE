import React from "react";
import { Link } from "react-router-dom";
import "./../styles/scss/MainPage.scss";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FloatingButton from "../components/FloatingButton";

const MainPage = () => {
  const categories = [
    {
      name: "소설/시",
      icon: <IoBookOutline style={{ color: "white" }} />,
      link: "/category/novels",
      color: "#7DA8F3",
    },
    {
      name: "자기계발",
      icon: <FaDumbbell />,
      link: "/category/self-help",
      color: "#70D4E6",
    },
    {
      name: "경제경영",
      icon: <FaMoneyBillTrendUp />,
      link: "/category/business",
      color: "#6CC6C6",
    },
    {
      name: "인문학",
      icon: <MdOutlineMan4 />,
      link: "/category/humanities",
      color: "#919FE8",
    },
    {
      name: "컴퓨터/모바일",
      icon: <FaComputer />,
      link: "/category/tech",
      color: "#F898BB",
    },
  ];

  const products = [
    { title: "MARIE CURIE", price: "17,000원", image: "src/assets/book1.png" },
    { title: "MuhammadAli", price: "18,000원", image: "src/assets/book2.png" },
    { title: "MALCOLM X", price: "22,000원", image: "src/assets/book3.png" },
  ];

  return (
    <>
      <Header />
      <div className="main">
        <SearchBar />
        <div className="main__banner">
          <img src="src/assets/banner.png" alt="Banner" />
        </div>
        <div className="main__categories">
          <h2 className="main__categories-title">카테고리</h2>
          <div className="main__categories-list">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="category"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="category__box"
                  style={{ backgroundColor: category.color }}
                >
                  <span
                    className="category__icon"
                    style={{ color: "white", fontSize: "36px" }}
                  >
                    {category.icon}
                  </span>
                </div>
                <span className="category__name">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <h2 className="main__title">새로 등록된 상품</h2>
        <div className="main__products">
          {products.map((product, index) => (
            <div key={index} className="product">
              <img src={product.image} alt={product.title} />
              <div className="product__info">
                <h3>{product.title}</h3>
                <p>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        <FloatingButton />
      </div>
    </>
  );
};

export default MainPage;
