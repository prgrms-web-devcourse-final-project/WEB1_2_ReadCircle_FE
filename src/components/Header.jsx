import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/scss/Header.scss";
import NotificationModal from "./NotificationModal";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] =
    useState(false);

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = localStorage.getItem("accessToken");
      // 토큰이 없으면 로그인 상태 해제
      if (!accessToken) {
        setIsLoggedIn(false);
        setUser(null);
        return;
      }

      try {
        const response = await fetch("api/users/me", {
          method: "GET",
        });

        console.log("Response status:", response.status);

        if (response.ok) {
          const userData = await response.json();
          setIsLoggedIn(true);
          setUser(userData);
        } else if (response.status === 401 || response.status === 403) {
          setIsLoggedIn(false);
          setUser(null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setIsLoggedIn(false);
    setUser(null);

    navigate("/");
  };

  // 드롭다운 표시/숨김 토글
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  // 알림 모달 표시/숨김 토글
  const toggleNotificationModal = () => {
    setIsNotificationModalVisible((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header__nav">
        <Link to="/" className="header__logo">
          ReadCircle
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/searchresult">New</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/market">Market</Link>
            </li>
          </ul>
        </nav>
        <div className="actions">
          {isLoggedIn ? (
            <div className="header__profile">
              <img
                src={user?.profileImage || "/default-profile.png"}
                alt="Profile"
                className="header__profile-img"
                style={{
                  width: "20px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={toggleDropdown}
              />
              {isDropdownVisible && (
                <div className="header__dropdown">
                  <button onClick={toggleNotificationModal}>알림</button>
                  <Link to="/mypage">마이페이지</Link>
                  <Link to="/cart">장바구니</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="header__login">
              LOGIN
            </Link>
          )}
        </div>
      </div>
      {isNotificationModalVisible && (
        <NotificationModal onClose={toggleNotificationModal} />
      )}
    </header>
  );
};

export default Header;
