import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./../styles/scss/MainPage.scss";
import Header from "../components/Header";
import Search from "../components/Search";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (query) => {
    navigate(`/searchresult?query=${encodeURIComponent(query)}`);
  };

  const [isLoaded, setIsLoaded] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <h1>
            나만의 중고책을 찾는 곳,
            <br />
            <span className="highlight">바로 여기!</span>
          </h1>
          <p>제목을 입력하고 원하는 책을 검색하세요.</p>
          <div className="cta">
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearchSubmit={handleSearchSubmit}
              onSubmitMode="navigate"
            />
          </div>
        </section>

        <section className="innovation">
          <div className="innovation__container">
            <div className="innovation__text">
              <h2>중고책 매입가 안내</h2>
              <p>
                저희 온라인 서점에서는 판매자님이 판매하시는 중고책의 상태에
                따라 매입가를 결정합니다.
              </p>
              <div className="resource-link">
                <Link to="/">
                  판매하러 가기 <span>→</span>
                </Link>
              </div>
            </div>

            <div className="innovation-slider">
              <Slider {...settings}>
                <div className="card">
                  <h3>
                    <strong>상 (Excellent/Like new)</strong>
                  </h3>
                  <p>
                    매입가: 정가의 60% ~ 70%
                    <br /> 거의 새 책과 같은 상태로, 사용 흔적이 거의 없고 매우
                    깨끗합니다.
                  </p>
                </div>
                <div className="card">
                  <h3>
                    <strong>중 (Good Condition)</strong>
                  </h3>
                  <p>
                    매입가: 정가의 40% ~ 60%
                    <br /> 일반적인 중고책으로, 사용 흔적이 있으나 읽는 데
                    지장이 없는 상태입니다.
                  </p>
                </div>
                <div className="card">
                  <h3>
                    <strong>하 (Fair/Poor Condition)</strong>
                  </h3>
                  <p>
                    매입가: 정가의 20% ~ 40%
                    <br /> 많이 사용된 책으로, 페이지나 표지에 심한 손상이나
                    마모가 있을 수 있습니다.
                  </p>
                </div>
              </Slider>
              <p className="note">
                주의 사항: 최종 매입가는 책의 실제 상태에 따라 달라질 수
                있습니다.
              </p>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="transaction-warning">
            <h2>유저 간 중고책 거래 주의사항</h2>
            <div className="warning-card-container">
              <div className="warning-card">
                {/* <div className="warning-icon">⚠️</div> */}
                <div className="warning-content">
                  <h3>1. 책 상태 확인 필수</h3>
                  <p>
                    책 상태에 대한 정확한 설명을 제공해 주세요. 책의 상태가 상,
                    중, 하로 나뉘므로, 상태를 정확히 평가하여 거래에 반영할 수
                    있도록 해야 합니다. 책의 손상이나 마모가 있는 부분은
                    사진으로 함께 첨부하여 설명해 주세요.
                  </p>
                </div>
              </div>

              <div className="warning-card">
                <div className="warning-content">
                  <h3>2. 가격 협상 및 결정</h3>
                  <p>
                    판매자와 구매자 간의 가격 협상은 자유롭게 이루어지지만, 최종
                    가격은 양측의 합의에 의해 결정됩니다.
                  </p>
                </div>
              </div>

              <div className="warning-card">
                <div className="warning-content">
                  <h3>3. 배송 및 반품 규정</h3>
                  <p>
                    배송비와 배송 방법은 판매자와 구매자가 사전에 합의해야
                    합니다. 택배로 송부할 때에는 추적 가능한 배송 방법을
                    이용하는 것이 좋습니다. 반품 규정을 사전에 명확히 정리하고,
                    문제가 발생할 경우 판매자와 구매자가 상호 협의하여 해결할 수
                    있도록 해주세요.
                  </p>
                </div>
              </div>

              <div className="warning-card">
                <div className="warning-content">
                  <h3>4. 책의 진위 여부 및 품질</h3>
                  <p>
                    중고책의 진위 여부는 반드시 판매자가 책임지고 확인해야
                    합니다. 위조본이나 손상된 책을 판매하지 않도록 주의해
                    주세요. 책이 중고 상태일 경우, 일반적으로 새 책보다는 약간의
                    사용 흔적이 있을 수 있으므로 이를 충분히 설명해 주세요.
                  </p>
                </div>
              </div>

              <div className="warning-card">
                <div className="warning-content">
                  <h3>5. 거래 완료 후 피드백</h3>
                  <p>
                    거래가 완료된 후에는 판매자와 구매자 간의 피드백을 남길 수
                    있습니다. 이는 다음 거래자들에게 중요한 참고 자료가 되며,
                    신뢰성 있는 거래 문화를 만드는 데 기여할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="warning-card">
                <div className="warning-content">
                  <h3>6. 결제 후 품절 표시 및 판매완료 표시</h3>
                  <p>
                    결제 완료 후 즉시 품절 표시 또는 판매완료 표시를 해 주세요.
                    이렇게 해야 다른 사용자들이 거래를 중복해서 시도하지 않도록
                    할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainPage;
