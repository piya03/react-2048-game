import React from "react";
import styles from "./style.module.css";

const ActionBtn = ({
  undoFun,
  redoFun,
  replayFun,
  history,
  isActiveUndo,
  isActiveRedo,
  play,
  setPlay,
}) => {
  const { actionBtns } = styles;

  // const isActiveRedo = !isActiveUndo && history.length > 1;
  return (
    <div className={`${actionBtns}`}>
      <button
        style={{
          cursor: isActiveUndo ? "pointer" : "not-allowed",
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
              color: isActiveUndo ? "white" : "grey",
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
        onClick={() => {
          // setPlay(!play);
          replayFun();
        }}
      >
        <i
          style={{
            fontSize: "45px",
            color: "white",
          }}
          className={play ? "fa fa-pause-circle" : "fa fa-play"}
        ></i>
      </button>
      <button
        style={{
          cursor: isActiveRedo ? "pointer" : "not-allowed",
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
            color: isActiveRedo ? "white" : "grey",
            transform: "scaleX(-1)",
          }}
          className="fa fa-reply"
        ></i>
      </button>
    </div>
  );
};

export default ActionBtn;
