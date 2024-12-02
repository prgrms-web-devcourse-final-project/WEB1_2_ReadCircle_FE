import React, { useState, useEffect } from "react";
import "../styles/scss/NotificationModal.scss";

const NotificationModal = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null); // 사용자에게 에러 메시지 알림으로 표시

  // 알림 수신을 위한 SSE 연결
  useEffect(() => {
    const serverUrl = "http://3.34.60.101:5000/api/notification/subscribe";
    const eventSource = new EventSource(serverUrl, {
      withCredentials: true,
    });

    console.log(localStorage.getItem("accessToken"));

    fetch(serverUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 저장된 JWT 토큰
      },
      // credentials: "include",
    });

    // eventSource.onmessage = (event) => {
    //   setNotifications((prev) => {
    //     const newNotification = event.data;
    //     // 중복 방지(알림 목록에 있는) - 판매글 추가, 수정과는 상관없는
    //     if (!prev.includes(newNotification)) {
    //       return [...prev, newNotification];
    //     }
    //     return prev;
    //   });
    // };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // JSON 파싱
        setNotifications((prev) => {
          // 중복 방지
          if (!prev.find((notification) => notification.id === data.id)) {
            return [...prev, data];
          }
          return prev;
        });
      } catch (e) {
        console.error("Failed to parse notification data:", e);
      }
    };

    eventSource.onerror = () => {
      console.error("SSE connection failed.");
      setError("알림 수신에 실패했습니다. 다시 시도해주세요.");
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
