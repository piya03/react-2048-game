import React, { useEffect } from "react";
import styles from "./style.module.css";
function Modal({ show, setShow, title = "", children }) {
  const { modalContainer, modal } = styles;
  if (!show) return null;

  return (
    <div
      className={`${modalContainer}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={`${modal}`}>
        <div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "500",
              marginBottom: "18px",
            }}
          >
            <div>{title}</div>
          </div>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
