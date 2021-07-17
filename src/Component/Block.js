import React from "react";
import styles from "./style.module.css";

const Block = ({ digit }) => {
  console.log("🚀 ~ file: Block.js ~ line 5 ~ Block ~ digit", digit);
  const { block } = styles;
  return (
    <div
      style={{
        color: digit !== 0 ? "#746c61" : "",
      }}
      className={`${block}`}
    >
      {digit}
    </div>
  );
};

export default Block;
