import React, { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa6";
import "../styles/scss/FloatingButton.scss";

const FloatingButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <>
      <button className="floating-button" onClick={toggleModal}>
        {modalOpen ? "X" : <FaRegCommentDots />}
      </button>
      {modalOpen && (
        <div className="modal">
          <div className="modal__content">
            <h3>홍길동</h3>
            <p>"홍길동"님이 채팅을 요청합니다.</p>
            <button>채팅</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingButton;
