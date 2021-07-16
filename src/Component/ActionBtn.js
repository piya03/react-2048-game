import React from "react";
import styles from "./style.module.css";

const ActionBtn = () => {
  const { actionBtns } = styles;
  return (
    <div className={`${actionBtns}`}>
      <div>Undo</div>
      <div>Replay</div>
      <div>Redo</div>
    </div>
  );
};

export default ActionBtn;
