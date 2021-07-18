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
          background: history?.length === 1 ? "grey" : "green",
        }}
        onClick={() => {
          if (history?.length > 1) {
            undoFun();
          }
        }}
      >
        Undo
      </button>
      <button onClick={() => replayFun()}>Replay</button>
      <button
        style={{
          cursor: activeIndex === -1 ? "not-allowed" : "pointer",
          background: activeIndex === -1 ? "grey" : "green",
        }}
        onClick={() => {
          if (activeIndex >= 0 && history?.length > 1) {
            redoFun();
          }
        }}
      >
        Redo
      </button>
    </div>
  );
};

export default ActionBtn;
