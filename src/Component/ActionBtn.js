import React from "react";
import styles from "./style.module.css";

const ActionBtn = ({ undoFun, redoFun, replayFun, history, activeIndex }) => {
  const { actionBtns } = styles;
  let checkRedo = activeIndex === 0 && history?.length > 1;
  return (
    <div className={`${actionBtns}`}>
      <button
        style={{
          cursor: history.length === 1 ? "not-allowed" : "pointer",
          background: "transparent",
          border: "none",
        }}
        onClick={() => {
          if (history?.length > 1) {
            undoFun();
          }
        }}
      >
        <span>
          {" "}
          <i
            style={{
              fontSize: "45px",
              color: history?.length === 1 ? "grey" : "white",
            }}
            className="fa fa-reply"
          ></i>
        </span>
      </button>
      <button
        style={{
          cursor: "pointer",
          background: "transparent",
          border: "none",
        }}
        onClick={() => replayFun()}
      >
        <i
          style={{
            fontSize: "45px",
            color: "white",
          }}
          className="fa fa-play"
        ></i>
      </button>
      <button
        style={{
          cursor: activeIndex === -1 ? "not-allowed" : "pointer",
          background: "transparent",
          border: "none",
        }}
        onClick={() => {
          if (activeIndex >= 0 && history?.length > 1) {
            redoFun();
          }
        }}
      >
        <i
          style={{
            fontSize: "45px",
            color: activeIndex === -1 ? "grey" : "white",
            transform: "scaleX(-1)",
          }}
          className="fa fa-reply"
        ></i>
      </button>
    </div>
  );
};

export default ActionBtn;
