import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/scss/Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include", // 쿠키 포함
        });
        if (response.ok) {
          const userData = await response.json();
          setIsLoggedIn(true);
          setUser(userData); // 사용자 정보 설정
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        // 추후에 수정해야 할 부분(F12 - 콘솔)
        // console.error("Error fetching login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // 쿠키 전송
      });
      if (response.ok) {
        setIsLoggedIn(false);
        setUser(null);
        navigate("/"); // 로그아웃 후 홈으로
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
                style={{ width: "20px", borderRadius: "50%" }}
              />
              {/* 로그인 버튼 / 프로필 이미지, 로그아웃 버튼 */}
              <div className="header__dropdown">
                <Link to="/mypage">My Page</Link>
                <Link to="/cart">Cart</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="header__login">
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
