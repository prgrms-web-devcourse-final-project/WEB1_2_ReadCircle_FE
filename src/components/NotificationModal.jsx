import React, { useState, useEffect } from "react";
import "../styles/scss/NotificationModal.scss";

const NotificationModal = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null); // 사용자에게 에러 메시지 알림으로 표시

  // 알림 수신을 위한 SSE 연결
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("로그인 토큰이 없습니다. 다시 로그인해주세요.");
      return;
    }

    // SSE 연결을 위한 fetch 설정
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "http://3.37.35.134:8080/api/notification/list",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // JWT 토큰
            },
          }
        );

        if (!response.ok) {
          throw new Error("알림 데이터를 가져오는 데 실패했습니다.");
        }

        const data = await response.json();
        setNotifications((prevNotifications) => {
          // 중복 제거
          const uniqueNotifications = data.filter(
            (notification) =>
              !prevNotifications.some(
                (item) => item.notificationId === notification.notificationId
              )
          );

          const updatedNotifications = [
            ...prevNotifications,
            ...uniqueNotifications,
          ];
          return updatedNotifications.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        });
      } catch (error) {
        setError("알림 수신에 실패했습니다. 다시 시도해주세요.");
        console.error(error);
      }
    };

    fetchNotifications();

    // 1분마다 알림 데이터를 새로 고침
    const interval = setInterval(() => {
      fetchNotifications();
    }, 60000); // 1분 간격

    return () => clearInterval(interval);
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target.className === "notification-modal") {
      onClose();
    }
  };

  return (
    <div className="notification-modal" onClick={handleBackdropClick}>
      <div className="notification-modal__content">
        <div className="notification-modal__header">
          <h2>알림</h2>
          <button className="notification-modal__close" onClick={onClose}>
            X
          </button>
        </div>
        {error && <p className="notification-modal__error">{error}</p>}
        <ul>
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const createdAt = new Date(notification.createdAt);
              const krTime = new Date(createdAt.getTime() + 9 * 60 * 60 * 1000);
              return (
                <li
                  key={notification.notificationId}
                  className="notification-item"
                >
                  <p className="notification-message">{notification.message}</p>
                  <small className="notification-time">
                    {krTime.toLocaleString()}
                  </small>
                </li>
              );
            })
          ) : (
            <p>새로운 알림이 없습니다.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificationModal;
