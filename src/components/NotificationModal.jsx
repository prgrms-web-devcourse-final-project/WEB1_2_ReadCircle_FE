import React, { useState, useEffect } from "react";
import "../styles/scss/NotificationModal.scss";

const NotificationModal = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null); // 사용자에게 에러 메시지 알림으로 표시

  // 알림 수신을 위한 SSE 연결
  useEffect(() => {
    const eventSource = new EventSource("/api/notification/subscribe", {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      setNotifications((prev) => {
        const newNotification = event.data;
        // 중복 방지(알림 목록에 있는) - 판매글 추가, 수정과는 상관없는
        if (!prev.includes(newNotification)) {
          return [...prev, newNotification];
        }
        return prev;
      });
    };

    eventSource.onerror = () => {
      console.error("SSE connection failed.");
      eventSource.close();
    };

    // SSE 연결 해제
    return () => eventSource.close();
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
        {error && <p className="notification-modal__error">{error}</p>}{" "}
        <ul>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))
          ) : (
            <p>새로운 알림이 없습니다.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificationModal;
