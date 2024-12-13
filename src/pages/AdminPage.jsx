import React, { useState } from "react";
import SaleManagement from "../components/SaleManagement";
import UserList from "../components/UserList";
import "../styles/scss/AdminPage.scss";
import Header from "../components/Header";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("user");
  return (
    <>
      <Header />
      <div className="admin-page">
        <h1>관리자 페이지</h1>

        {/* 탭 메뉴 */}
        <div className="tab-menu">
          <button
            className={activeTab === "user" ? "active" : ""}
            onClick={() => setActiveTab("user")}
          >
            회원 관리
          </button>
          <button
            className={activeTab === "sale" ? "active" : ""}
            onClick={() => setActiveTab("sale")}
          >
            판매 관리
          </button>
        </div>

        {/* 선택된 탭에 따른 컴포넌트 렌더링 */}
        <div className="tab-content">
          {activeTab === "user" && <UserList />}
          {activeTab === "sale" && <SaleManagement />}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
