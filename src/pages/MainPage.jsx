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
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
  };

  const [selectedWarning, setSelectedWarning] = useState(1);
  const warnings = [
    {
      title: "1. 책 상태 확인 필수",
      content:
        "책 상태에 대한 정확한 설명을 제공해 주세요. 책의 상태는 상, 중, 하로 나뉘며, 각 상태를 정확하게 평가하여 거래에 반영할 수 있도록 해야 합니다. 책이 매우 깨끗한 상태인지, 아니면 약간의 사용 흔적이나 손상이 있는지 등 세부적인 사항들을 구체적으로 설명하는 것이 중요합니다. 예를 들어, 표지에 스크래치가 있거나 페이지에 얼룩이 있다면 이를 사진으로 촬영하여 함께 첨부하는 것이 좋습니다. 구매자가 책의 상태에 대해 오해하지 않도록 꼼꼼하게 설명해 주세요.",
    },
    {
      title: "2. 가격 협상 및 결정",
      content:
        "판매자와 구매자 간의 가격 협상은 자유롭게 이루어지지만, 최종 가격은 양측의 합의에 의해 결정됩니다. 거래 전, 책의 상태와 시장 가치를 충분히 고려하여 가격을 책정하는 것이 중요합니다. 예를 들어, 책이 새 책에 가까운 상태라면 가격을 높은 편으로 설정할 수 있고, 많이 사용된 책이라면 가격을 적당히 낮춰야 합니다. 거래 성사 전에 가격에 대해 충분히 상의하고, 구매자와 판매자가 합의한 가격을 정확하게 기록해 주세요.",
    },
    {
      title: "3. 배송 및 반품 규정",
      content:
        "배송비와 배송 방법은 판매자와 구매자가 사전에 합의해야 합니다. 택배로 송부할 때에는 추적 가능한 배송 방법을 이용하는 것이 좋습니다. 일반적으로, 배송비는 판매자가 부담하는 경우도 있지만, 구매자가 부담하는 경우도 있기 때문에 이를 미리 협의하고 명확히 정리해야 합니다. 또한, 반품 규정을 사전에 명확히 설정해 두는 것이 중요합니다. 예를 들어, 책에 대한 설명이 잘못되었거나, 배송 중 손상된 경우 반품을 허용할 수 있으며, 이런 부분에 대해 서로 합의한 규정이 있어야 합니다. 문제가 발생할 경우, 판매자와 구매자가 상호 협의하여 해결할 수 있도록 신속하게 대응해야 합니다.",
    },
    {
      title: "4. 책의 진위 여부 및 품질",
      content:
        "중고책의 진위 여부는 반드시 판매자가 책임지고 확인해야 합니다. 위조본이나 손상된 책을 판매하지 않도록 주의해야 하며, 판매자가 이 점을 충분히 점검하고 확인하는 것이 매우 중요합니다. 또한, 중고책은 새 책에 비해 약간의 사용 흔적이 있을 수 있으며, 이러한 사항을 충분히 설명해야 합니다. 예를 들어, 책 표지에 작은 구겨짐이나 접힌 자국, 또는 페이지 끝이 살짝 닳아 있는 경우, 이를 미리 설명하고 사진을 첨부하여 구매자가 정확한 상태를 알 수 있도록 해야 합니다. 중고책의 품질에 대한 자세한 정보를 제공하면 신뢰성을 높일 수 있습니다.",
    },
    {
      title: "5. 거래 완료 후 피드백",
      content:
        "거래가 완료된 후에는 판매자와 구매자 간의 피드백을 남길 수 있습니다. 이는 향후 거래자들에게 중요한 참고 자료가 되며, 신뢰성 있는 거래 문화를 만들고 다른 사용자들에게 도움이 됩니다. 피드백을 통해 거래의 원활한 진행 여부나 책 상태, 배송 상황 등에 대한 의견을 나눌 수 있습니다. 또한, 서로의 경험을 공유함으로써, 향후 거래에 대한 신뢰를 쌓을 수 있습니다. 피드백은 긍정적일 수도 있고, 부정적일 수도 있지만, 서로의 발전을 위한 중요한 자료가 됩니다.",
    },
    {
      title: "6. 결제 후 품절 표시 및 판매완료 표시",
      content:
        "결제 완료 후 즉시 품절 표시 또는 판매완료 표시를 해 주세요. 이렇게 해야 다른 사용자들이 거래를 중복해서 시도하지 않도록 할 수 있습니다. 판매 완료된 책에 대한 정보를 실시간으로 업데이트하는 것이 매우 중요합니다. 예를 들어, 책이 판매되었지만, 해당 책이 여전히 ‘판매 중’으로 표시되어 있으면, 다른 사용자가 이를 구매하려고 시도할 수 있습니다. 이 경우, 중복된 거래가 발생하거나 혼란이 생길 수 있기 때문에, 결제가 완료되었음을 확인한 후 즉시 품절 표시를 해 주세요. 이 과정은 원활한 거래 환경을 만들고 사용자들 간의 신뢰를 높이는 데 기여합니다.",
    },
  ];

  const handleClick = (index) => {
    setSelectedWarning(index);
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
                {/* 판매 경로 입력(이커머스) */}
                <Link to="/purchase-create">
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
              <div className="warning-list">
                {warnings.map((warning, index) => (
                  <div
                    key={index}
                    className={`warning-card ${
                      selectedWarning === index ? "selected" : ""
                    }`}
                    onClick={() => handleClick(index)}
                  >
                    <h3>{warning.title}</h3>
                  </div>
                ))}
              </div>
              <div className="warning-detail">
                <h3>{warnings[selectedWarning].title}</h3>
                <p>{warnings[selectedWarning].content}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainPage;
