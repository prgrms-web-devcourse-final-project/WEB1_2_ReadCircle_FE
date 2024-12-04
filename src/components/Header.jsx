import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, fetchUser } from "../redux/authSlice";
import "../styles/scss/Header.scss";
import NotificationModal from "./NotificationModal";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isLoggedIn, user, loading } = useSelector((state) => state.auth);
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] =
    React.useState(false);

  // 로그인 상태 확인
  React.useEffect(() => {
    if (!isLoggedIn) {
      dispatch(fetchUser());
    }
  }, [isLoggedIn, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
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

  const imagePath = `http://3.37.35.134:8080${user?.data.profileImageUrl}`;

  return (
    <header className="header">
      <div className="header__nav">
        <Link to="/" className="header__logo">
          ReadCircle
        </Link>
        <nav>
          <ul>
            <li>
              <Link
                to="/searchresult"
                className={
                  location.pathname === "/searchresult" ? "active" : ""
                }
              >
                전체 보기
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className={location.pathname === "/shop" ? "active" : ""}
              >
                쇼핑
              </Link>
            </li>
            <li>
              <Link
                to="/market"
                className={location.pathname === "/market" ? "active" : ""}
              >
                직거래
              </Link>
            </li>
          </ul>
        </nav>
        <div className="actions">
          {isLoggedIn ? (
            <div className="header__profile">
              <img
                src={imagePath}
                alt="Profile"
                className="header__profile-img"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={toggleDropdown}
              />
              {isDropdownVisible && (
                <div className="header__dropdown">
                  <button onClick={toggleNotificationModal}>알림</button>
                  <hr />
                  <Link to="/mypage">마이페이지</Link>
                  <hr />
                  <Link to="/cart">장바구니</Link>
                  <hr />
                  <button onClick={handleLogout}>로그아웃</button>
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
