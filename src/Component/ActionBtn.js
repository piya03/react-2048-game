import React from "react";
import styles from "./style.module.css";

const ActionBtn = ({
  undoFun,
  redoFun,
  replayFun,
  history,
  isActiveUndo,
  isActiveRedo,

  mode,
}) => {
  const { actionBtns } = styles;

  return (
    <div className={`${actionBtns}`}>
      <button
        style={{
          cursor: isActiveUndo && mode === "play" ? "pointer" : "not-allowed",
          background: "transparent",
          border: "none",
        }}
        onClick={() => {
          if (isActiveUndo) {
            undoFun();
          }
        }}
      >
        <span>
          {" "}
          <i
            style={{
              fontSize: "45px",
              color: isActiveUndo && mode === "play" ? "white" : "grey",
            }}
            className="fa fa-reply"
          ></i>
        </span>
      </button>
      <button
        style={{
          cursor: history?.length > 1 ? "pointer" : "not-allowed",
          background: "transparent",
          border: "none",
        }}
        onClick={() => {
          replayFun();
        }}
      >
        <i
          style={{
            fontSize: "45px",
            color: history?.length > 1 ? "white" : "grey",
          }}
          className={mode === "replay" ? "fa fa-pause-circle" : "fa fa-play"}
        ></i>
      </button>
      <button
        style={{
          cursor: isActiveRedo && mode === "play" ? "pointer" : "not-allowed",
          background: "transparent",
          border: "none",
        }}
        onClick={() => {
          if (isActiveRedo) {
            redoFun();
          }
        }}
      >
        <i
          style={{
            fontSize: "45px",
            color: isActiveRedo && mode === "play" ? "white" : "grey",
            transform: "scaleX(-1)",
          }}
          className="fa fa-reply"
        ></i>
      </button>
    </div>
  );
};

export default ActionBtn;
